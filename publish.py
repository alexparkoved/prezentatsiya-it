"""Netlify publication helper. Credentials are supplied only by the secure binding.

check: read-only authentication; plan: local archive validation;
publish: create/reuse one site and publish the prepared client folder;
verify: verify the recorded production index against the local reviewed file.
"""
import argparse
import hashlib
import io
import json
import os
from pathlib import Path
import re
import sys
import time
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener
from zipfile import ZipFile, ZIP_DEFLATED

ROOT=Path('/workspace/shared/benghazi-delivery')
SITE=ROOT/'Benghazi-Park-Web'
STATE=Path(__file__).with_name('deployment.json')
API='https://api.netlify.com/api/v1'

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self,*args,**kwargs): return None

def api(path,method='GET',data=None,content_type='application/json'):
    token=os.environ.get('NETLIFY_AUTH_TOKEN')
    if not token: raise RuntimeError('The secure NETLIFY_AUTH_TOKEN binding is missing.')
    if data is not None and content_type=='application/json': data=json.dumps(data).encode()
    request=Request(API+path,data=data,method=method,headers={
        'Authorization':'Bearer '+token,'Content-Type':content_type,
        'User-Agent':'Benghazi-Park-Publication/1.0'})
    with build_opener(NoRedirect()).open(request,timeout=45) as response:
        return json.load(response)

def files():
    if not (SITE/'index.html').is_file():
        raise RuntimeError('The approved presentation files are absent. Restore Benghazi-Park-Web or the approved standalone HTML before publishing.')
    allowed={'index.html','presentation.css','presentation.js','map-data.js','map.js','_headers','netlify.toml'}
    found={}
    for path in sorted(SITE.rglob('*')):
        if path.is_symlink(): raise RuntimeError('Symlinks are not allowed in the public folder.')
        if not path.is_file(): continue
        name=path.relative_to(SITE).as_posix()
        if name not in allowed and not re.fullmatch(r'assets/[\w.-]+',name):
            raise RuntimeError('Unexpected public file: '+name)
        found[name]=path.read_bytes()
    return found

def archive(found):
    buffer=io.BytesIO()
    with ZipFile(buffer,'w',ZIP_DEFLATED) as output:
        for name,content in found.items(): output.writestr(name,content)
    return buffer.getvalue()

def read_state():
    state=json.loads(STATE.read_text()) if STATE.exists() else {}
    site_id=os.environ.get('NETLIFY_SITE_ID') or state.get('site_id')
    if site_id:
        if not re.fullmatch(r'[a-zA-Z0-9-]{8,64}',site_id): raise RuntimeError('Invalid site ID.')
        state['site_id']=site_id
    return state

def save_state(state):
    temp=STATE.with_suffix('.tmp')
    temp.write_text(json.dumps(state,indent=2)+'\n')
    temp.replace(STATE)

def public_url(site):
    parts=urlsplit(site.get('ssl_url') or site.get('url') or '')
    if parts.scheme not in {'http','https'} or parts.username or parts.password or not re.fullmatch(r'[a-z0-9-]+\.netlify\.app',parts.netloc):
        raise RuntimeError('The public Netlify address is unavailable or unsupported.')
    return 'https://'+parts.netloc

def verify(url,found):
    url=public_url({'url':url})
    public={n:c for n,c in found.items() if n not in {'_headers','netlify.toml'}}
    for name,content in public.items():
        path='' if name=='index.html' else name
        with build_opener(NoRedirect()).open(url+'/'+path,timeout=30) as response: actual=response.read()
        if hashlib.sha256(actual).digest()!=hashlib.sha256(content).digest():
            raise RuntimeError('The hosted file differs from the approved local file: '+name)
    return len(public)

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command',choices=['plan','check','publish','verify'])
    args=parser.parse_args()
    if args.command=='check':
        account=api('/user')
        if not account.get('id'): raise RuntimeError('Netlify returned an unexpected account response.')
        print('Netlify authentication verified. No remote changes made.')
        return
    found=files()
    if args.command=='plan':
        zipped=archive(found)
        with ZipFile(io.BytesIO(zipped)) as check:
            if check.testzip() is not None or set(check.namelist())!=set(found):
                raise RuntimeError('Upload archive validation failed.')
        print(json.dumps({'folder':str(SITE),'files':len(found),'upload_bytes':len(zipped),
                          'archive_root':'index.html','remote_changes':False},indent=2))
        return
    state=read_state()
    if args.command=='publish':
        api('/user')
        if state.get('site_id'): site=api('/sites/'+state['site_id'])
        else:
            site=api('/sites','POST',{})
            state={'site_id':site['id'],'url':public_url(site)}
            save_state(state)
        deployment=api('/sites/'+state['site_id']+'/deploys?draft=false','POST',archive(found),'application/zip')
        state['deploy_id']=deployment['id']
        save_state(state)
        for _ in range(90):
            deployment=api('/deploys/'+state['deploy_id'])
            if deployment.get('state')=='ready': break
            if deployment.get('state') in {'error','failed','canceled'}: raise RuntimeError('Deployment failed.')
            time.sleep(2)
        else: raise RuntimeError('Deployment is still processing. Inspect the recorded deployment before retrying.')
        site=api('/sites/'+state['site_id'])
        if (site.get('published_deploy') or {}).get('id')!=state['deploy_id']:
            raise RuntimeError('The deployment is not yet the published production version.')
        state['url']=public_url(site)
        save_state(state)
    if not state.get('url'): raise RuntimeError('No published address is recorded yet.')
    state['verified_files']=verify(state['url'],found)
    save_state(state)
    print(json.dumps({'url':state['url'],'verified_files':state['verified_files']},indent=2))

if __name__=='__main__':
    try: main()
    except HTTPError as error:
        print('HTTP '+str(error.code)+': check service access and deployment status.',file=sys.stderr)
        sys.exit(2)
    except URLError:
        print('Network connection failed. Check the allowed destinations and execution network access.',file=sys.stderr)
        sys.exit(2)
    except (RuntimeError,ValueError,KeyError,OSError) as error:
        print(str(error),file=sys.stderr)
        sys.exit(2)
