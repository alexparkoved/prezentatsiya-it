# Presentation validation

## Sixth-slide follow-up — 2026-11-01 (latest)

The owner identified the telephone slide. Its background is now pure RGB 255/255/255 with an explicit inline light background, no background gradient, normal phone-image blending and a brighter display filter. Only section 6 and CSS rules scoped to .future-slide changed. Sections 1–5 and 7, all map data, route code and navigation are byte-identical. Public forced-dark browser checks passed all four reveals and a working downloaded copy; closing retains its original treatment. The publisher verified all 18 public files.

## IT-1 — 2026-11-01 (current)

- Reproduced the reported darkness with Chrome WebContentsForceDark: previous light backgrounds became approximately RGB 34/32/28. CSS `color-scheme: only light` and an early HTML color-scheme declaration now keep them light (RGB 255/253/248) in normal and forced-dark rendering.
- Slides 3, 5 and 6 use a bright paper background. Maps render with normal blending and increased brightness, preserving every geographic position and both route definitions. Mobile letterboxing follows the light background on these slides.
- Added a transparent 3D illustration from the supplied controller photo to slide 4, labelled Controller. It appears on reveal 7; the card / wristband follow on reveal 8. Reveal counts are now 3 / 5 / 2 / 8 / 5 / 4 / 3.
- Normal / forced-dark screenshots were inspected for slides 3–7. Slide 7's normal screenshot is pixel-identical to the previous version; other slide sections and both map source files are unchanged apart from the requested slide-4 addition and theme styling.
- Local browser verified controller/carrier reveal order, both complete routes, optional 6/7-slide mode, mobile light background / bounds and a working downloaded standalone HTML containing the new controller and theme guard.
- The same four targeted workflows passed anonymously on the published site, including forced dark mode and the downloaded copy, with zero JavaScript errors.
- Updated public files were verified against local hashes by the publisher (18 served files). The existing Netlify site ID and customer URL are retained.

## Initial restored publication — 2026-11-01 (historical)

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
