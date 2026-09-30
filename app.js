/* ═══════════════════════════════════════════════════════════
   app.js — زر «حمّل التطبيق» للابتوب والجوال + لوحة إدارة كاملة
   • دعم كامل للابتوب والكمبيوتر (Windows / Mac) والجوال (Android / iOS)
   • زر التثبيت يظهر فوراً من أول لحظة دون أي تأخير أو انتظار
   • تحميل المحتوى للعمل أوفلاين 100% دون إنترنت مع استئناف ذكي
   • تحديث تلقائي في الخلفية عند توفر أي سلايدات أو نماذج جديدة
   • يعمل مع ثيمات الموقع الـ11 ورابط مباشر #app لفتح اللوحة
   • معيار الأيقونات المتجهية 100% SVG بدون أي إيموجيات
   ═══════════════════════════════════════════════════════════ */
(() => {
  if (!("serviceWorker" in navigator)) return;

  const RUNTIME = "sec-lab-runtime-v4";
  const isStandalone =
    matchMedia("(display-mode: standalone)").matches ||
    navigator.standalone === true;
  const isIOS =
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (/mac/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
  const isMobile =
    /android|iphone|ipad|ipod/i.test(navigator.userAgent) || isIOS;
  const isDesktop = !isMobile;
  let deferredPrompt = null;
  let abortDL = null;

  /* ── أيقونات متجهية SVG متناسقة 100% مع هوية الموقع ── */
  const ICONS = {
    desktop: '<svg class="svg-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    mobile: '<svg class="svg-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    download: '<svg class="svg-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    refresh: '<svg class="svg-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
    check: '<svg class="svg-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
    close: '<svg class="svg-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    pause: '<svg class="svg-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
    clock: '<svg class="svg-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    alert: '<svg class="svg-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    share: '<svg class="svg-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>'
  };

  function setHTML(el, htmlString) {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    el.replaceChildren(...doc.body.childNodes);
  }

  function setSVG(el, svgString) {
    const doc = new DOMParser().parseFromString(svgString, "image/svg+xml");
    el.replaceChildren(doc.documentElement);
  }

  /* ── تسجيل العامل + التحديث التلقائي ──
     أول تثبيت: لا إعادة تحميل. تحديث فعلي لمتحكم سابق: reload مرة واحدة. */
  const hadController = !!navigator.serviceWorker.controller;
    window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js", { updateViaCache: "none" })
      .then((reg) => {
        reg.update().catch(() => null);
      })
      .catch(() => null);
  });
  let reloadedOnce = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (reloadedOnce || !hadController) return;
    reloadedOnce = true;
    location.reload();
  });

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById("appCta")?.classList.add("has-prompt");
  });

  /* ── قائمة الموارد (صفحات + بيانات + شرائح + أيقونات) ── */
  function buildResourceList() {
    const urls = new Set();
    [
      "./",
      "index.html",
      "summary.html",
      "prompts.html",
      "manifest.json",
      "favicon.ico",
    ].forEach((u) => urls.add(u));
    const cfg = window.TOC_CONFIG || { files: {} };
    const files = cfg.files || {};
    ["index", "summary"].forEach((k) =>
      (files[k] || []).forEach((f) => urls.add("data/" + f + ".js")),
    );
    urls.add("data/config.js");
    const meta = window.TOC_META;
    if (meta && Array.isArray(meta.lectures))
      meta.lectures.forEach((lec) =>
        (lec.slides || []).forEach((sl) => {
          const n = String(sl.n).padStart(3, "0");
          urls.add(`slides/${lec.id}/${lec.id}-S${n}.png`);
        }),
      );
    const qp = window.TOC_QPICS || {};
    Object.values(qp).forEach((v) => v && urls.add(v));
    [
      "icons/icon.svg",
      "icons/icon-32.png",
      "icons/icon-192.png",
      "icons/icon-512.png",
      "icons/maskable-512.png",
      "icons/apple-touch-icon.png",
    ].forEach((u) => urls.add(u));
    return [...urls];
  }

  async function countCached(list) {
    let done = 0;
    try {
      const cache = await caches.open(RUNTIME);
      for (const u of list) if (await cache.match(u)) done++;
    } catch {
      /* لا كاش بعد */
    }
    return done;
  }

  /* ── التنسيق: على نظام ثيمات الموقع ── */
  const CSS = `
#setPanel{max-height:min(78vh,660px);overflow:auto}
#appCta{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;margin:0 0 18px;padding:13px 18px;background:color-mix(in srgb,var(--acc) 9%,transparent);border:1.5px dashed color-mix(in srgb,var(--acc) 55%,transparent);border-radius:var(--r-m);color:var(--acc-b);font-family:var(--fa);font-size:0.92rem;font-weight:800;cursor:pointer;transition:all var(--dur) var(--ease);position:relative;text-align:center}
#appCta small{display:block;font-size:0.72rem;font-weight:600;color:var(--ink-m);margin-top:2px}
#appCta:hover{background:color-mix(in srgb,var(--acc) 16%,transparent);transform:translateY(-1px);border-color:var(--acc)}
#appCta .cta-ic{display:inline-flex;align-items:center;justify-content:center;color:var(--acc);flex:none;line-height:1}
#appCta .cta-ic svg{width:22px;height:22px;display:block}
#appCta.has-prompt::after{content:"";position:absolute;top:-5px;inset-inline-start:-5px;width:12px;height:12px;border-radius:50%;background:var(--acc);box-shadow:0 0 8px var(--acc)}
#appPanel{position:fixed;inset:0;z-index:9999;background:color-mix(in srgb,var(--bg) 72%,transparent);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;padding-bottom:calc(20px + env(safe-area-inset-bottom,0px));font-family:var(--fa);animation:fade 0.25s var(--ease)}
#appPanel .ap-card{position:relative;width:min(440px,100%);max-height:86vh;overflow:auto;background:color-mix(in srgb,var(--sf) 97%,transparent);border:1px solid color-mix(in srgb,var(--acc) 28%,var(--ln));border-radius:var(--r-m);box-shadow:0 20px 60px rgba(0,0,0,0.55);padding:18px;color:var(--ink);direction:rtl;animation:rise 0.3s var(--ease)}
#appPanel .ap-card>h3:first-of-type{padding-inline-start:34px}
.ap-x{position:sticky;top:0;float:right;margin:0 0 0 6px;width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;background:var(--sf);border:1px solid var(--ln);border-radius:var(--r-s);color:var(--ink-m);cursor:pointer;transition:all var(--dur) var(--ease);flex:none}
.ap-x:hover{color:var(--err);border-color:color-mix(in srgb,var(--err) 40%,transparent)}
.ap-x svg{width:14px;height:14px;display:block}
#appPanel h3{margin:0 0 6px;font-size:0.95rem;font-weight:800;color:var(--acc);display:flex;align-items:center;gap:8px}
#appPanel h3 svg{width:18px;height:18px;display:block;flex:none}
#appPanel .ap-sec{border-top:1px solid var(--ln-s);padding:14px 2px 6px;margin-top:10px}
#appPanel .ap-sec:first-child{border-top:none;margin-top:0;padding-top:0}
#appPanel .ap-sub{font-size:0.8rem;color:var(--ink-m);line-height:1.8;margin:2px 0 10px}
#appPanel button{cursor:pointer;font-family:var(--fa)}
.ap-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;width:100%;padding:10px 14px;border-radius:var(--r-s);border:1px solid var(--ln);background:var(--sf);color:var(--ink-m);font-size:0.82rem;font-weight:700;transition:all var(--dur) var(--ease);white-space:nowrap;text-align:center;text-decoration:none}
.ap-btn:hover{border-color:color-mix(in srgb,var(--acc) 50%,transparent);color:var(--ink);transform:translateY(-1px)}
.ap-btn svg{width:16px;height:16px;display:block;flex:none}
.ap-btn.pri{background:var(--acc-g);border-color:color-mix(in srgb,var(--acc) 45%,transparent);color:var(--acc-b)}
.ap-btn.pri:hover{background:color-mix(in srgb,var(--acc) 24%,transparent)}
.ap-btn.off{background:var(--err-g);border-color:color-mix(in srgb,var(--err) 45%,transparent);color:var(--err)}
.ap-btn.ok{background:var(--ok-g);border-color:color-mix(in srgb,var(--ok) 45%,transparent);color:var(--ok)}
.pwrap{background:var(--sf2);border:1px solid var(--ln);border-radius:99px;height:11px;overflow:hidden;margin:8px 0 6px}
.pfill{height:100%;width:0%;background:linear-gradient(90deg,var(--acc),var(--acc-b));transition:width .25s}
.plabel{font-size:0.78rem;color:var(--ink-m);display:flex;justify-content:space-between}
.ap-steps{background:var(--bg-s);border:1px solid var(--ln-s);border-radius:var(--r-s);padding:10px 14px;font-size:0.82rem;line-height:2.1;color:var(--ink-m);margin-top:8px}
.ap-steps b{color:var(--ink)}
.ap-badge{display:inline-flex;align-items:center;gap:5px;background:var(--ok-g);color:var(--ok);border:1px solid color-mix(in srgb,var(--ok) 40%,transparent);border-radius:99px;padding:3px 12px;font-size:0.75rem;font-weight:700}
.ap-badge svg{width:13px;height:13px;display:block}
@media (prefers-reduced-motion:reduce){#appPanel,.ap-card,.ap-btn,#appCta{animation:none;transition:none}}
`;
  const styleEl = document.createElement("style");
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  /* ── عرض قسم التثبيت: الزر يظهر فوراً بدون تأخير ── */
  function renderInstallSection(ins) {
    if (isStandalone) {
      setHTML(
        ins,
        `<h3>${isDesktop ? ICONS.desktop : ICONS.mobile} التثبيت</h3><div class="ap-sub"><span class="ap-badge">${ICONS.check} أنت تستخدم ${isDesktop ? "برنامج الكمبيوتر المثبَّت" : "التطبيق المثبَّت"}</span></div>`,
      );
      return;
    }

    if (isIOS) {
      setHTML(
        ins,
        `<h3>${ICONS.mobile} التثبيت (آيفون/آيباد)</h3><div class="ap-steps">١. اضغط زر المشاركة ${ICONS.share} في شريط سفاري السفلي<br>٢. اختر <b>«إضافة إلى الشاشة الرئيسية»</b><br>٣. اضغط <b>«إضافة»</b> — تظهر أيقونة التطبيق على شاشتك</div>`,
      );
      return;
    }

    const title = isDesktop
      ? "تثبيت البرنامج على اللابتوب"
      : "التثبيت كتطبيق للجوال";
    const subText = isDesktop
      ? "يثبت كبرنامج مستقل لسطح المكتب وقائمة ابدأ (Windows / Mac) ويعمل أوفلاين ويتحدث تلقائياً."
      : "يضيف أيقونة على شاشتك الرئيسية ويعمل بملء الشاشة دون شريط المتصفح، ويتحدث تلقائياً.";
    const btnHTML = isDesktop
      ? `${ICONS.desktop} تثبيت البرنامج على الكمبيوتر الآن`
      : `${ICONS.mobile} تثبيت التطبيق الآن`;

    setHTML(
      ins,
      `<h3>${isDesktop ? ICONS.desktop : ICONS.mobile} ${title}</h3>
<div class="ap-sub">${subText}</div>
<button class="ap-btn pri" id="apInst">${btnHTML}</button>
<div id="apInstHint" style="display:none;margin-top:10px" class="ap-steps"></div>`,
    );

    const btn = ins.querySelector("#apInst");
    const hint = ins.querySelector("#apInstHint");

    btn.onclick = async () => {
      // 1. إذا كان المتصفح جاهزاً بالفعل
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const r = await deferredPrompt.userChoice;
        if (r && r.outcome === "accepted") {
          setHTML(
            ins,
            `<h3>${isDesktop ? ICONS.desktop : ICONS.mobile} التثبيت</h3><div class="ap-sub"><span class="ap-badge">${ICONS.check} تم التثبيت بنجاح</span></div>`,
          );
        }
        deferredPrompt = null;
        return;
      }

      // 2. إذا ضغط المستخدم فور فتح الصفحة قبل اكتمال إشارة المتصفح
      setHTML(btn, `${ICONS.clock} جاري بدء التثبيت…`);
      let promptFired = false;

      const checkInterval = setInterval(async () => {
        if (deferredPrompt && !promptFired) {
          promptFired = true;
          clearInterval(checkInterval);
          setHTML(btn, btnHTML);
          deferredPrompt.prompt();
          const r = await deferredPrompt.userChoice;
          if (r && r.outcome === "accepted") {
            setHTML(
              ins,
              `<h3>${isDesktop ? ICONS.desktop : ICONS.mobile} التثبيت</h3><div class="ap-sub"><span class="ap-badge">${ICONS.check} تم التثبيت بنجاح</span></div>`,
            );
          }
          deferredPrompt = null;
        }
      }, 100);

      // في حال استغرق المتصفح وقتاً أو كان التثبيت مدعوماً عبر شريط العنوان
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!promptFired) {
          setHTML(btn, btnHTML);
          hint.style.display = "block";
          if (isDesktop) {
            setHTML(
              hint,
              `اضغط على أيقونة التثبيت في شريط العنوان بالأعلى (يمين الرابط)، أو من قائمة المتصفح <b>⋮</b> واختر <b>«تثبيت التطبيق»</b>.`,
            );
          } else {
            setHTML(
              hint,
              `من قائمة المتصفح <b>⋮</b> بالأعلى اختر <b>«تثبيت التطبيق»</b> أو <b>«إضافة إلى الشاشة الرئيسية»</b>.`,
            );
          }
        }
      }, 1200);
    };
  }

  /* ── لوحة التطبيق ── */
  function openPanel() {
    document.getElementById("appPanel")?.remove();
    const p = document.createElement("div");
    p.id = "appPanel";
    setHTML(
      p,
      `
<div class="ap-card">
  <button class="ap-x" id="apX" title="إغلاق">${ICONS.close}</button>
  <h3>${isDesktop ? ICONS.desktop : ICONS.mobile} التطبيق والعمل دون إنترنت</h3>
  <div class="ap-sec" id="apInstall"></div>
  <div class="ap-sec">
    <h3>${ICONS.download} تحميل المحتوى للعمل أوفلاين</h3>
    <div class="ap-sub">كل ما تتصفحه يُحفظ محلياً — التحميل يستأنف من حيث توقف، والمحتوى الجديد يُحدَّث تلقائياً عند توفر أي إضافات على السيرفر.</div>
    <div class="pwrap"><div class="pfill" id="apFill"></div></div>
    <div class="plabel"><span id="apCount">جارٍ حساب المحفوظ…</span><span id="apPct"></span></div>
    <button class="ap-btn pri" id="apDL">${ICONS.download} تحميل كل المحتوى للعمل دون إنترنت</button>
    <div class="ap-sub" id="apStore" style="margin-top:8px"></div>
  </div>
  <div class="ap-sec">
    <h3>${ICONS.refresh} التحديث التلقائي واليدوي</h3>
    <div class="ap-sub">البرنامج يتفقد التحديثات تلقائياً في الخلفية كلما اتصلت بالإنترنت. عند نزول أي أسئلة أو شروحات جديدة، يتم تحديثها فوراً دون أن تفقد محتواك القديم.</div>
    <button class="ap-btn" id="apUpd">${ICONS.refresh} التحقق من التحديثات الآن</button>
  </div>
  <button class="ap-btn" id="apClose" style="margin-top:12px">إغلاق</button>
</div>`,
    );
    document.body.appendChild(p);
    p.addEventListener("click", (e) => {
      if (e.target === p) p.remove();
    });
    p.querySelector("#apClose").onclick = () => p.remove();
    p.querySelector("#apX").onclick = () => p.remove();

    /* قسم التثبيت */
    const ins = p.querySelector("#apInstall");
    renderInstallSection(ins);

    /* قسم التحميل */
    const fill = p.querySelector("#apFill"),
      lbl = p.querySelector("#apCount"),
      pct = p.querySelector("#apPct"),
      dlBtn = p.querySelector("#apDL"),
      storeLbl = p.querySelector("#apStore");

    function paint(list, done, failed) {
      const v = Math.round((done / list.length) * 100);
      fill.style.width = v + "%";
      lbl.textContent = `${done} من ${list.length}${failed ? " — تعثر " + failed : ""}`;
      pct.textContent = v + "%";
      setHTML(
        dlBtn,
        done >= list.length
          ? `${ICONS.check} كل المحتوى محفوظ — يعمل دون إنترنت 100%`
          : `${ICONS.download} تحميل كل المحتوى للعمل دون إنترنت`
      );
      dlBtn.className =
        "ap-btn" +
        (done >= list.length ? " ok" : " pri") +
        (abortDL ? " off" : "");
    }

    (async () => {
      const list = buildResourceList();
      let done = await countCached(list);
      paint(list, done, 0);
      try {
        const est = await navigator.storage?.estimate?.();
        if (est && est.usage)
          storeLbl.textContent = `المحفوظ حالياً: ${(est.usage / 1048576).toFixed(1)} ميغابايت`;
      } catch {}

      dlBtn.onclick = async () => {
        if (abortDL) {
          abortDL.abort();
          return;
        }
        abortDL = new AbortController();
        const sig = abortDL.signal;
        setHTML(dlBtn, `${ICONS.pause} إيقاف التحميل`);
        dlBtn.className = "ap-btn off";
        const cache = await caches.open(RUNTIME);
        const todo = [];
        for (const u of list) if (!(await cache.match(u))) todo.push(u);
        let failed = 0,
          i = 0;
        async function worker() {
          while (i < todo.length && !sig.aborted) {
            const u = todo[i++];
            try {
              const res = await fetch(u, { signal: sig });
              if (res && res.ok) await cache.put(u, res);
              else failed++;
            } catch {
              if (sig.aborted) return;
              failed++;
            }
            paint(
              list,
              Math.max(list.length - (todo.length - i) - failed, 0),
              failed,
            );
          }
        }
        await Promise.all(Array.from({ length: 6 }, worker));
        abortDL = null;
        done = await countCached(list);
        paint(list, done, failed);
      };
    })();

    /* قسم التحديث */
    p.querySelector("#apUpd").onclick = async (e) => {
      const btn = e.currentTarget;
      setHTML(btn, `${ICONS.clock} جارٍ التحقق…`);
      try {
        const reg = await navigator.serviceWorker.register("sw.js");
        await reg.update();
        const nw = reg.waiting || reg.installing;
        setHTML(
          btn,
          nw
            ? `${ICONS.refresh} تم اكتشاف تحديث جديد — سيُفعَّل خلال لحظات`
            : `${ICONS.check} أنت على أحدث نسخة بالفعل`
        );
        if (nw) setTimeout(() => location.reload(), 1200);
      } catch {
        setHTML(btn, `${ICONS.alert} تعذر التحقق — تحقق من الاتصال بالإنترنت`);
      }
    };
  }

  /* ── زر CTA تحت الهيدر: أول عنصر داخل المحتوى الرئيسي ── */
  function mount() {
    if (document.getElementById("appCta")) return;
    const main =
      document.querySelector("main") || document.querySelector(".wrap");
    if (!main) return;
    const b = document.createElement("button");
    b.id = "appCta";
    b.title = "تثبيت التطبيق + تحميل المحتوى للعمل دون إنترنت";
    setHTML(
      b,
      `<span class="cta-ic">${isDesktop ? ICONS.desktop : ICONS.mobile}</span><span>حمّل الموقع كتطبيق ${isDesktop ? "للابتوب والكمبيوتر" : "للجوال"} — يعمل دون إنترنت<small>تثبيت على ${isDesktop ? "سطح المكتب وقائمة ابدأ" : "شاشتك الرئيسية"} + تحميل كل المحتوى أوفلاين + تحديث تلقائي مع السيرفر</small></span>`,
    );
    b.onclick = openPanel;
    main.prepend(b);
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", mount);
  else mount();

  /* ── رابط مباشر #app: افتح اللوحة ── */
  function focusApp() {
    mount();
    openPanel();
  }
  if (location.hash === "#app")
    setTimeout(focusApp, document.readyState === "loading" ? 500 : 0);
  window.addEventListener("hashchange", () => {
    if (location.hash === "#app") focusApp();
  });

  /* ── ضمان هوية المادة والأيقونات لأي تفرع أو صفحة تلقائياً ── */
  function ensureBranding() {
    if (!document.querySelector('link[rel="icon"][type="image/svg+xml"]')) {
      const s = document.createElement("link");
      s.rel = "icon";
      s.type = "image/svg+xml";
      s.href = "icons/icon.svg?v=2";
      document.head.appendChild(s);
    }
    if (!document.querySelector('link[rel="icon"][sizes="32x32"]')) {
      const p = document.createElement("link");
      p.rel = "icon";
      p.type = "image/png";
      p.sizes = "32x32";
      p.href = "icons/icon-32.png?v=2";
      document.head.appendChild(p);
    }
    if (!document.querySelector('link[rel="shortcut icon"]')) {
      const ico = document.createElement("link");
      ico.rel = "shortcut icon";
      ico.href = "favicon.ico?v=2";
      document.head.appendChild(ico);
    }

    const cfg = window.TOC_CONFIG;
    if (cfg && cfg.homeSvg) {
      document
        .querySelectorAll("#brandHome, #homeBtn, .brand .lm")
        .forEach((el) => {
          if (!el.querySelector("svg")) {
            setSVG(el, cfg.homeSvg);
          }
        });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureBranding);
  } else {
    ensureBranding();
  }
})();
