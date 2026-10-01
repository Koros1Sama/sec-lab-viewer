/* ═══════════════════════════════════════════════════════════
   ملف التهيئة — أمن المعلومات
   الحالة الحالية: العملي فقط (defaultView=models) + النظري معلق
   لتفعيل النظري لاحقاً: ولّد L#_ar/L#_ex + حدّث meta.js وأضف
   الملفات لقائمة files.index وغيّر defaultView لـ "slides".
   ═══════════════════════════════════════════════════════════ */
window.TOC_CONFIG = {
  /* ── هوية المادة ── */
  subject: "معمل أمن المعلومات",
  brand: "معمل أمن المعلومات · Lab Viewer",
  brandSmall: "معامل أ. إيمان الزلب · أ. وائل الوظاف",
  homeIcon: "Σ",
  homeSvg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M256 84l146 58v106c0 94-60 172-146 212-86-40-146-118-146-212V142z"/><circle cx="256" cy="234" r="36"/><path d="M256 270v56"/></svg>',
  pageTitle: "معمل أمن المعلومات · عارض التطبيقات العملية واختبار الاختراق",
  summaryBrand: "معمل أمن المعلومات · ملخص العملي",
  teachers: "إشراف المعمل: أ. إيمان الزلب · أ. وائل الوظاف",
  lecturesRange: "8 معامل عملية (183 شريحة)",
  aboutLine:
    "عارض معمل وتطبيقات «أمن المعلومات والأمن السيبراني» — إشراف أ. إيمان الزلب وأ. وائل الوظاف. يغطي أوامر كالي لينكس، فحص الشبكات Nmap، إطار Metasploit، كسر كلمات المرور John/Hydra، فحص ثغرات الويب، والتشفير العملي.",

  /* ── نطاق الاختبار: مفتوح بالكامل حالياً حتى يتم التأكد من الدكاترة ── */
  excludedLecs: [],
  includedSlides: [],
  excludedSlides: [],

  /* ── أيقونات ── */
  lecIcons: {},
  modelIcons: {},

  /* ── العرض الافتراضي: العملي أولاً ── */
  defaultView: "slides",
  theoryUrl: "https://koros1sama.github.io/sec-viewer/",

  /* ── رسائل الأقسام المعلقة ── */
  theoryPendingTitle: "النظري قيد الإعداد",
  theoryPendingSub:
    "الجزء النظري سيتوفر لاحقاً — راجع العملي الآن من زر «النماذج» أعلاه",
  modelsPendingTitle: "نماذج العملي قيد التوليد",
  modelsPendingSub:
    "افتح MODELS_PROMPT.md وأرفق مصادرك العملية لأي وكيل ذكاء اصطناعي — الناتج ضعه في data/models_sec1.js (مضاف مسبقاً في القائمة)",

  /* ── ملفات البيانات لكل صفحة ── */
  files: {
    index: [
      "meta",
      "L1_ar",
      "L1_ex",
      "L2_ar",
      "L2_ex",
      "L3_ar",
      "L3_ex",
      "L4_ar",
      "L4_ex",
      "L5_ar",
      "L5_ex",
      "L6_ar",
      "L6_ex",
      "L7_ar",
      "L7_ex",
      "L8_ar",
      "L8_ex",
      "glossary",
      "img_prompts",
      "qpics",
      "models_sec1",
      "models_sec2",
      "models_sec3",
      "models_sec4",
      "tables",
      "summary",
    ],
    summary: ["meta", "summary"],
    prompts: ["img_prompts"],
  },
};
