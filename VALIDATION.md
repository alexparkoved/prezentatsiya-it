# Presentation validation

## Finished eight-slide English / Arabic publication — 2026-11-01 (latest)

The owner approved the risk-slide design and authorized its integration and publication. The approved six-panel risk slide is penultimate in the complete eight-slide English/Arabic deck. Its six impacts reveal on clicks 1–6, with the takeaway on click 7. The original closing remains last. One small language switch is visible only on the cover.

- Rendered and inspected every slide in both languages. No text overflows or JavaScript errors. The approved English risk composition is retained; Arabic receives RTL ordering, Cairo typography and scoped spacing. All risk copy, kicker, context, impact tag, takeaway, footer, image description, section label and slide name are translated.
- All 44 forward transitions and 44 reverse transitions passed in each language. Language switching preserves reveal progress and autoplay state. Both completed map routes persist; an in-progress route continues through a language change. All seven previously approved slide contents are identical to the bilingual review, excluding regenerated footer numbers.
- Audited all Arabic slide text: no English labels remain except the intentional NFC acronym. English source is restored by the same switch. Both built and browser-downloaded standalone copies contain the eight slides, embedded Arabic fonts and the new illustration.
- Checked every page number in both languages: 01/08 through 08/08, with risk 07/08 and final 08/08. Optional Future exclusion produces 01/07 through 07/07 and keeps risk 06/07 before final 07/07. The single language selector is hidden on all later slides.
- Canonical publication https://benghazi-park-one-card.netlify.app/ passed anonymous public Chromium checks on five profiles: desktop 1600×900, laptop 1366×768, phone 390×844, landscape 844×390 and tablet 768×1024. Both languages, all eight slides, both routes, page numbers, penultimate risk placement, touch / keyboard navigation, canvas bounds and the pure-white sixth slide passed. These are browser emulations, not physical-device tests. Zero JavaScript errors.
- The publisher verified all 22 public source/media files against local hashes. The existing site ID and canonical customer URL are retained. A fresh recovery into an empty external directory restored and SHA256-verified all 16 media files, including Cairo and the approved risk illustration. Sources and non-secret deployment metadata are preserved in Git; binaries and self-contained HTML stay outside it.

## English / Arabic review — 2026-11-01 (separate preview)

The owner authorized bilingual preparation before approval of the risk slide. Seven current slides only; the risk draft remains excluded. One cover-only English / العربية switch sits at bottom right and remains usable at phone scale. Switching updates the seven slides, Arabic RTL typography, dynamic map legend / route captions / statuses, controls, slide names and accessibility descriptions. It preserves the current reveal and running animation; English is the default on a fresh visit, and ?lang=ar is supported.

- Rendered and inspected all seven slides in both languages, including brighter maps and the pure-white telephone slide. Arabic-only spacing adjustments keep the service note separate from the map and the cashier text above the footer.
- All 36 forward transitions and 36 reverse transitions passed in each language. Mouse, Space and Enter toggle the language without advancing the slide. The optional 6/7-slide mode, autoplay state, completed routes and an in-progress route animation retain their state across language changes.
- Pixel comparison: all seven English slides match the previous production snapshot exactly when the added language switch is hidden.
- Both generated and browser-downloaded standalone HTML copies include the Arabic fonts and switch successfully. No English slide labels remain in the Arabic DOM except the intentional NFC acronym.
- Local responsive checks passed laptop, phone portrait, phone landscape and tablet. Anonymous public Chromium checks then passed five profiles (1600×900, 1366×768, 390×844, 844×390 and 768×1024), both languages, all seven slides, both routes, touch / keyboard navigation, bounds and the white sixth slide. These are browser emulations, not tests on physical devices. No JavaScript errors.
- Netlify verified all 21 public files of the draft snapshot against local hashes. Production deployment ID and production index bytes remain unchanged. The separate review URL and recovery metadata are in bilingual-preview.json; deployment.json retains the customer's English publication.
- Fresh recovery from the draft snapshot restored and hash-verified all 15 media files, including Cairo 700/900, into an empty external directory. Media and self-contained delivery HTML stay outside Git.

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
