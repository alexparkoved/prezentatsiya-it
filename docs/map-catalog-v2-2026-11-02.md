# Numbered park map, revision 2 — 2026-11-02

Owner requested a complete numeric legend, no letter labels on the map, and only
the 14 food trucks / nine internal top-up points on the latest supplied v17 drawing.
Guest-route work remains deferred. No Netlify publication is authorized here.

The owner's exported layout was read and copied without altering its original:
SHA256 8b36ae007dfdde81a3581efaaee877dfacee571fa1a3a762cacf606382832435.
Its 29 object/service/security positions are the embedded defaults. Three explicitly
moved source points (truck-6, topup-6, topup-9) are also preserved as owner corrections.
Other food/top-up points are aligned by landmarks against the v17 drawing and clay
terrain. Those render coordinates remain a draft, rather than surveyed positions.
The source pixel coordinates and source numbers remain separate from render coordinates.
Reserve R2–R5, existing empty pads a–e and the separate souvenirs marker are excluded.
Josper is shared by trucks 6 and 7; it is not an additional food-truck location.

## Numeric catalogue

- 1–17: destinations, amphitheatre, engineering, HR, cleaning, W2 and VIP.
- 18–31: exactly the source's food trucks 1–14, with their original food names.
- 32–40: exactly the source's internal top-up points 1–9.
- 41–52: twelve ordinary security posts, including the lower sports-area post.

Every editable object has one unique numeric map badge and one matching left-hand
legend row. The list scrolls and has range buttons. Source food/top-up numbers appear
only as explanatory references in the list. Individual rides are not invented.

## Layout compatibility

Existing object IDs remain stable. The local storage key stays unchanged. Version 1
storage is backed up before migration; it cannot override the newly embedded owner
baseline with stale defaults. Version 2 layouts with this seed revision are restored.
Version 1 JSON import applies object/service/security changes while retaining the
updated source food/top-up points. Version 2 import preserves all subsequent edits.
All imports validate every coordinate before applying any changes. Pointer and keyboard
edits now autosave; explicit save and JSON export/import remain available.

## Validation

Chromium: exact owner coordinate comparison; unique numeric map/legend pairs 1–52;
14 trucks / 9 top-up / 12 ordinary security / 1 VIP; no duplicate small map overlays;
drag without navigation; autosave through reload; legacy backup/migration/import;
invalid import does not mutate state; Russian/Arabic rendering; eight slides and
white slide 6; no JavaScript errors. Actual appearance and precise field placement
remain available for owner adjustment. Only local review artifacts are built.
