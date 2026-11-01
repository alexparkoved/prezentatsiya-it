"""Build an isolated risk-slide mockup without changing the published deck."""
import base64,json,mimetypes,re,shutil
from pathlib import Path
root=Path(__file__).resolve().parent
assets=Path('/workspace/media/benghazi')
out=Path('/workspace/shared/benghazi-delivery/risk-draft-v1');(out/'assets').mkdir(parents=True,exist_ok=True)
html=(root/'slide.html').read_text();css=(root/'slide.css').read_text()
names=sorted(set(re.findall(r'assets/([\w.-]+)',html+css)))
for name in names:
 if not (assets/name).is_file():raise SystemExit('Missing preview media: '+name)
 shutil.copy2(assets/name,out/'assets'/name)
(out/'index.html').write_text(html);(out/'slide.css').write_text(css)
single=html.replace('<link rel="stylesheet" href="slide.css">','<style>'+css+'</style>')
for name in names:
 data=(assets/name).read_bytes();mime=mimetypes.guess_type(name)[0] or 'application/octet-stream'
 single=single.replace('assets/'+name,'data:'+mime+';base64,'+base64.b64encode(data).decode())
(out.parent/'Risk-Delay-Draft-v1.html').write_text(single)
print(json.dumps({'preview':str(out),'offline':str(out.parent/'Risk-Delay-Draft-v1.html'),'assets':len(names)},indent=2))
