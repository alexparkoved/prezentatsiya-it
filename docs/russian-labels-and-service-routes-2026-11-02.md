# Russian labels and restored guest routes — 2026-11-02

Owner asked to correct the current Russian review and restore the two agreed guest
routes to the map with entrance cash desks and internal top-up points. No slide-order
changes were requested. The working deck still contains twelve slides.

Labels:
- Dining stays «Вкус парка». Local 1 is «Главный ресторан»; 3–16 begin `food truck`
  followed by the existing v17 specialization/name. Positions and source names stay intact.
- Entertainment is «Энергия приключений», with only «Развлечения» as its subtitle.
- Support explicitly says «Посты охраны». Authored theme/service labels have their
  actual language declared and browser translation disabled; in-app EN/AR localization
  remains available. This preserves the exact wording of the Russian review.

The existing route SVG and panel were moved from the main-map template to the
service-map template. The map has 10 main-entrance desks, 3 second-entrance desks and
9 internal top-up points. Cash/top-up pins are now synchronized to the master.

The service slide keeps its five existing reveal steps. Steps 1–3 show the service
points; step 4 draws orange, step 5 draws blue while retaining all of orange. Both
remain on the final frame. Autoplay waits for each route animation to finish.

Orange: main entrance → arcade → attractions → food park → playground → restaurant
→ main entrance. Blue: second entrance → boats → food park → playground → attractions
→ zoo → second entrance. Existing source route sequences and waypoints are unchanged.
The renderer smoothly applies endpoint displacements to each original leg so routes
join current owner-positioned destinations, rather than stale marker coordinates.
SVG preserveAspectRatio=none keeps route percentages aligned with the existing map
board. Position changes rebuild paths; language changes do not restart a route.

Local Chromium verified all fourteen prefixes, exact Russian headings/security wording,
one route layer on the service map, correct sequences, endpoint error below 0.005
percentage points, retained orange and completed blue, reset on leaving the map,
RU/AR screenshots, language-switch state preservation, unique IDs and no JS errors.
Layout inspection moved the service note below the map and shortened the Russian
cashier caption to avoid overlapping the map/footer. No Netlify publication.
