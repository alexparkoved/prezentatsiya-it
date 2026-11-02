# Benghazi Park — новое дыхание Бенгази

FINAL local audience edition, 2026-11-02: eight slides, English by default and
Arabic through the single switch on the first slide. The complete deck switches
language without changing geography or the approved two guest routes.

The opening girl is larger and central, the title has two lines, and the five
mission headings are enlarged. The two bottom audience/park-benefit sentences
were removed at the owner's request. The finale's two parents and five children
are larger. Wordmarks sit at the upper right, without rectangular backgrounds.

All editor controls, category checkboxes and status messages are absent from the
audience edition. There are 53 master markers: the previous 52 positions remain
exact, and the new thirteenth guard post is at the VIP entrance. Master security
is 41–53; support-slide security is 4–16. VIP entrance remains distinct (17).

The self-contained final HTML contains all 18 media assets and can download its
own complete copy. Media recovery accepts this HTML via `restore_assets.py --offline`.
The production Netlify site is unchanged. See docs/final-bilingual-2026-11-02.md.

## Archived Russian working review

CURRENT local Russian review, 2026-11-02: an eight-slide presentation of the whole
park. The first slide now combines the familiar girl, title and FIVE mission
directions: emotions/happiness, movement/energy, calm/recovery, discoveries/history
of Benghazi, family/traditions. The finale has two parents and five different
children. Only the finale has five children.

Current order: 1 intro/mission; 2 complete park map; 3 dining; 4 entertainment;
5 support; 6 IT map with both routes; 7 park management; 8 happiness finale.
The previously confirmed nine slides became eight after the owner requested ONE
combined opening slide. The risk/future/journey slides are excluded from this
assembly. Source templates remain for initialization and historical translation.
park-story.js selects the final order; park-content.js holds Russian editorial
text for later English/Arabic editions. All 52 owner marker positions are retained.

Build: `python3 build.py --assets /path/to/media --out /path/to/delivery`.
Recover all 18 assets, including unpublished illustrations, from the current
self-contained delivery with:

```sh
python3 restore_assets.py --offline /path/to/Benghazi-Park-Presentation-RU.html --out /path/to/media
```

Recovery verifies file sizes and SHA256. Binary media stay outside Git. The current
presentation is for LOCAL REVIEW; the public URL below still contains the older
IT presentation. No Netlify publication has been performed. See
docs/park-story-2026-11-02.md for current editorial decisions.

## Historical IT-deck notes (current scope above takes precedence)

Public presentation: https://benghazi-park-one-card.netlify.app/

Local working review (2026-11-02) now contains twelve slides: four requested topic
views follow the main map, with the original eight slides retained. map-themes.js
duplicates the approved map at exactly the same coordinates and adds dining,
entertainment, a copy of the payment/system diagram, and park-support views.
Numbers restart within each topic. Main-map edits update the topic maps in the
same viewing session. The production URL above still refers to the published deck;
these new views have not been published. Use `?map-review=ru#4` for Russian topic
review; `#4` through `#7` open the four new slides directly.

The guest routes are restored on the card-service map (`#9` in this working order):
steps 1–3 show the 10/3 entrance cash desks and nine internal top-up points; step 4
draws the orange route, and step 5 retains orange while blue draws. Route endpoints
and service markers follow the current master positions. The final assembly order
is still pending the owner's next instructions.

Eight-slide animated English/Arabic presentation for Benghazi Park, including the approved penultimate slide “The risks of delay”. One small English / العربية switch appears at the bottom right of the first slide only. The chosen language applies to all eight slides, map legends, route captions, controls and accessibility labels. Switching preserves the current reveal. A fresh viewing session starts in English; `?lang=ar` opens directly in Arabic.

The future-options telephone slide can be excluded, leaving seven slides. Page numbering updates automatically: risk is 07/08 and closing 08/08 by default, or 06/07 and 07/07 when Future is off. The final outcome remains last in both modes.

The owner approved publication of this assembled version on 2026-11-01. The original seven-slide deck was recovered from the owner's brief, reference HTML files, original logo/character and subsequent corrections. Editable text sources are preserved in the repository; media stay outside Git. The previous separate seven-slide bilingual review remains recorded in bilingual-preview.json for history and media recovery. Use the main public address above for the finished presentation.

English source text stays in index.html; Arabic text and interface messages are in i18n.js. Arabic-only typography and spacing are scoped in presentation.css. Arabic uses the original Cairo font and RTL text while preserving approved map geography and artwork. Media recovery tries the recorded review snapshot and production site, verifying byte counts and SHA256 hashes.

## Show the presentation

The production address is recorded in deployment.json after successful publication. The site opens in a browser without login or installation. Click / right arrow advances one reveal; left arrow goes back; R replays the current slide; P starts/pauses auto play; F opens fullscreen; H hides the controls. Swipe on touch devices. The download-arrow control provides an offline self-contained HTML copy.

The same site ID is reused for updates, preserving the customer's URL. Do not create a new site for ordinary slide corrections.

## Files

index.html: eight reviewed stories; presentation.css: layout and motion; presentation.js: navigation and auto play; map-data.js: destinations / legend / routes; map.js: miniature pins, service points and two successive animations. Slide 4 includes the photo-based Controller illustration; it has eight reveal steps. The presentation declares an explicit light color scheme to prevent browser auto-darkening, while the closing slide retains its designed dark treatment. Original owner coordinates are retained as ownerPoint metadata where the regenerated image's coordinate frame differs. The restored frame positions are matched to the actual landmarks in the new clay map.

build.py: website, offline HTML and ZIP. publish.py: read-only authentication, local upload validation, production publication and HTTP verification. restore_assets.py: reconstruct the external media directory from the production site's media and SHA256 manifest. assets-manifest.json and deployment.json contain non-secret metadata only.

## Resume in a new machine

```sh
cd /workspace/prezentatsiya-it
python3 restore_assets.py
python3 build.py
python3 publish.py check
```

If the default shell sandbox cannot connect to the configured proxy, use the execution tool's supported escalation. Keep the inherited proxy/CA settings and TLS checks. Never print the NETLIFY_AUTH_TOKEN binding or replace its placeholder manually. No package installation is needed for building or publishing (Python standard library only).

After changes, inspect every slide in Chromium and test actual clicks, both routes and the optional 7/8-slide mode. Then:

```sh
python3 build.py
python3 publish.py plan
python3 publish.py publish
```

Publishing is done only when authorized by the owner. Preserve deployment.json so the URL stays the same. Save text source changes to the repository. Media remain under /workspace/media/benghazi; deliveries are generated under /workspace/shared/benghazi-delivery. No worktree is needed.

## Approved guest routes

Orange: main entrance 1 → arcade 3 → attraction complex 11 → food court 4 → playground 13 → restaurant 8 → main entrance 1. No intermediate return to the main entrance.

Light blue: second entrance 2 → boats 6 → food court 4 → playground 13 → attraction complex 11 → zoo 12 → second entrance 2. Orange remains visible while blue draws; the final image retains both completed routes. All category circles on slide 3 are white. The perimeter is grey asphalt; internal lakes remain blue.

## Scope / facts

13 universal entrance cash desks: main 10 + second 3; nine internal top-up points; fourteen food trucks. Zoo viewing is free. Wallet top-up and admission are separate operations. Sports integration is proposed. CRM, staff tools, profiles and online top-up are future options, not existing deployment claims. No invented guest data, balances or performance percentages. The model and hardware are functional illustrations. The heroine's composition animates; her face and hands are not video-animated.

Further visual adjustments should retain the approved eight-slide narrative and the owner's targeted corrections. See RECOVERY.md for provenance.
