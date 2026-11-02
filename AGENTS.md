# Working on the Benghazi presentation

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
