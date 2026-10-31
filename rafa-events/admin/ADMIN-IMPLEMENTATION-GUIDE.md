# Admin Implementation Guide

This guide separates work on the admin dashboard into two steps: functionality
for the existing dashboard, and the UI-only admin pages. The UI-only pages
described in Step 2 are implemented; Step 1 remains a checklist for any
unfinished dashboard behavior.

## Step 1: Make the Existing Dashboard Functional

Work in `index.html`, `dashboard.js`, and `dashboard.css`. Preserve the current
Nexora dashboard appearance; do not redesign it during this step. Keep any
future screen styling consistent with the dashboard.

### Navigation

- Make each sidebar item open its own matching admin view instead of only
  showing a toast or changing its active style.
- Make expandable sidebar items reveal and hide their child links.
- Keep the active item in sync with the current view.
- Keep the dashboard toggle working on desktop and as a drawer on mobile.
- Make the Nexora brand link return to the dashboard.

### Header controls

- Search should find relevant visible dashboard data and provide a clear
  empty-results state.
- The language selector should update the selected language indicator.
- The theme button should toggle the theme.
- The notification and profile buttons should open and close their menus;
  clicking outside a menu or pressing Escape should close it.
- The email control should open the messages view or a useful messages panel.
- The fullscreen button should enter and exit fullscreen, with a clear message
  if the browser blocks the request.

### Dashboard cards and actions

- Give every “View All” and “View Details” action a useful destination within
  the admin interface.
- Keep “Show More” and “Show Less” on Recent Activity working.
- Make chart controls perform their labeled action or clearly report when an
  action is not available.
- Give the Leads By Source menu a working menu with relevant actions.

### Deals table

- Search should filter all visible deal fields.
- Select individual rows and select/deselect all.
- Sorting should visibly change row order and identify its current direction.
- Previous, next, and page-number controls should navigate valid pages and be
  disabled when no page is available.
- Row actions should open useful deal details or editing controls.
- Keep the result count and selection state accurate after searching, sorting,
  or changing pages.

### Functional-step acceptance checks

- Every visible link and button has a defined, working result; remove misleading
  controls or disable them with an explanation if an action is intentionally
  unavailable.
- Active navigation, menus, search results, selection, sort direction, and
  pagination stay synchronized with the visible state.
- Keyboard focus is visible; menus and the mobile navigation can be closed
  with Escape.
- No dead links, JavaScript console errors, or unintended horizontal page
  overflow at desktop and mobile widths.
- Do not add a backend, network integration, real authentication, or real
  customer data as part of this functionality step.

## Step 2: Admin Pages UI Prompt

The following prompt describes the implemented UI-only screens and remains a
reference for keeping future changes within the intended scope.

Use the following prompt after Step 1 is complete:

> Build the admin pages and their content as a **UI-only** extension of the
> existing dashboard in `admin/index.html`.
>
> Preserve the current Nexora dashboard's visual design, component styling,
> typography, colors, spacing, responsive behavior, and interactions. Do not
> redesign or replace the dashboard. Reuse its sidebar and header, and make
> the existing sidebar navigation open the corresponding page content.
>
> Create coherent screens for the navigation items already present in the
> sidebar: Dashboards, CRM, Ecommerce, Crypto, Jobs, NFT, Sales, Analytics,
> Projects, HRM, Stocks, Coursee, Personal, Pages, Task, Authentication, Error,
> Calendar, Email, Chat, File Manager, UI Elements, Utilities, Charts, and
> Forms. Preserve their current names and order. The Dashboard item should
> return to the existing overview.
>
> Give each screen a clear page heading, relevant summary information, and
> realistic sample content appropriate to that section. Reuse the existing
> dashboard's card, table, chart, activity, search, and action patterns where
> they fit. Make each screen feel like part of the same product; do not add
> unrelated sections or new navigation categories.
>
> **UI only:** use local demonstration data and client-side state. Do not
> connect to APIs, databases, external services, or authentication systems.
> Do not claim that sample content is saved or sent to a server. Forms,
> filters, menus, and row actions may demonstrate their interaction in the
> browser, but must be clearly presented as a demo.
>
> Keep the interface responsive and accessible. Preserve the existing
> desktop dashboard layout, support the current mobile navigation, use
> semantic HTML and labeled controls, and provide visible keyboard focus.
> Implement the screens within the existing `admin/` files and keep shared
> styles and behavior consistent. Do not move or alter the separate
> `frontend/admin.html` RAFFA content console.
>
> Verify the dashboard and each new screen in a browser at desktop and mobile
> sizes. Check navigation, active states, searches, menus, forms, and actions;
> confirm there are no console errors or horizontal page overflow.

## Scope Notes

- The Step 2 screens are implemented in `index.html`, `dashboard.js`, and
  `dashboard.css`. They use local demonstration data and client-side UI state.
- The Step 1 functionality checklist is separate; its acceptance checks have
  not all been completed.
- `frontend/admin.html` is a separate RAFFA content-management console. Keep it
  independent from the Nexora dashboard in this folder.
