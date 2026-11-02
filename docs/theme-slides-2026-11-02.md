# Four thematic park directions — 2026-11-02

Owner request: add four slides immediately after the main map, leaving the original
slides in place. All map positions and the 3D terrain must match the approved main map.
Keep media outside Git and do not publish automatically.

New slides (working-deck pages 4–7):

1. A taste of the park / «Вкус парка»: restaurant (1), food park (2), food trucks
   1–14 from v17 (local numbers 3–16). Only these 16 map points are shown.
2. Time to explore / «Энергия впечатлений»: attractions, arcade, boats, karting,
   zoo, sports complex, amphitheatre, playground, Clock playground (local 1–9).
3. One payment system / «Платёжная система»: a copy of the existing system diagram,
   including its original eight reveal steps, quantities and proposed-sports status.
   Eight small local component numbers identify its existing elements. The original
   system slide remains unchanged later in the deck. Russian review translates the
   copied text; EN/AR reuse the original verified localized source.
4. Behind the scenes / «Команда за кадром»: HR, engineering, cleaning (local 1–3)
   and twelve ordinary security posts (local 4–15, grouped in the list). VIP is a
   separate entrance and is not added to the ordinary security-post group.

Implementation: map-themes.js runs after the master editor and before the player
captures its slides. Map slides clone the master DOM; all terrain files, board sizes,
and percent positions are identical. No second coordinate dataset exists. A master
position change synchronizes every relevant themed marker, even if the master group
is currently hidden. Topic maps are presentation views; editing stays on the master.

The existing eight templates are retained, plus four runtime views: twelve pages
total, eleven when the Future module is excluded. Dynamic pagination keeps risk
penultimate and the closing slide last. The only EN/AR switch stays on the cover.
All twelve slides retain the requested translation note.

Validation: local Chromium checked exact terrain/board/coordinate equality for each
themed marker, inclusion/exclusion, independent numbering, live synchronization after
a real master drag, RU and AR screenshots of all four views, EN language switching,
payment reveal/pagination, 11/12-page optional mode, unique DOM IDs and zero JS errors.
The delivered self-contained HTML and direct slide links are also checked.
