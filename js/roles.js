/**
 * RCO Metrics Dashboard — Role-Based Access Control
 * Defines user roles and dashboard permissions.
 */

const RCO_ROLES = {
  // Role definitions and what dashboards they can see
  roles: {
    'IT Admin': {
      level: 0,
      dashboards: ['all'],
      canSeeRevenue: true,
      description: 'Full access to all dashboards and admin panel',
    },
    'C-Suite': {
      level: 1,
      dashboards: ['weekly-overview', 'fulfillment', 'shipping', 'orders', 'international', 'daily-metrics', 'sales', 'top-products', 'unfulfilled', 'fulfillment-dashboard', 'skip-the-line'],
      canSeeRevenue: true,
      description: 'All operational dashboards',
    },
    'Director': {
      level: 2,
      dashboards: ['weekly-overview', 'fulfillment', 'shipping', 'orders', 'international', 'daily-metrics', 'sales', 'top-products', 'unfulfilled', 'fulfillment-dashboard', 'skip-the-line'],
      canSeeRevenue: false,
      description: 'All operational dashboards (no revenue/AOV)',
    },
    'Supervisor': {
      level: 3,
      dashboards: ['weekly-overview', 'fulfillment', 'shipping', 'orders', 'international', 'daily-metrics', 'sales', 'top-products', 'unfulfilled', 'fulfillment-dashboard', 'skip-the-line'],
      canSeeRevenue: false,
      description: 'All operational dashboards (no revenue/AOV)',
    },
    'Employee': {
      level: 4,
      dashboards: ['shipping', 'international'],
      canSeeRevenue: false,
      description: 'Shipping leaderboards and international orders',
    },
  },

  // Demo mode: user list removed for privacy. Demo user gets IT Admin access.
  users: {
    'demo@rowecasaorganics.com': 'IT Admin',
  },

  // Get role for an email (defaults to Employee)
  getRole(email) {
    if (!email) return 'Employee';
    const e = email.toLowerCase().trim();
    // IT Admin check first (highest priority)
    if (this.users[e] === 'IT Admin') return 'IT Admin';
    return this.users[e] || 'Employee';
  },

  // Check if user can access a specific dashboard
  canAccess(email, dashboardId) {
    const role = this.getRole(email);
    const config = this.roles[role];
    if (!config) return false;
    if (config.dashboards.includes('all')) return true;
    return config.dashboards.includes(dashboardId);
  },

  // Check if user can see revenue/AOV data
  canSeeRevenue(email) {
    const role = this.getRole(email);
    const config = this.roles[role];
    return config ? config.canSeeRevenue === true : false;
  },

  // Check if user is IT Admin
  isAdmin(email) {
    return this.getRole(email) === 'IT Admin';
  },

  // Get all users grouped by role
  getUsersByRole() {
    const grouped = {};
    for (const [email, role] of Object.entries(this.users)) {
      if (!grouped[role]) grouped[role] = [];
      grouped[role].push(email);
    }
    return grouped;
  },
};
