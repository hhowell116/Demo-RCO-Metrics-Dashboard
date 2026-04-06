/**
 * Fulfillment KPI Data — Demo Mode (static sample data).
 * In production, this fetches from Cloudflare KV.
 */

// Global array used by fulfillment.js
const fullData = [];

// Helper to generate a month of KPI data
function generateMonth(year, month, baseOrders, isWholesale) {
  const days = new Date(year, month, 0).getDate();
  const rows = [];
  for (let d = 1; d <= days; d++) {
    const dow = new Date(year, month - 1, d).getDay();
    const isWeekend = dow === 0 || dow === 6;
    let orders;
    if (isWeekend) {
      orders = Math.round(baseOrders * (0.2 + Math.random() * 0.12));
    } else {
      orders = Math.round(baseOrders * (0.85 + Math.random() * 0.3));
    }
    const rate4 = isWholesale
      ? (81.5 + Math.random() * 4).toFixed(1)
      : (83.5 + Math.random() * 4).toFixed(1);
    const rate7 = isWholesale
      ? (93.0 + Math.random() * 3.5).toFixed(1)
      : (94.5 + Math.random() * 3).toFixed(1);
    const f4 = Math.round(orders * parseFloat(rate4) / 100);
    const f7 = Math.round(orders * parseFloat(rate7) / 100);
    rows.push({
      date: `${month}/${d}/${year}`,
      orders,
      fulfilled_4day: f4,
      fulfilled_7day: f7,
      fill_rate_4day: rate4 + '%',
      fill_rate_7day: rate7 + '%',
    });
  }
  return rows;
}

// Seasonal multipliers (index 0=Jan)
const retailSeasonal =    [0.85, 0.92, 0.95, 1.0, 1.05, 0.90, 0.88, 0.92, 0.95, 1.0, 1.35, 1.50];
const wholesaleSeasonal = [0.80, 0.85, 0.90, 1.0, 1.02, 0.88, 0.85, 0.90, 0.92, 0.98, 1.20, 1.30];

const DEMO_KPI_DATA = { retail: [], wholesale: [] };

// Generate 2024 data (full year)
for (let m = 1; m <= 12; m++) {
  const rBase = Math.round(175 * retailSeasonal[m - 1]);
  const wBase = Math.round(55 * wholesaleSeasonal[m - 1]);
  DEMO_KPI_DATA.retail.push(...generateMonth(2024, m, rBase, false));
  DEMO_KPI_DATA.wholesale.push(...generateMonth(2024, m, wBase, true));
}

// Generate 2025 data (Jan - Apr)
for (let m = 1; m <= 4; m++) {
  const rBase = Math.round(185 * retailSeasonal[m - 1]);
  const wBase = Math.round(58 * wholesaleSeasonal[m - 1]);
  DEMO_KPI_DATA.retail.push(...generateMonth(2025, m, rBase, false));
  DEMO_KPI_DATA.wholesale.push(...generateMonth(2025, m, wBase, true));
}

/**
 * Demo: return static data for the given year/dataset.
 */
async function fetchKPIYear(year, dataset = "retail") {
  const data = DEMO_KPI_DATA[dataset] || DEMO_KPI_DATA.retail;
  return data.filter(r => r.date.endsWith('/' + year));
}

/**
 * Load data into the global fullData array.
 */
async function loadKPIData(year, month, dataset = "retail") {
  const data = await fetchKPIYear(year, dataset);
  fullData.length = 0;
  fullData.push(...data);
  return data;
}

/**
 * Load full year into the global fullData array.
 */
async function loadKPIYear(year, dataset = "retail") {
  return loadKPIData(year, 0, dataset);
}
