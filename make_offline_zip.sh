#!/usr/bin/env bash
# ═══ يولّد offline-full.zip — نسخة ابتوب كاملة تعمل بلا إنترنت (file://) ═══
# التشغيل: bash make_offline_zip.sh  (قبل كل git push لتحديث النسخة)
# يتطلب bsdtar (C:/Windows/System32/tar.exe على ويندوز) أو أي tar يدعم -a مع .zip
set -e
cd "$(dirname "$0")"

TAR=/c/Windows/System32/tar.exe
[ -x "$TAR" ] || TAR=tar # على لينكس/ماك tar -a يدعم zip عبر libarchive غالباً

SUBJ="أمن المعلومات"
cat >"READ_ME_FIRST.txt" <<EOF
نسخة الابتوب — $SUBJ (تعمل بلا إنترنت)

١) فك ضغط هذا المجلد كاملاً في أي مكان على جهازك
٢) افتح index.html بنقرة مزدوجة — يعمل فوراً بأي متصفح
   • كل الميزات متاحة: السلايدات، النماذج، الجداول، الملخص، البحث، الثيمات
   • تقدمك وإجاباتك تُحفظ محلياً في متصفح الابتوب
   • وضع «التثبيت كتطبيق» يتطلب خادم https — غير ضروري للاستخدام
٣) ملفات أخرى: summary.html (الملخص الشامل) · prompts.html (برومبتات الصور)
٤) للتحديث مستقبلاً: أعد تنزيل نسخة ZIP أحدث من الموقع المنشور
EOF

rm -f offline-full.zip
"$TAR" -a -c -f offline-full.zip \
 index.html summary.html prompts.html app.js sw.js manifest.json \
 icons data READ_ME_FIRST.txt
rm -f "READ_ME_FIRST.txt"
echo "تم بنجاح: offline-full.zip ($(du -h offline-full.zip | cut -f1)) — جاهز للالتزام مع git"
