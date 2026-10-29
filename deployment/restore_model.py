from pathlib import Path
import gzip, hashlib, json
base=Path(__file__).resolve().parent
manifest=json.loads((base/'manifest.json').read_text())
target=base.parent/'assets/soco_chico.glb'
expected=manifest['glb_sha256']
if target.exists() and hashlib.sha256(target.read_bytes()).hexdigest()==expected:
    print('Existing GLB verified; no regeneration')
else:
    blocks=[]
    for item in manifest['parts']:
        data=(base/item['path']).read_bytes()
        assert len(data)==item['bytes'] and hashlib.sha256(data).hexdigest()==item['sha256'], item['path']
        blocks.append(data)
    glb=gzip.decompress(b''.join(blocks))
    assert hashlib.sha256(glb).hexdigest()==expected, 'GLB checksum mismatch'
    assert glb[:4]==b'glTF', 'Invalid GLB'
    target.parent.mkdir(parents=True,exist_ok=True)
    target.write_bytes(glb)
    print('Original GLB restored and SHA-256 verified:',len(glb),'bytes')
