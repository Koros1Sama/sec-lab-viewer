import json, os, sys

slices_dir = 'HW/Sec_Viewer/data/drafts/en_slices'
all_questions = []

for i in range(1, 11):
    slice_path = f'{slices_dir}/slice_{i}_en.json'
    with open(slice_path, 'r', encoding='utf-8') as sf:
        q_list = json.load(sf)
        all_questions.extend(q_list)

print(f"Total questions loaded from 10 slices: {len(all_questions)}")

# Load image prompts
img_prompts_map = {}
for ip_file in ['HW/Sec_Viewer/data/drafts/img_prompts_network.json', 'HW/Sec_Viewer/data/drafts/img_prompts_crypto.json']:
    if os.path.exists(ip_file):
        with open(ip_file, 'r', encoding='utf-8') as ipf:
            prompts = json.load(ipf)
            for p in prompts:
                n = p.get('n')
                if n:
                    img_prompts_map[n] = p.get('image_prompt')

print(f"Image prompts loaded for questions: {list(img_prompts_map.keys())}")

# Attach image prompts & clean temporary fields
final_questions = []
img_prompts_toc = []

for idx, q in enumerate(all_questions, 1):
    q_clean = {
        'n': idx,
        'type': q['type'],
        'q_ar': q['q_ar']
    }
    if 'q_en' in q and q['q_en']:
        q_clean['q_en'] = q['q_en']
    
    # Check image prompt
    if idx in img_prompts_map:
        q_clean['image_prompt'] = img_prompts_map[idx]
        img_prompts_toc.append({
            'id': f"sec1#{idx}",
            'title_ar': q['q_ar'][:80],
            'prompt': img_prompts_map[idx]
        })
    
    opts_clean = []
    for opt in q['opts']:
        o = {
            'ar': opt['ar'],
            'ok': bool(opt['ok']),
            'why': opt.get('why', '')
        }
        if 'en' in opt and opt['en']:
            o['en'] = opt['en']
        opts_clean.append(o)
    
    q_clean['opts'] = opts_clean
    if 'tip' in q and q['tip']:
        q_clean['tip'] = q['tip']
    
    final_questions.append(q_clean)

# Write img_prompts.js
img_prompts_js = f"""/* ═══════════════════════════════════════════════════════════
   برومبتات صور الأسئلة الرسومية — أمن المعلومات (العملي)
   ═══════════════════════════════════════════════════════════ */
window.TOC_IMG_PROMPTS = {json.dumps(img_prompts_toc, ensure_ascii=False, indent=2)};
"""

with open('HW/Sec_Viewer/data/img_prompts.js', 'w', encoding='utf-8') as ip_out:
    ip_out.write(img_prompts_js)
print(f"Saved HW/Sec_Viewer/data/img_prompts.js with {len(img_prompts_toc)} prompts.")

# Write models_sec1.js
model_payload = {
    'id': "sec1",
    'kind': "عملي",
    'title_ar': "نماذج اختبار أمن المعلومات — العملي الشامل",
    'origin_ar': "تطبيقات وتجارب المعمل العملي (كالي لينكس، أوامر النظام والشبكة، استطلاع OSINT، فحص Nmap وNetdiscover، إطار ميتاسبلويت، كسر كلمات المرور وJohn/Hydra، أمن تطبيقات الويب SQLMap وBurp Suite، وأساسيات التشفير الكلاسيكي قيصر وفيجينير وبلايفير)",
    'questions': final_questions
}

models_sec1_content = f"""/* ═══════════════════════════════════════════════════════════
   بنك أسئلة أمن المعلومات — الجزء العملي الشامل
   عدد الأسئلة: {len(final_questions)} سؤالاً عملياً دقيقاً
   مرجعية معتمدة: كافة ملفات المعمل ومذكرات وتكاليف المادة
   ═══════════════════════════════════════════════════════════ */
window.TOC_MODELS = window.TOC_MODELS || [];
window.TOC_MODELS.push({json.dumps(model_payload, ensure_ascii=False, indent=2)});
"""

with open('HW/Sec_Viewer/data/models_sec1.js', 'w', encoding='utf-8') as m_out:
    m_out.write(models_sec1_content)
print(f"Saved HW/Sec_Viewer/data/models_sec1.js with {len(final_questions)} questions!")
