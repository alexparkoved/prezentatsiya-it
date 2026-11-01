# Working on the Benghazi presentation

Use the existing checkout, not a new worktree. Keep Git text-only. Read README.md and RECOVERY.md before editing. Restore missing media with `python3 restore_assets.py`; it uses the production URL and verifies every SHA256. Build with `python3 build.py`. Python standard library is sufficient for build/publish; browser checks use the installed Chromium/Playwright.

Preserve the seven-slide story, original brand assets, RTL journey and latest two map routes. Do not revert to the original uploaded template or old route sequences. Make targeted corrections requested by the owner. Do not invent operational facts, capacities or guest data.

Keep deployment.json tracked: it contains only a public URL and non-secret site/deploy IDs and preserves the same customer link across revisions. Never put tokens, images, fonts, generated ZIP/MP4 or base64 media HTML into Git. Validate the actual browser output before publishing. Publish only within the owner's authorized request; never as an automatic startup action.
