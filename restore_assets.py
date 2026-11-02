"""Restore media from the published site without storing media in Git."""
import concurrent.futures,hashlib,json,re,argparse,base64
from pathlib import Path
from urllib.request import urlopen
root=Path(__file__).resolve().parent
state=json.loads((root/'deployment.json').read_text())
sources=[state['url'].rstrip('/')]
preview=root/'bilingual-preview.json'
if preview.exists():sources.insert(0,json.loads(preview.read_text())['url'].rstrip('/'))
if any(not re.fullmatch(r'https://[a-z0-9-]+\.netlify\.app',url) for url in sources):raise SystemExit('Unexpected media origin.')
manifest=json.loads((root/'assets-manifest.json').read_text())
parser=argparse.ArgumentParser();parser.add_argument('--out',type=Path,default=Path('/workspace/media/benghazi'));parser.add_argument('--offline',type=Path,help='Recover verified media from a delivered self-contained HTML');args=parser.parse_args();out=args.out.resolve()
if out==root or root in out.parents:raise SystemExit('Media must remain outside Git.')
out.mkdir(parents=True,exist_ok=True)
offline_media={}
if args.offline:
 html=args.offline.read_text(encoding='utf-8-sig');start=html.find('let deck=')
 if start<0:raise SystemExit('Unrecognized standalone HTML format.')
 decoder=json.JSONDecoder();_,end=decoder.raw_decode(html,start+len('let deck='));marker=';const media='
 if not html.startswith(marker,end):raise SystemExit('Standalone media payload not found.')
 offline_media,_=decoder.raw_decode(html,end+len(marker))
def restore(item):
 name,info=item
 if not re.fullmatch(r'[\w.-]+',name):raise ValueError('Invalid asset name')
 target=out/name
 if target.exists() and hashlib.sha256(target.read_bytes()).hexdigest()==info['sha256']:return name
 if name in offline_media:
  data=base64.b64decode(offline_media[name]['base64'],validate=True)
  if len(data)!=info['bytes'] or hashlib.sha256(data).hexdigest()!=info['sha256']:raise ValueError('Offline asset hash mismatch: '+name)
  target.write_bytes(data);return name
 for url in sources:
  try:
   with urlopen(url+'/assets/'+name,timeout=45) as response:data=response.read()
  except OSError:continue
  if len(data)==info['bytes'] and hashlib.sha256(data).hexdigest()==info['sha256']:
   target.write_bytes(data);return name
 raise ValueError('Could not restore and verify asset: '+name)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 count=len(list(pool.map(restore,manifest.items())))
print('Restored and verified',count,'media files.')
