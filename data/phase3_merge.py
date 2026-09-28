import json, glob, os, sys, random

audit_files = [
    'HW/Sec_Viewer/data/drafts/audits/B1_part1_audited.json',
    'HW/Sec_Viewer/data/drafts/audits/B1_part2_audited.json',
    'HW/Sec_Viewer/data/drafts/audits/B2_part1_audited.json',
    'HW/Sec_Viewer/data/drafts/audits/B2_part2_audited.json',
    'HW/Sec_Viewer/data/drafts/audits/B3_part1_audited.json',
    'HW/Sec_Viewer/data/drafts/audits/B3_part2_audited.json',
    'HW/Sec_Viewer/data/drafts/audits/B4_part1_audited.json',
    'HW/Sec_Viewer/data/drafts/audits/B4_part2_audited.json',
    'HW/Sec_Viewer/data/drafts/audits/B5_part1_audited.json',
    'HW/Sec_Viewer/data/drafts/audits/B5_part2_audited.json'
]

all_questions = []
for p in audit_files:
    with open(p, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
        all_questions.extend(data)

print(f"Total questions loaded from 10 audit files: {len(all_questions)}")

cleaned_questions = []
seen_texts = set()

for idx, q in enumerate(all_questions):
    q_type = q.get('type')
    q_ar = q.get('q_ar') or q.get('question')
    if not q_ar:
        print(f"Warning: item {idx} has no question text!")
        continue
    
    # Deduplicate
    words = q_ar.strip().split()
    fingerprint = " ".join(words[:6])
    if fingerprint in seen_texts:
        print(f"Duplicate detected: {fingerprint}")
        continue
    seen_texts.add(fingerprint)
    
    raw_opts = q.get('opts') or q.get('options') or []
    cleaned_opts = []
    for opt in raw_opts:
        ar_text = opt.get('ar') or opt.get('text')
        is_ok = bool(opt.get('ok'))
        why_text = opt.get('why', '')
        cleaned_opts.append({
            'ar': ar_text,
            'ok': is_ok,
            'why': why_text
        })
    
    true_count = sum(1 for o in cleaned_opts if o['ok'])
    if true_count != 1:
        print(f"Warning in {q.get('id')}: true_count = {true_count}")
    
    new_q = {
        'id_temp': q.get('id'),
        'type': q_type,
        'q_ar': q_ar,
        'opts': cleaned_opts
    }
    if 'tip' in q and q['tip']:
        new_q['tip'] = q['tip']
    cleaned_questions.append(new_q)

print(f"Total unique questions after deduplication: {len(cleaned_questions)}")

# Balance MCQ ok:true positions
random.seed(42)
for q in cleaned_questions:
    if q['type'] == 'mcq':
        random.shuffle(q['opts'])

mcq_pos = [0, 0, 0, 0]
for q in cleaned_questions:
    if q['type'] == 'mcq':
        for i, o in enumerate(q['opts']):
            if o['ok']:
                mcq_pos[i] += 1
print("MCQ ok:true position distribution (A, B, C, D):", mcq_pos)

final_numbered = []
for n, q in enumerate(cleaned_questions, 1):
    q_item = {
        'n': n,
        'id_temp': q.get('id_temp'),
        'type': q['type'],
        'q_ar': q['q_ar'],
        'opts': q['opts']
    }
    if 'tip' in q:
        q_item['tip'] = q['tip']
    final_numbered.append(q_item)

out_file = 'HW/Sec_Viewer/data/drafts/phase3_merged.json'
with open(out_file, 'w', encoding='utf-8') as out:
    json.dump(final_numbered, out, ensure_ascii=False, indent=2)

print(f"Phase 3 merged successfully: {len(final_numbered)} questions in {out_file}")
