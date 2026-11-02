# Map revision working draft — 2026-11-02

Not published to Netlify. Existing production metadata and media manifest unchanged.
The requested brief was saved separately in commit f33c594.

## Working preview
Build with Python UTF-8 mode on Windows:
`python -X utf8 build.py --assets <external-media-directory> --out <external-output-directory>`.
Open `?map-review=ru#3` for Russian map review, `?lang=ar#3` for Arabic.
Default remains English. The cover keeps the only EN/AR language selector.

Slide 3 retains the approved terrain and all 11 existing destination models.
It adds 14 individually numbered truck models, 9 top-up models, 12 security markers,
one separate VIP marker and five named service/area markers. Models for security and
services are functional isometric symbols, not claims about actual building design.
Individual positions of the 19 rides are not invented. The aggregate attraction label
records 7 large and 12 small rides. R2–R5 are not treated as service points.

Primary placement references are the owner's first two processed maps. Later annotated
v17 images supplement them. Source PNG pixel coordinates remain in map-revision-data.js,
separate from render percentages. Render positions are draft landmark placements,
not a direct conversion or a claim of surveying accuracy; owner review remains needed.
Attached v17 images are visible in chat, but direct file reads from O: remained denied
even after the access grant. No copies of those originals are claimed in the checkout.

## Editor
Move markers enables mouse/pointer editing and arrow-key fine adjustment. Save stores
the whole layout in this browser only. JSON export/import transfers layout between
browsers; copied/exported data contains both source pixels and render coordinates.
Invalid imports are rejected before mutation. Groups can be hidden independently.
This is an image-based diorama with editable overlays, not a rotatable 3D scene.

The owner clarified: only the first (left) objects/services map is in scope. Guest-route work is deferred; slide 5 remains unchanged. Existing route data/code are retained; route overlays on the detailed map are hidden.
The remaining slides and white slide 6 are preserved; risk remains penultimate.

## Validation
Local Chromium checks cover counts; real mouse drag; arrow keys do not navigate while editing;
browser save/reload; EN/AR render; white sixth slide; eight slides; no JavaScript errors. See review artifacts.
Draft positions and small-screen legibility still require owner review.


Additional checks: touch pointer drag preserved slide number; JSON export payload contains
52 unique objects and re-import succeeds. Browser file-download completion was canceled
by this local test environment, so actual OS download is not claimed as verified.
Local save was verified through a real reload. Direct O: copies remain unavailable;
the attached source images themselves are readable visually in the chat.
