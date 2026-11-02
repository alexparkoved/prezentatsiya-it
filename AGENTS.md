# Working on the Benghazi presentation

## Published release — 2026-11-02

The owner explicitly authorized replacing the old IT presentation with the final
park presentation on the SAME Netlify site. Publication is complete at
https://benghazi-park-one-card.netlify.app/ (deploy 6ae889fec0c14ebf409b3d06).
deployment.json records the new deploy, source commit and previous deploy ID.
All 29 served files were verified against the reviewed local build, along with
public desktop/phone language switching and offline download. Keep this site and
URL for corrections. Preserve the working checkout, external media and local server.
Further publication should follow the owner's current request, never run at startup.

## FINAL OWNER CORRECTIONS — 2026-11-02 (take precedence over earlier review)

The eight-slide park presentation is now English by default, with ONE English /
العربية switch on the opening slide. Translate the whole visible deck, including
legends, captions, controls, footnotes and the management diagram. Keep geography
and both guest routes unchanged when switching languages.

The owner requested a much larger central girl, a two-line opening title and large
uppercase English mission headings. The last two audience/park-benefit lines were
explicitly REMOVED. The family finale is larger. All slide wordmarks are larger,
right-aligned and blend into the slide background without a rectangular patch.

The final audience presentation has NO editor toolbar, category filters, editing
status or drawing-reference notes. Preserve the underlying data and editor source
for future work, but do not show those tools in this audience edition.

There are now 53 master markers: all original 52 owner coordinates are unchanged,
plus guard-13 at the SAME coordinates as the VIP entrance. The VIP keeps number 17;
the new green security post is 53. Master security range is 41–53, thirteen posts.
On the support slide, the new post is local 16 and the range is 4–16. Keep its
separate green house. This addition supersedes earlier twelve-post references.

Keep the eight-slide order and both route animations. Do not publish to Netlify
automatically. See docs/final-bilingual-2026-11-02.md for the final revision.

## Earlier Russian review instructions — superseded where corrected above

The IT deck is now a presentation of the WHOLE PARK, Russian review only.
Exact runtime order: (1) girl, «Новое дыхание Бенгази» and five mission points;
(2) complete master map; (3) «Вкус парка»; (4) «Энергия приключений»;
(5) «Команда за кадром»; (6) IT/cash/top-up map with BOTH routes;
(7) park management system; (8) happiness finale with two parents and FIVE children.
The initially agreed nine slides became EIGHT after the owner merged the intro
and meaning into ONE opening slide. Five children appear ONLY in the finale.
The first slide retains one familiar girl with the orange hair clip.

Five mission themes around the girl: emotions/happiness, physical activity,
psychological recovery, discoveries/history of Benghazi, and family/traditions.
Keep the owner's provisional phrase «постоянно увеличивая число посетителей из
внешних краёв». Do not invent attendance, history facts or performance figures.
English and Arabic translations are a later stage. park-content.js separates
editorial text; park-story.js selects and orders the eight runtime slides.
Journey, future-options and risk slides are omitted from THIS assembly.

Preserve ALL 52 latest owner coordinates in map-revision-data.js. Thematic maps
clone the master and share its positions. Master 2 is «Второй вход», 8 is
«Главный ресторан». Keep dragging, autosave, import/export and both guest routes.
Keep the translation footnote on every slide. Do not publish to Netlify automatically.
New unpublished art can be restored from the current self-contained HTML using
restore_assets.py --offline /path/to/file.html. Media remain outside Git.

## Historical IT-deck instructions and provenance

Use the existing checkout, not a new worktree. Keep Git text-only. Read README.md and RECOVERY.md before editing. Restore missing media with `python3 restore_assets.py`; it uses the production URL and verifies every SHA256. Build with `python3 build.py`. Python standard library is sufficient for build/publish; browser checks use the installed Chromium/Playwright.

Preserve the eight-slide story, original brand assets, RTL journey and latest two map routes. Do not revert to the original uploaded template or old route sequences. Make targeted corrections requested by the owner. Do not invent operational facts, capacities or guest data.

Keep deployment.json tracked: it contains only a public URL and non-secret site/deploy IDs and preserves the same customer link across revisions. Never put tokens, images, fonts, generated ZIP/MP4 or base64 media HTML into Git. Validate the actual browser output before publishing. Publish only within the owner's authorized request; never as an automatic startup action.

The owner approved the risk slide and authorized publishing the assembled eight-slide English/Arabic deck. The approved risk slide is penultimate (page 07/08); the original outcome slide remains last (08/08). Use the existing canonical customer URL in deployment.json for finished revisions. ONE language switch is shown on the first slide only, bottom right. Geographic coordinates, both route orders and existing reveal counts stay the same; the added risk slide has seven reveals (six impacts, then takeaway). Optional future-slide exclusion produces seven pages with risk at 06/07 and closing at 07/07. Keep all pagination generated dynamically. Risk media and Arabic fonts remain outside Git and are restored by restore_assets.py. bilingual-preview.json records the historical seven-slide review, not the latest finished presentation. The original drafts/risk-delay files remain archived as the approved design reference; edit the integrated index.html / scoped CSS / i18n.js for future changes.

Local working revision, 2026-11-02: the owner subsequently requested FOUR additional
topic slides immediately after the main map: dining, entertainment, a duplicate of
the existing payment/system diagram, and support services. Preserve the original
eight slides as well. map-themes.js inserts the four views at runtime, before
presentation.js captures its slide list; the working deck has 12 slides (11 when
Future is excluded). Risk remains penultimate and the closing remains last.
The three themed maps clone the master terrain/geometry and subscribe to master
position changes; do not create independent coordinate sets. Numbers restart per
theme. The latest owner layout and its exact positions remain in map-revision-data.js.
This working revision is local review only. Do not publish to Netlify automatically.

Latest Russian review corrections: dining marker 1 is Main restaurant; local 3–16
labels start with the owner's exact `food truck` prefix. Entertainment has the Russian
title «Энергия приключений» and subtitle «Развлечения». Security is explicitly
«Посты охраны». Guest routes now belong on the service-slide cash/top-up map only:
existing steps 1–3 reveal cash desks/top-up, step 4 orange, step 5 blue with orange
retained. Source route sequences/waypoints stay in map-data.js; render endpoints
are adapted to the current master coordinates. Do not reorder the deck yet.
