# Published restoration validation — 2026-11-01

Production: https://benghazi-park-one-card.netlify.app/

- Seven slides: reveal counts 3 / 5 / 2 / 7 / 5 / 4 / 3; all images and local fonts load; no JavaScript errors.
- Real browser clicks draw orange route 1, then light-blue route 2 while orange remains complete. Both are retained at the end.
- Arrow keys, replay, auto play/pause, fullscreen, final stop and optional future module (6 vs 7 slides) passed.
- Local touch navigation / canvas / controls fit passed at 390×844, 844×390, 768×1024 and 320×568.
- Anonymous production HTTP access returns 200. All 17 publicly served source/media files match local hashes. Login protection is disabled for this presentation site.
- Anonymous production browser checked all slides, both actual route animations, optional module, mobile swipe and download. Five production scenarios passed with zero errors.
- The download arrow builds one self-contained HTML in the browser; that downloaded file was opened independently and all seven slides / fonts / images passed. Large offline uploads were rejected by the service; browser export avoids that limit.
- Netlify incremental hash uploads are used for updates, preserving the same site ID. ZIP upload is not used for publication. The ZIP remains an optional local delivery format.
- A fresh external directory was restored from the public site: all 12 media files passed byte-count and SHA256 checks.
- A full silent 103.84-second H.264/720p walkthrough and seven-page static PDF were generated outside Git. HTML is the interactive presentation.

The media directory is outside Git. Asset filenames, byte counts and SHA256 are tracked in assets-manifest.json; restore_assets.py restores them from the public site. The production site's non-secret metadata is in deployment.json. No tokens, media or base64 presentation files are committed.

This restores the reviewed narrative and corrections from the original source materials and conversation. Missing generated scenes were recreated; it is not a pixel-identical recovery of the lost environment. Further owner corrections should be applied to this maintained source.
