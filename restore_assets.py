"""Restore media from the published site without storing media in Git."""
import concurrent.futures,hashlib,json,re,argparse
from pathlib import Path
from urllib.request import urlopen
root=Path(__file__).resolve().parent
state=json.loads((root/'deployment.json').read_text())
url=state['url'].rstrip('/')
if not re.fullmatch(r'https://[a-z0-9-]+\.netlify\.app',url):raise SystemExit('Unexpected media origin.')
manifest=json.loads((root/'assets-manifest.json').read_text())
parser=argparse.ArgumentParser();parser.add_argument('--out',type=Path,default=Path('/workspace/media/benghazi'));args=parser.parse_args();out=args.out.resolve()
if out==root or root in out.parents:raise SystemExit('Media must remain outside Git.')
out.mkdir(parents=True,exist_ok=True)
def restore(item):
 name,info=item
 if not re.fullmatch(r'[\w.-]+',name):raise ValueError('Invalid asset name')
 target=out/name
 if target.exists() and hashlib.sha256(target.read_bytes()).hexdigest()==info['sha256']:return name
 with urlopen(url+'/assets/'+name,timeout=45) as response:data=response.read()
 if len(data)!=info['bytes'] or hashlib.sha256(data).hexdigest()!=info['sha256']:raise ValueError('Asset verification failed: '+name)
 target.write_bytes(data);return name
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
 count=len(list(pool.map(restore,manifest.items())))
print('Restored and verified',count,'media files.')
