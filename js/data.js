/**
 * Fulfillment KPI Data — Demo Mode (static sample data).
 * In production, this fetches from Cloudflare KV.
 */

// Global array used by fulfillment.js
const fullData = [];

// Static demo data for retail fulfillment KPI
const DEMO_KPI_DATA = {
  retail: [
    {date:'4/1/2025',orders:182,fulfilled_4day:156,fulfilled_7day:175,fill_rate_4day:'85.7%',fill_rate_7day:'96.2%'},
    {date:'4/2/2025',orders:195,fulfilled_4day:168,fulfilled_7day:188,fill_rate_4day:'86.2%',fill_rate_7day:'96.4%'},
    {date:'4/3/2025',orders:174,fulfilled_4day:148,fulfilled_7day:167,fill_rate_4day:'85.1%',fill_rate_7day:'95.9%'},
    {date:'4/4/2025',orders:201,fulfilled_4day:172,fulfilled_7day:193,fill_rate_4day:'85.6%',fill_rate_7day:'96.0%'},
    {date:'3/1/2025',orders:168,fulfilled_4day:142,fulfilled_7day:161,fill_rate_4day:'84.5%',fill_rate_7day:'95.8%'},
    {date:'3/2/2025',orders:45,fulfilled_4day:38,fulfilled_7day:43,fill_rate_4day:'84.4%',fill_rate_7day:'95.6%'},
    {date:'3/3/2025',orders:178,fulfilled_4day:152,fulfilled_7day:171,fill_rate_4day:'85.4%',fill_rate_7day:'96.1%'},
    {date:'3/4/2025',orders:192,fulfilled_4day:164,fulfilled_7day:184,fill_rate_4day:'85.4%',fill_rate_7day:'95.8%'},
    {date:'3/5/2025',orders:186,fulfilled_4day:159,fulfilled_7day:179,fill_rate_4day:'85.5%',fill_rate_7day:'96.2%'},
    {date:'3/6/2025',orders:171,fulfilled_4day:146,fulfilled_7day:164,fill_rate_4day:'85.4%',fill_rate_7day:'95.9%'},
    {date:'3/7/2025',orders:195,fulfilled_4day:167,fulfilled_7day:187,fill_rate_4day:'85.6%',fill_rate_7day:'95.9%'},
    {date:'3/8/2025',orders:52,fulfilled_4day:44,fulfilled_7day:50,fill_rate_4day:'84.6%',fill_rate_7day:'96.2%'},
    {date:'3/9/2025',orders:42,fulfilled_4day:36,fulfilled_7day:40,fill_rate_4day:'85.7%',fill_rate_7day:'95.2%'},
    {date:'3/10/2025',orders:188,fulfilled_4day:161,fulfilled_7day:181,fill_rate_4day:'85.6%',fill_rate_7day:'96.3%'},
    {date:'3/11/2025',orders:176,fulfilled_4day:150,fulfilled_7day:169,fill_rate_4day:'85.2%',fill_rate_7day:'96.0%'},
    {date:'3/12/2025',orders:194,fulfilled_4day:166,fulfilled_7day:186,fill_rate_4day:'85.6%',fill_rate_7day:'95.9%'},
    {date:'3/13/2025',orders:182,fulfilled_4day:155,fulfilled_7day:175,fill_rate_4day:'85.2%',fill_rate_7day:'96.2%'},
    {date:'3/14/2025',orders:198,fulfilled_4day:169,fulfilled_7day:190,fill_rate_4day:'85.4%',fill_rate_7day:'96.0%'},
    {date:'3/15/2025',orders:48,fulfilled_4day:41,fulfilled_7day:46,fill_rate_4day:'85.4%',fill_rate_7day:'95.8%'},
    {date:'3/16/2025',orders:38,fulfilled_4day:32,fulfilled_7day:36,fill_rate_4day:'84.2%',fill_rate_7day:'94.7%'},
    {date:'3/17/2025',orders:185,fulfilled_4day:158,fulfilled_7day:178,fill_rate_4day:'85.4%',fill_rate_7day:'96.2%'},
    {date:'3/18/2025',orders:191,fulfilled_4day:163,fulfilled_7day:183,fill_rate_4day:'85.3%',fill_rate_7day:'95.8%'},
    {date:'3/19/2025',orders:179,fulfilled_4day:153,fulfilled_7day:172,fill_rate_4day:'85.5%',fill_rate_7day:'96.1%'},
    {date:'3/20/2025',orders:196,fulfilled_4day:168,fulfilled_7day:188,fill_rate_4day:'85.7%',fill_rate_7day:'95.9%'},
    {date:'3/21/2025',orders:184,fulfilled_4day:157,fulfilled_7day:177,fill_rate_4day:'85.3%',fill_rate_7day:'96.2%'},
    {date:'3/22/2025',orders:55,fulfilled_4day:47,fulfilled_7day:53,fill_rate_4day:'85.5%',fill_rate_7day:'96.4%'},
    {date:'3/23/2025',orders:41,fulfilled_4day:35,fulfilled_7day:39,fill_rate_4day:'85.4%',fill_rate_7day:'95.1%'},
    {date:'3/24/2025',orders:190,fulfilled_4day:162,fulfilled_7day:182,fill_rate_4day:'85.3%',fill_rate_7day:'95.8%'},
    {date:'3/25/2025',orders:187,fulfilled_4day:160,fulfilled_7day:180,fill_rate_4day:'85.6%',fill_rate_7day:'96.3%'},
    {date:'3/26/2025',orders:193,fulfilled_4day:165,fulfilled_7day:185,fill_rate_4day:'85.5%',fill_rate_7day:'95.9%'},
    {date:'3/27/2025',orders:181,fulfilled_4day:155,fulfilled_7day:174,fill_rate_4day:'85.6%',fill_rate_7day:'96.1%'},
    {date:'3/28/2025',orders:197,fulfilled_4day:168,fulfilled_7day:189,fill_rate_4day:'85.3%',fill_rate_7day:'95.9%'},
    {date:'3/29/2025',orders:50,fulfilled_4day:43,fulfilled_7day:48,fill_rate_4day:'86.0%',fill_rate_7day:'96.0%'},
    {date:'3/30/2025',orders:39,fulfilled_4day:33,fulfilled_7day:37,fill_rate_4day:'84.6%',fill_rate_7day:'94.9%'},
    {date:'3/31/2025',orders:189,fulfilled_4day:162,fulfilled_7day:181,fill_rate_4day:'85.7%',fill_rate_7day:'95.8%'},
  ],
  wholesale: [
    {date:'4/1/2025',orders:58,fulfilled_4day:48,fulfilled_7day:55,fill_rate_4day:'82.8%',fill_rate_7day:'94.8%'},
    {date:'4/2/2025',orders:62,fulfilled_4day:52,fulfilled_7day:59,fill_rate_4day:'83.9%',fill_rate_7day:'95.2%'},
    {date:'4/3/2025',orders:55,fulfilled_4day:46,fulfilled_7day:52,fill_rate_4day:'83.6%',fill_rate_7day:'94.5%'},
    {date:'4/4/2025',orders:64,fulfilled_4day:53,fulfilled_7day:61,fill_rate_4day:'82.8%',fill_rate_7day:'95.3%'},
    {date:'3/1/2025',orders:52,fulfilled_4day:43,fulfilled_7day:49,fill_rate_4day:'82.7%',fill_rate_7day:'94.2%'},
    {date:'3/3/2025',orders:56,fulfilled_4day:47,fulfilled_7day:53,fill_rate_4day:'83.9%',fill_rate_7day:'94.6%'},
    {date:'3/4/2025',orders:61,fulfilled_4day:51,fulfilled_7day:58,fill_rate_4day:'83.6%',fill_rate_7day:'95.1%'},
    {date:'3/5/2025',orders:59,fulfilled_4day:49,fulfilled_7day:56,fill_rate_4day:'83.1%',fill_rate_7day:'94.9%'},
    {date:'3/10/2025',orders:57,fulfilled_4day:48,fulfilled_7day:54,fill_rate_4day:'84.2%',fill_rate_7day:'94.7%'},
    {date:'3/11/2025',orders:54,fulfilled_4day:45,fulfilled_7day:51,fill_rate_4day:'83.3%',fill_rate_7day:'94.4%'},
    {date:'3/12/2025',orders:60,fulfilled_4day:50,fulfilled_7day:57,fill_rate_4day:'83.3%',fill_rate_7day:'95.0%'},
    {date:'3/17/2025',orders:58,fulfilled_4day:48,fulfilled_7day:55,fill_rate_4day:'82.8%',fill_rate_7day:'94.8%'},
    {date:'3/18/2025',orders:63,fulfilled_4day:53,fulfilled_7day:60,fill_rate_4day:'84.1%',fill_rate_7day:'95.2%'},
    {date:'3/24/2025',orders:55,fulfilled_4day:46,fulfilled_7day:52,fill_rate_4day:'83.6%',fill_rate_7day:'94.5%'},
    {date:'3/25/2025',orders:59,fulfilled_4day:49,fulfilled_7day:56,fill_rate_4day:'83.1%',fill_rate_7day:'94.9%'},
    {date:'3/31/2025',orders:61,fulfilled_4day:51,fulfilled_7day:58,fill_rate_4day:'83.6%',fill_rate_7day:'95.1%'},
  ]
};

/**
 * Demo: return static data for the given year/dataset.
 */
async function fetchKPIYear(year, dataset = "retail") {
  return DEMO_KPI_DATA[dataset] || DEMO_KPI_DATA.retail;
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
