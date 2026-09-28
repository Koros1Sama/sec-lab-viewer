import json, os, subprocess, re

conv_id = '663c5e27-7a13-4cfb-bb7d-2c4d6d465203'
main_p = rf'C:\Users\KorosSama\.gemini\antigravity\brain\{conv_id}\.system_generated\logs\transcript_full.jsonl'
b5_p = r'C:\Users\KorosSama\.gemini\antigravity\brain\18541eb9-9b62-42e4-9a1c-5bfeec0a4587\.system_generated\logs\transcript_full.jsonl'

drafts_dir = 'HW/Sec_Viewer/data/drafts'
os.makedirs(drafts_dir, exist_ok=True)

def extract_from_text(c, batch_name):
    # look for fenced code block ```js ... ``` or array starting with [ { id: "B#-Q1"
    m = re.search(r'```(?:javascript|js|json)?\s*([\s\S]*?)\s*```', c)
    raw = None
    if m:
        candidate = m.group(1).strip()
        if f'{batch_name}-Q1' in candidate:
            raw = candidate
    if not raw:
        idx = c.find(f'{batch_name}-Q1')
        if idx != -1:
            start = c.rfind('[', 0, idx)
            end = c.rfind(']')
            if start != -1 and end != -1:
                raw = c[start:end+1]
    return raw

batches = ['B1', 'B2', 'B3', 'B4']
with open(main_p, 'r', encoding='utf-8') as f:
    for line in f:
        if not line.strip():
            continue
        try:
            obj = json.loads(line)
            c = obj.get('content', '')
            for b in batches:
                if f'{b}-Q1' in c:
                    raw = extract_from_text(c, b)
                    if raw:
                        target_file = f'{drafts_dir}/{b}_clean.json'
                        raw_file = f'{drafts_dir}/{b}_raw.js'
                        with open(raw_file, 'w', encoding='utf-8') as rf:
                            # clean const decl if any
                            clean_raw = re.sub(r'^(?:const|let|var)\s+\w+\s*=\s*', '', raw).rstrip(';')
                            rf.write('module.exports = ' + clean_raw + ';')
                        res = subprocess.run(['node', '-e', f'console.log(JSON.stringify(require("./{raw_file}")))'], capture_output=True, text=True, encoding='utf-8')
                        if res.returncode == 0:
                            parsed = json.loads(res.stdout)
                            with open(target_file, 'w', encoding='utf-8') as out:
                                json.dump(parsed, out, ensure_ascii=False, indent=2)
                            print(f'{b}: Successfully extracted! {len(parsed)} questions.')
                        else:
                            print(f'{b} node error: {res.stderr[:200]}')
        except Exception as e:
            pass

# B5 check
if not os.path.exists(f'{drafts_dir}/B5_clean.json'):
    with open(b5_p, 'r', encoding='utf-8') as f:
        for line in f:
            if not line.strip(): continue
            try:
                obj = json.loads(line)
                c = obj.get('content', '')
                if 'B5-Q1' in c:
                    raw = extract_from_text(c, 'B5')
                    if raw:
                        target_file = f'{drafts_dir}/B5_clean.json'
                        raw_file = f'{drafts_dir}/B5_raw.js'
                        with open(raw_file, 'w', encoding='utf-8') as rf:
                            clean_raw = re.sub(r'^(?:const|let|var)\s+\w+\s*=\s*', '', raw).rstrip(';')
                            rf.write('module.exports = ' + clean_raw + ';')
                        res = subprocess.run(['node', '-e', f'console.log(JSON.stringify(require("./{raw_file}")))'], capture_output=True, text=True, encoding='utf-8')
                        if res.returncode == 0:
                            parsed = json.loads(res.stdout)
                            with open(target_file, 'w', encoding='utf-8') as out:
                                json.dump(parsed, out, ensure_ascii=False, indent=2)
                            print(f'B5: Successfully extracted! {len(parsed)} questions.')
            except Exception as e:
                pass
