# NAMI Studio 1.1

Static GitHub Pages site for NAMI Studio, a design and marketing studio positioned around websites, campaigns, ads, digital assets, and reusable content systems.

Live site:
https://chesterlsc.github.io/NAMI-Iteration-1.1/

Repository:
https://github.com/chesterlsc/NAMI-Iteration-1.1

## What This Site Is

This version is the final refinement pass for the NAMI homepage. The goal was to keep the approved premium direction while making the site clearer, more business-ready, and stronger for SEO.

NAMI now reads as a digital asset studio that creates:

- Websites and landing pages
- Campaign creative
- Paid ad assets
- Content systems
- Reusable design blocks for fast output

## What Was Implemented

### Homepage Refinement

- Refined the hero copy while keeping the approved layout direction.
- Updated the hero headline to `Built to Perform.`
- Kept the adjusted hero headline sizing so it fits with the approved wave composition.
- Updated supporting copy to make NAMI feel more direct, business-ready, and performance-aware.
- Reduced repetitive use of the word "built."
- Added a subtle performance, outcomes, and profit layer to the service copy.
- Strengthened the closing section so it feels more decisive and action-driven.

### Static Wave Update

- Replaced the previous hero wave asset with a new right-side wave image:
  `assets/nami-header-wave-final.png`
- Matched the hero and header background to the dark wave background.
- Extended the wave fully to the right edge of the viewport.
- Shifted the wave into a right-side hero composition based on the provided reference.
- Kept the wave static with no animation.
- Removed overlapping hero labels so only the mantra remains on the wave.
- Positioned the mantra lower-center on the wave:
  `Make It Clear. Make It Count.`

### Featured Outputs

- Kept the Featured Outputs section.
- Removed the old conceptual sample launch page block.
- Kept the output cards for:
  - Paid Social Kit
  - Campaign Frame
  - Content Block System
- Added a clean stat-led paid campaign results block as the last part of Featured Outputs.
- Added stat callouts for:
  - Return on ad spend
  - Leads / purchases
  - Conversion value
  - Click-through rate
- Added a button linking to the separate results page.

### Results Page

- Added a separate results route:
  `/results/`
- Created `results/index.html`.
- Added a simple results page hero and intro copy.
- Added sections for Google Ads screenshots and Meta Ads screenshots.
- Added placeholder results frames because final masked screenshots are not currently in the repo.
- Added TODO comments where final results screenshots should be inserted.
- Included masking guidance for private names, account details, emails, billing details, campaign IDs, and other sensitive information.
- Added return links back to the homepage.

### Process Section

- Kept the "how the work moves" section content intact.
- Fixed the desktop connector arrows between process cards.
- Hid arrows on smaller screens so they do not point awkwardly when the cards wrap.

### Planning Doc

- Added `docs/nami-final-plan.md`.
- Documented the final implementation plan and checklist.
- Marked completed items for homepage, results page, and verification.

## Current File Structure

```text
.
|-- index.html
|-- styles.css
|-- script.js
|-- assets/
|   |-- nami-header-wave-final.png
|   |-- nami-header-wave-only.webp
|   |-- nami-header-wave-exact.svg
|   |-- nami-hero-wave.svg
|   `-- nami-footer-mesh.svg
|-- results/
|   `-- index.html
|-- docs/
|   `-- nami-final-plan.md
`-- .github/
    `-- workflows/
        `-- jekyll-gh-pages.yml
```

## Deployment

The site is deployed through GitHub Pages using the existing Jekyll GitHub Actions workflow.

Pushing to `main` triggers the GitHub Pages deployment.

## Notes For Future Updates

- Keep the hero wave static.
- Do not reintroduce wave animation.
- Keep the homepage results block stat-led and clean.
- Put campaign screenshots on `/results/`, not on the homepage.
- Mask all names and sensitive details before adding real campaign screenshots.
- Keep the "how the work moves" copy and structure stable unless a new direction is approved.
