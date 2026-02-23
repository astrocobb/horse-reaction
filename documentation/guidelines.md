### To-do:
- Change logo color scheme
- Make "view on Google Maps" into "view on maps" and have it open user's preferred map app 

### Planned Features
- Edit favicon color and make them switch for dark and light themes
- (maybe) Add Line Shadow Text to hero section title from magic UI
- Update navbar
- Update buttons
- Add buttons for phone, directions, and view hours
- Add pop-outs/modals for gallery images
- Add refresh/reload buttons where needed
- Expand timeline with more milestones
- Add "Meet the Crew" section

### Completed:
- [x] Improve hero image alt text for accessibility/SEO
- [x] Make copyright year dynamic in `Footer.tsx`
- [x] Add SEO meta tags (description, Open Graph, canonical URL) to `Home.tsx`
- [x] Add API keys and map ID to backend
- [x] Move EmailJS credentials to environment variables (`VITE_EMAILJS_SERVICE_ID`, etc.)
- [x] Change framework from vanilla HTML and JS to React Router v7 with: React, Vite, Tailwind CSS v4, and TypeScript (strict mode)
- [x] Switched to updated Google Maps and Places API (using `textSearch` and `getDetails`)
- [x] Implemented custom OKLCH color system
- [x] Light mode styling complete
- [x] Dark mode styling complete
- [x] Contact button in navigation styled as CTA

### Tailwind Class Ordering:
1. Layout (flex, grid, block, inline, hidden)
2. Positioning (fixed, absolute, relative, top, left, z-index)
3. Box Model (width, height)
4. Spacing (margin, padding, gap)
5. Typography (font, text)
6. Visual (background, border, rounded, shadow)
7. Effects (transform, transition)
8. Interactivity/States (hover, focus, group)
9. Responsive variants (sm:, md:, lg:, xl:)