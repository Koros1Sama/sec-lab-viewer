import json, re

with open('HW/Sec_Viewer/data/drafts/crypto_cmd.txt', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('[')
end = text.rfind(']')
if start != -1 and end != -1:
    raw_json = text[start:end+1]
    try:
        data = json.loads(raw_json)
    except Exception:
        raw_json_unesc = raw_json.replace('\\"', '"')
        data = json.loads(raw_json_unesc)
    
    with open('HW/Sec_Viewer/data/drafts/img_prompts_crypto.json', 'w', encoding='utf-8') as out:
        json.dump(data, out, ensure_ascii=False, indent=2)
    print("Saved img_prompts_crypto.json successfully! Items:", len(data))
