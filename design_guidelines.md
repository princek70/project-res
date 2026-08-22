# Design Guidelines for Delizioso Restaurant Website

## Design Approach
**Reference-Based Approach** drawing inspiration from premium hospitality experiences (Airbnb's visual storytelling) and Instagram's image-first design language. This restaurant site demands emotional engagement through stunning food photography and elegant presentation.

## Typography System

**Font Stack:**
- Primary: 'Playfair Display' (serif) - Headlines, restaurant name
- Secondary: 'Inter' (sans-serif) - Body text, navigation, UI elements

**Hierarchy:**
- Hero Title: 6xl-8xl, bold weight (96-128px equivalent)
- Section Headings: 4xl-5xl, bold weight (48-60px)
- Subsection Headings: 2xl-3xl, semibold (24-36px)
- Menu Item Names: xl-2xl, semibold (20-24px)
- Body Text: base-lg, regular (16-18px)
- Small Text/Labels: sm-base, medium (14-16px)

## Layout System

**Spacing Primitives:** Use Tailwind units: 4, 6, 8, 12, 16, 20, 24 for consistency
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24
- Card gaps: gap-6 to gap-8
- Content max-width: max-w-7xl for main containers, max-w-6xl for text sections

**Grid Strategy:**
- Menu Items: 3-column grid on desktop (lg:grid-cols-3), 2-column tablet (md:grid-cols-2), single mobile
- Gallery: 3-column masonry grid with varying heights
- Stats/Metrics: 3-column equal distribution
- Contact Section: 2-column split (form + map/info)

## Component Library

### Navigation
- Fixed header with backdrop blur (backdrop-blur-sm)
- Transparent on hero, solid white elsewhere
- Hamburger menu for mobile with slide-in drawer
- Navigation items with underline indicator for active state

### Hero Section
- Full viewport height (100vh)
- Darkened background overlay (40% opacity) over hero image
- Centered content with generous vertical spacing
- Primary CTA button with pill shape (rounded-full), large padding (px-8 py-4)

### Menu Cards
- Vertical card layout with image on top
- Image aspect ratio: 4:3, rounded corners (rounded-xl)
- Card elevation with soft shadow (shadow-lg)
- Hover effect: subtle lift transform (hover:scale-105)
- Price displayed prominently in larger weight
- Admin edit/delete buttons positioned top-right as icon buttons

### Gallery Section
- Masonry-style grid without forced equal heights
- Images with rounded corners (rounded-lg)
- Lightbox capability on click
- Minimal gaps between images (gap-4)

### Contact Section
- Split layout: Left side contact form, right side map + contact info
- Form inputs with soft borders, rounded (rounded-lg)
- Map embed with 16:9 aspect ratio, rounded corners
- Social media icons as clickable links in horizontal row

### Admin Panel
- Modal overlay with centered panel (max-w-4xl)
- Form sections clearly separated with headings
- Input fields with labels above
- Action buttons (Save/Cancel) aligned right
- Delete confirmations as simple browser confirms

### Forms
- Input height: h-12
- Input padding: px-4
- Border radius: rounded-lg
- Focus state: ring outline, no border color change
- Label positioning: above input with mb-2

## Page Structure

### Home Section
Full-viewport hero with background image, centered title and subtitle, single CTA button

### About Section
2-column layout: Left = large restaurant image, Right = story text + stats grid (3 metric cards)
Stats use large numbers with small labels beneath

### Menu Section  
Category tabs or headings with filtered grid below
Each menu item card shows: image, name, description (2 lines max), price
Admin controls conditionally visible when logged in

### Gallery Section
Simple masonry grid of restaurant/food photos (6-9 images)
No captions, pure visual showcase

### Contact Section
Left: Contact form (name, email, message fields + submit button)
Right: Map embed above, contact details below (phone, email, address with icons), social media icons at bottom

## Images

**Hero Image:** Full-width restaurant ambiance or signature dish, high-quality, warm lighting
**About Image:** Interior shot showing atmosphere and design
**Menu Item Images:** Close-up food photography, well-lit, appealing plating
**Gallery Images:** Mix of food close-ups, interior shots, dining experiences

## Animations
**Minimal Usage:**
- Menu card hover lift (transform scale)
- Button hover subtle shadow increase
- Page section fade-in on scroll (optional, very subtle)
- Navigation active state smooth transition

## Accessibility
- Sufficient color contrast for all text
- Form labels properly associated
- Keyboard navigation support for all interactive elements
- Focus indicators visible on all focusable elements
- Alt text for all images