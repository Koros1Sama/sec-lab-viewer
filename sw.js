/* ═══════════════════════════════════════════════════════
   Service Worker — Sec Study Viewer
   • القشرة الأساسية تُخزن عند التثبيت (الصفحات + config + الأيقونات)
   • المحتوى يُخزن تدريجياً مع التصفح، وزر «تحميل الكل» يكمل الباقي
   • التحديث: صفحات وconfig = الشبكة أولاً (النطاق يتحدث فوراً)
     بيانات data = قديم فوراً + تحديث بالخلفية (SWR)
     صور الشرائح = الكاش أولاً (كبيرة ومستقرة)
   ═══════════════════════════════════════════════════════ */
const RUNTIME = "sec-lab-runtime-v7";
const CORE = "sec-lab-core-v7";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./summary.html",
  "./prompts.html",
  "./manifest.json",
  "./favicon.ico",
  "./data/config.js",
  "./icons/icon.svg",
  "./icons/icon-32.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png",
  "./icons/apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CORE)
      .then((c) => c.addAll(CORE_ASSETS))
      .catch(() => null)
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== RUNTIME && k !== CORE)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

async function networkFirst(req) {
  const cache = await caches.open(RUNTIME);
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    const cached = await cache.match(req, { ignoreSearch: true });
    if (cached) return cached;
    return new Response("أوفلاين — لا نسخة محفوظة", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(RUNTIME);
  const cached = await cache.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  if (res && res.ok) cache.put(req, res.clone());
  return res;
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(RUNTIME);
  const cached = await cache.match(req);
  const fresh = fetch(req)
    .then((res) => {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    })
    .catch(() => null);
  if (cached) return cached;
  const res = await fresh;
  if (res) return res;
  return new Response("أوفلاين — لا نسخة محفوظة", {
    status: 503,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  let url;
  try {
    url = new URL(req.url);
  } catch {
    return; /* رابط معطوب — تجاهل بأمان */
  }
  if (url.origin !== location.origin) return;
  const p = url.pathname;

  /* سكربت العامل نفسه والمانيفست: شبكة مباشرة */
  if (p.endsWith("/sw.js") || p.endsWith("/manifest.json")) return;

  /* الصفحات والإعدادات: الشبكة أولاً — تغييرات النطاق تصل فوراً */
  if (p === "/" || p.endsWith(".html") || p === "/data/config.js")
    return e.respondWith(networkFirst(req));

  /* الشرائح والأيقونات: الكاش أولاً (كبيرة وثابتة) */
  if (p.startsWith("/slides/") || p.startsWith("/icons/"))
    return e.respondWith(cacheFirst(req));

  /* ملفات البيانات: نسخة محفوظة فوراً + تحديث بالخلفية */
  if (p.startsWith("/data/")) return e.respondWith(staleWhileRevalidate(req));

  /* أي شيء آخر: شبكة عادية */
});
