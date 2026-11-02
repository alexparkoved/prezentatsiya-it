"""Build the customer website and offline copy; media stay outside Git."""
import argparse,base64,hashlib,json,mimetypes,re,shutil
from pathlib import Path
parser=argparse.ArgumentParser()
parser.add_argument('--assets',type=Path,default=Path('/workspace/media/benghazi'))
parser.add_argument('--out',type=Path,default=Path('/workspace/shared/benghazi-delivery'))
a=parser.parse_args();root=Path(__file__).resolve().parent;out=a.out.resolve()
if out==root or root in out.parents:raise SystemExit('Generated media must remain outside the checkout.')
html=(root/'index.html').read_text();css=(root/'presentation.css').read_text()
scripts={n:(root/n).read_text() for n in ['i18n.js','map-data.js','map-revision-data.js','map.js','map-editor.js','presentation.js']}
names=sorted(set(re.findall(r'assets/([\w.-]+)',html+css+''.join(scripts.values()))))
missing=[n for n in names if not (a.assets/n).is_file()]
if missing:raise SystemExit('Missing media: '+', '.join(missing))
site=out/'Benghazi-Park-Web';(site/'assets').mkdir(parents=True,exist_ok=True)
for n in names:shutil.copy2(a.assets/n,site/'assets'/n)
(site/'index.html').write_text(html);(site/'presentation.css').write_text(css)
for n,s in scripts.items():(site/n).write_text(s)
(site/'_headers').write_text('/*\n  Cache-Control: public, max-age=0, must-revalidate\n  X-Content-Type-Options: nosniff\n')
(site/'netlify.toml').write_text('[build]\n  publish = "."\n')
payload=html.replace('<link rel="stylesheet" href="presentation.css">','<style>'+css+'</style>')
for n,s in scripts.items():payload=payload.replace('<script src="'+n+'"></script>','<script>'+s+'</script>')
media={};manifest={}
for n in names:
 data=(a.assets/n).read_bytes();mime='font/woff2' if n.endswith('.woff2') else mimetypes.guess_type(n)[0] or 'application/octet-stream'
 payload=payload.replace('assets/'+n,'__PARK_ASSET_'+n+'__')
 media[n]={'mime':mime,'base64':base64.b64encode(data).decode()}
 manifest[n]={'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data)}
def safe(v):return json.dumps(v,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')
loader='''<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="only light"><title>Benghazi Park</title></head><body style="background:#fffdf8;color:#25231f;font:18px Arial"><p>Opening Benghazi Park…</p><script>
let deck=__DECK__;const media=__MEDIA__;
for(const [name,asset] of Object.entries(media)){const binary=atob(asset.base64),bytes=new Uint8Array(binary.length);for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);const url=URL.createObjectURL(new Blob([bytes],{type:asset.mime}));deck=deck.split('__PARK_ASSET_'+name+'__').join(url);}
document.open();document.write(deck);document.close();
</script></body></html>'''
offline=loader.replace('__DECK__',safe(payload)).replace('__MEDIA__',safe(media))
(out/'Benghazi-Park-Presentation.html').write_text(offline)
(site/'Benghazi-Park-Presentation.html').unlink(missing_ok=True)
shutil.make_archive(str(out/'Benghazi-Park-Netlify'),'zip',out,site.name)
(root/'assets-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps({'site':str(site),'slides':html.count('<section class="slide '),'assets':len(names),'media_bytes':sum(v['bytes'] for v in manifest.values()),'offline_file':str(out/'Benghazi-Park-Presentation.html')},indent=2))
