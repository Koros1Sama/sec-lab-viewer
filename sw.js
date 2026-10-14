/* ═══════════════════════════════════════════════════════
   Service Worker — Study Viewer Template
   • نظام تخزين ذكي ثنائي الطبقات (Two-Tier Service Worker Architecture):
     - طبقة القشرة الأساسية CORE (الصفحات + config + الأيقونات): تُخزن فورياً وتتحدث عند رفع رقم الإصدار
     - طبقة التشغيل والمحتوى RUNTIME (السلايدات والبيانات): تُحفظ وتُنقل عبر الإصدارات لحماية تحميلات الطلاب
   • كسر الكاش الحتمي (Cache-Busting): رفع إصدار CORE ينشط فوراً وينهي الكاش القديم
   • استراتيجية الشبكة:
     - صفحات وconfig = الشبكة أولاً (Network-First)
     - بيانات data = الشبكة أولاً لضمان وصول التعديلات فوراً مع عملها أوفلاين (Network-First)
     - صور الشرائح = الكاش أولاً (Cache-First)
   • معيار صفر إيموجيات (Zero Emojis Standard)
   ═══════════════════════════════════════════════════════ */
const CORE_PREFIX = "sec-lab-core-";
const RUNTIME_PREFIX = "sec-lab-runtime-";
const CORE = "sec-lab-core-v14";
const RUNTIME = "sec-lab-runtime-v14";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./summary.html",
  "./prompts.html",
  "./app.js",
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
    (async () => {
      const keys = await caches.keys();
      const targetRuntime = await caches.open(RUNTIME);

      /* حماية ونقل الشرائح والأيقونات المحملة فقط من أي كاش رن تايم سابق لمنع بقاء بيانات برمجية قديمة */
      for (const k of keys) {
        if (k.startsWith(RUNTIME_PREFIX) && k !== RUNTIME) {
          try {
            const oldC = await caches.open(k);
            const oldReqs = await oldC.keys();
            const slideReqs = oldReqs.filter((req) => {
              const u = new URL(req.url);
              return u.pathname.includes("/slides/") || u.pathname.includes("/icons/");
            });
            for (let b = 0; b < slideReqs.length; b += 10) {
              const batch = slideReqs.slice(b, b + 10);
              await Promise.all(
                batch.map(async (req) => {
                  try {
                    const res = await oldC.match(req);
                    if (res) await targetRuntime.put(req, res);
                  } catch {}
                }),
              );
            }
            await caches.delete(k);
          } catch {}
        }
      }

      /* تنظيف كاش القشرة القديم فقط (sec-lab-core-*) مع حظر مساس كاش الرن تايم أو أي كاشات أخرى */
      for (const k of keys) {
        if (k.startsWith(CORE_PREFIX) && k !== CORE) {
          try {
            await caches.delete(k);
          } catch {}
        }
      }

      await self.clients.claim();
    })(),
  );
});

async function networkFirst(req) {
  const runtime = await caches.open(RUNTIME);
  try {
    const res = await fetch(req);
    if (res && res.ok) runtime.put(req, res.clone());
    return res;
  } catch {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (cached) return cached;
    return new Response("أوفلاين — لا نسخة محفوظة", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

async function cacheFirst(req) {
  const cached = await caches.match(req, { ignoreSearch: true });
  if (cached) return cached;
  const runtime = await caches.open(RUNTIME);
  const res = await fetch(req);
  if (res && res.ok) runtime.put(req, res.clone());
  return res;
}

async function staleWhileRevalidate(req) {
  const cached = await caches.match(req, { ignoreSearch: true });
  const runtime = await caches.open(RUNTIME);
  const fresh = fetch(req)
    .then((res) => {
      if (res && res.ok) runtime.put(req, res.clone());
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

  /* سكربت العامل نفسه: شبكة مباشرة دائماً لاكتشاف التحديثات فورياً */
  if (p.endsWith("/sw.js")) return;

  /* الصفحات، الإعدادات، كود التطبيق، المانيفست، والفافيكون: الشبكة أولاً مع بديل الكاش */
  if (
    p === "/" ||
    p.endsWith("/") ||
    p.endsWith(".html") ||
    p.endsWith("/data/config.js") ||
    p.endsWith("/app.js") ||
    p.endsWith("/manifest.json") ||
    p.endsWith("/favicon.ico")
  ) {
    return e.respondWith(networkFirst(req));
  }

  /* الشرائح والأيقونات: الكاش أولاً (كبيرة وثابتة) */
  if (p.includes("/slides/") || p.includes("/icons/")) {
    return e.respondWith(cacheFirst(req));
  }

  /* ملفات البيانات: الشبكة أولاً لضمان وصول التعديلات فوراً مع إتاحتها أوفلاين */
  if (p.includes("/data/")) {
    return e.respondWith(networkFirst(req));
  }

  /* أي مورد محلي آخر: الشبكة أولاً */
  return e.respondWith(networkFirst(req));
});
