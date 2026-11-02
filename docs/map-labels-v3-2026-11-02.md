# Owner label and marker corrections — 2026-11-02

The latest supplied file `benghazi-map-layout (1)2.json` is the position authority for
all 52 markers, including every food/top-up point. Its original is retained outside
Git. SHA256: 64f83b5605fa23fe1cdd2e7937d2a464e52891f8c2302c48bebfc7b5726100f3.

Requested labels: 2 Second entrance; 3 Arcade centre; 8 Restaurant; 12 Amphitheatre;
13 Engineering block; 14 HR office; 15 Cleaning services; 16 Clock playground;
17 VIP entrance. Russian review labels follow the owner's wording. Source English
food names remain those of v17; Russian review also shows the original food name.

Markers 12–16 now contain only their number. The green model illustrations have
been removed. Their badge geometry and coordinate frame are unchanged, so removal
does not shift the numbers relative to the owner's latest exported positions.

The legend retains individual rows for 1–31, with two aggregate entries only:
32–40 Top-up kiosks; 41–52 Security posts. All 52 markers remain independently
editable on the map. Individual kiosk locations and security rows are not printed.

Every slide now has a small asterisk note about possible translation inaccuracies,
localized in Russian review, English and Arabic. Existing slide order, eight-slide
narrative, map artwork and the single cover language switch are retained.

Local Chromium checks compare every coordinate to the supplied JSON, inspect the
number-only DOM, verify corrected labels/group ranges, drag the bare amphitheatre
number with autosave/reload, and check footnotes on all eight EN/AR slides. No JS
errors. Build and review only; no Netlify publication.
