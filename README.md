# RCO Metrics Dashboard (Demo)

> **This repo is for demo purposes only.** All API calls are replaced with static sample data and authentication is removed.

**View the demo site:** [hhowell116.github.io/Demo-RCO-Metrics-Dashboard](https://hhowell116.github.io/Demo-RCO-Metrics-Dashboard/)

**View the real project code:** [github.com/hhowell116/RCO-Metrics](https://github.com/hhowell116/RCO-Metrics)

---

The production version is a full-stack operations platform pulling live data from two Shopify stores via a Cloudflare Worker API backend.

## Production Architecture

```
Browser  →  Firebase Auth (Google SSO, @rowecasaorganics.com only)
         →  Cloudflare Worker API  →  Shopify REST API (Retail + Wholesale stores)
                                   →  Cloudflare KV (response cache + historical data)
         →  Firebase Realtime DB (user presence, access logs, permissions)
```

### Backend (Cloudflare Worker)
- Paginated full order fetching via cursor-based pagination (no sampling)
- 10-minute response caching in Cloudflare KV to minimize Shopify API load
- Gift card exclusions and cross-day refund adjustments to match Shopify Analytics
- Timezone-aware date handling (Central Time via chicagoNow() helper)
- Automatic Shopify API token reauthentication
- Cron job every 6 hours for KPI data refresh (both stores)
- Nightly cron for top products, orders overview, and international geo backfills

### Frontend
- 14+ dashboard views loaded via iframes in a sidebar shell
- Chart.js for revenue/order visualizations and KPI trend charts
- jsvectormap for interactive world and US choropleth maps
- Firebase Authentication with Google SSO (domain-restricted)
- Firebase Realtime Database for live user presence and access logging

## Dashboards

| Dashboard | Description |
|-----------|-------------|
| Weekly Overview | Combined weekly KPIs — revenue, orders, AOV, fulfillment rates, top products/states for Retail + Wholesale |
| Fulfillment KPI | Daily order counts, 4-day and 7-day fill rates, calendar heat map |
| Shipping Leaderboard | Employee rankings by products shipped (Full-Time, Part-Time, Wholesale) |
| Daily Metrics | Today's sales, orders, AOV, units, fulfillment progress (Retail + Wholesale) |
| Sales | Today, MTD, and YTD revenue/orders with combined totals |
| Top Products | 7-day and 30-day product rankings by units sold |
| Orders Overview | Monthly order summaries with calendar and chart views (1.3M+ orders since 2022) |
| Unfulfilled Orders | Breakdown by age for Retail and Wholesale |
| International | World + US maps showing order distribution across 40+ countries |
| Fulfillment Dashboard | Yesterday/Today fulfilled vs unfulfilled counts |
| Skip the Line | Priority order tracking |
| Admin Panel | User presence, access logs, role permissions matrix, user directory |

## Role-Based Access Control

5 roles with configurable permissions persisted to Firebase:

| Role | Dashboards | Revenue |
|------|-----------|---------|
| IT Admin | All + Admin Panel | Visible |
| C-Suite | All operational | Visible |
| Director | All operational | Restricted |
| Supervisor | All operational | Restricted |
| Employee | Shipping + International only | Restricted |

Permission toggles in the Admin Panel let IT Admins adjust which dashboards each role can see. Revenue/AOV fields show "Restricted" for roles without revenue access.

## Additional Features

- **TV Mode** — Fullscreen auto-rotation through dashboards for wall-mounted displays
- **Dark Mode** — Theme toggle with localStorage persistence
- **Guided Tour** — 14-step walkthrough triggered on first login
- **URL Deep Linking** — Shareable links to specific dashboards via URL hash
- **Responsive** — Scales for different screen sizes and zoom levels

## Tech Stack

| Tool | Purpose |
|------|---------|
| Shopify REST API | Live order, product, and fulfillment data (2 stores) |
| Cloudflare Workers | API backend with caching and cron jobs |
| Cloudflare KV | Response cache + historical data storage |
| Firebase Auth | Google SSO with domain restriction |
| Firebase Realtime DB | User presence, access logs, permission persistence |
| Chart.js | Revenue/order charts and KPI visualizations |
| jsvectormap | Interactive choropleth maps |
| Python | Backfill scripts for historical data (2022-2026) |
| JavaScript / HTML / CSS | Frontend dashboards |

## How the Data Works

### Caching & Refresh Strategy
- **Live dashboards** (Daily Metrics, Sales, Unfulfilled, Skip the Line) fetch from Shopify on each page load, cached 10 minutes in Cloudflare KV — multiple concurrent users trigger only one API call
- **Historical dashboards** (Fulfillment KPI, Orders Overview, Top Products, International) refresh via automated cron jobs every 6 hours, with nightly backfills at 2 AM CT
- **Fulfillment counts** (Today/Yesterday Fulfilled) recompute every 30 minutes via cron

### Revenue & Order Calculations
- **Order counts** are exact from Shopify count endpoints (open + closed, excludes cancelled)
- **Revenue/AOV** are calculated from a 250-order sample, then scaled to the total order count — exact when the sample covers all orders
- **Gift card line items** are excluded from revenue, and cross-day refunds are subtracted to match Shopify Analytics
- **Units Sold** excludes non-product items (shipping protection, discount cards, gift cards, etc.)

### Fulfillment KPI Methodology
- **4-Day Fill Rate** = percentage of orders fulfilled within 4 days, calculated as (Total − Remaining Unfulfilled) / Total
- Rates are computed by checking each order's **current** fulfillment status at refresh time — this matches the warehouse team's manual spreadsheet methodology where they check Shopify on day 4 and day 7 after each order date
- For historical months where all orders have shipped, both 4-day and 7-day rates converge to 100%
- The "Total" dataset combines Retail + Wholesale raw counts by date, then recalculates rates

### Weekly Overview
- Shows the **previous completed week** (Monday–Sunday) with Retail vs Wholesale comparison
- Daily breakdown uses exact KPI data per day, not the 250-order sample
- Fulfillment snapshot, unfulfilled counts, and skip-the-line data are pulled from their respective KV caches

### General Notes
- All API access is **READ-ONLY** — the dashboard cannot modify orders, products, or store data
- All dates use **Central Time** (America/Chicago) with automatic DST handling
- Order counts may differ from Shopify Analytics by 2–10 orders/day due to a documented difference between the REST API's `processed_at` filter and Shopify Analytics' internal counting

## About This Demo

This is a static version with all API calls replaced by sample data, Firebase auth removed, and a demo IT Admin user. The production version runs at an internal URL restricted to @rowecasaorganics.com accounts.
