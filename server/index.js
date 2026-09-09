import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'naran_luxury_petcare_jwt_secret_key_2026';

app.use(helmet());
app.use(cors());
app.use(express.json());

// In-Memory Database Stores for Super Admin REST API Backend
let dbStore = {
  website: {
    heroTitle: "The Hands-Free Revolution in Dog Care",
    heroSubtitle: "CleanWalk™ Waste Catcher - Engineering Elegance for Every Walk",
    announcementBanner: "FREE EXPRESS SHIPPING ON ORDERS OVER $100 | CODE: CLEANWALK15",
    theme: "Dark Luxury",
    currency: "USD ($)",
    domain: "naranpetcare.com"
  },
  products: [
    {
      id: "prod-1",
      name: "NARAN PETCARE CleanWalk™ Dog Waste Catcher",
      sku: "CW-100-BLK",
      category: "Equipment",
      price: 69.99,
      comparePrice: 89.99,
      rating: 4.9,
      reviewCount: 142,
      images: ["/cleanwalk_hero.png", "/cleanwalk_product.png"],
      description: "The world's first wearable hands-free dog waste catcher that attaches securely to your dog's harness.",
      inventory: 85,
      lowStockThreshold: 15,
      status: "In Stock"
    },
    {
      id: "prod-2",
      name: "CleanWalk™ Compostable Waste Bags (3-Pack)",
      sku: "CW-BG-300",
      category: "Accessories",
      price: 19.99,
      comparePrice: 24.99,
      rating: 4.8,
      reviewCount: 98,
      images: ["/cleanwalk_bags.png"],
      description: "100% plant-based certified compostable waste refill bags.",
      inventory: 240,
      lowStockThreshold: 30,
      status: "In Stock"
    }
  ],
  orders: [
    {
      id: "NARAN-1024",
      customer: { name: "Victoria Sterling", email: "victoria@example.com", phone: "+1 (555) 234-5678" },
      channel: "Website",
      total: 119.72,
      paymentStatus: "Paid",
      status: "Processing",
      date: "2026-09-05T14:30:00Z"
    }
  ],
  customers: [
    { id: "cust-1", name: "Victoria Sterling", email: "victoria@example.com", phone: "+1 (555) 234-5678", ordersCount: 4, totalSpent: 489.50, status: "VIP" }
  ],
  payments: [
    { id: "pay-101", orderId: "NARAN-1024", provider: "Stripe", amount: 119.72, status: "Succeeded", date: "2026-09-05" }
  ],
  refunds: [
    { id: "ref-1", orderId: "NARAN-1020", customer: "Liam Hemsworth", amount: 69.99, reason: "Wrong Size Selected", status: "Pending Approval" }
  ],
  shipping: [
    { id: "shp-1", orderId: "NARAN-1023", carrier: "FedEx Express", trackingNumber: "FX-88992011", status: "In Transit", destination: "Los Angeles, CA" }
  ],
  socialAccounts: [
    { platform: "Facebook", handle: "NARAN Petcare Official", connected: true },
    { platform: "Instagram", handle: "@naranpetcare", connected: true },
    { platform: "TikTok", handle: "@naranpetcare", connected: true },
    { platform: "YouTube", handle: "NARAN Petcare Luxury", connected: true },
    { platform: "Pinterest", handle: "@naranpetcare_design", connected: true },
    { platform: "X", handle: "@naranpetcare", connected: true }
  ],
  advertising: [
    { id: "ad-1", platform: "Meta", campaignName: "Autumn Luxury Walk Launch", budget: 5000, spent: 3400, roas: "4.9x", status: "Active" },
    { id: "ad-2", platform: "Google", campaignName: "Google Search & Shopping", budget: 2500, spent: 1200, roas: "3.5x", status: "Active" },
    { id: "ad-3", platform: "TikTok", campaignName: "Viral CleanWalk Demo Ads", budget: 3000, spent: 1800, roas: "5.2x", status: "Active" }
  ],
  rolesPermissions: {
    "Super Admin": ["*"],
    "Social Media Manager": ["Main Dashboard", "Social Media", "Unified Inbox", "Comments & Reviews", "Analytics & Reports"],
    "Order Manager": ["Main Dashboard", "Orders", "Customers / CRM", "Shipping & Tracking", "Payments & Refunds"],
    "Inventory Manager": ["Main Dashboard", "Products", "Inventory", "Analytics & Reports"]
  },
  staff: [
    { id: "staff-1", name: "Alexander Naran", email: "admin@naranpetcare.com", role: "Super Admin", status: "Active" },
    { id: "staff-2", name: "Sarah Wilson", email: "sarah.w@naranpetcare.com", role: "Social Media Manager", status: "Active" },
    { id: "staff-3", name: "Michael Chang", email: "michael.c@naranpetcare.com", role: "Order Manager", status: "Active" },
    { id: "staff-4", name: "Jessica Taylor", email: "jessica.t@naranpetcare.com", role: "Inventory Manager", status: "Active" }
  ],
  securityLogs: [
    { id: "log-1", user: "Alexander Naran", role: "Super Admin", ip: "192.168.1.45", action: "Super Admin Authentication", status: "Success", timestamp: "2026-09-07 10:15:22" }
  ]
};

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Access token required or invalid.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
  }
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Online',
    service: 'NARAN PETCARE Express REST API',
    timestamp: new Date().toISOString()
  });
});

// 1. SUPER ADMIN LOGIN
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const user = {
    id: 1,
    name: 'Alexander Naran',
    email: email,
    role: 'Super Admin',
    authorityLevel: 'Highest'
  };

  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '12h' });
  res.json({
    success: true,
    message: 'Super Admin authentication successful.',
    token,
    user
  });
});

// 2. MAIN DASHBOARD METRICS
app.get('/api/admin/dashboard-stats', (req, res) => {
  res.json({
    totalRevenue: 48950.00,
    ordersCount: 342,
    activeCustomers: 1280,
    activeCampaigns: 3,
    inventoryHealth: "94%"
  });
});

// 3. WEBSITE / STORE API
app.get('/api/admin/store', (req, res) => {
  res.json(dbStore.website);
});

app.put('/api/admin/store', (req, res) => {
  dbStore.website = { ...dbStore.website, ...req.body };
  res.json({ success: true, website: dbStore.website, message: 'Website configuration updated.' });
});

// 4. PRODUCTS API
app.get('/api/products', (req, res) => {
  res.json(dbStore.products);
});

app.post('/api/products', (req, res) => {
  const newProd = { id: `prod-${Date.now()}`, ...req.body };
  dbStore.products.unshift(newProd);
  res.json({ success: true, product: newProd });
});

// 5. ORDERS API
app.get('/api/orders', (req, res) => {
  res.json(dbStore.orders);
});

// 6. INVENTORY API
app.get('/api/inventory', (req, res) => {
  const inventoryList = dbStore.products.map(p => ({
    id: p.id,
    name: p.name,
    sku: p.sku,
    inventory: p.inventory,
    lowStockThreshold: p.lowStockThreshold,
    status: p.status
  }));
  res.json(inventoryList);
});

// 7. CUSTOMERS / CRM API
app.get('/api/customers', (req, res) => {
  res.json(dbStore.customers);
});

// 8. PAYMENTS & REFUNDS API
app.get('/api/payments', (req, res) => {
  res.json({ payments: dbStore.payments, refunds: dbStore.refunds });
});

// 9. SHIPPING & TRACKING API
app.get('/api/shipping', (req, res) => {
  res.json(dbStore.shipping);
});

// 10. SOCIAL MEDIA API
app.get('/api/social', (req, res) => {
  res.json({ accounts: dbStore.socialAccounts });
});

// 13. ADVERTISING CENTER API (Supported platforms: Meta, Google, TikTok ONLY)
app.get('/api/advertising', (req, res) => {
  res.json({ supportedPlatforms: ["Meta", "Google", "TikTok"], campaigns: dbStore.advertising });
});

// 16. STAFF / ROLES & PERMISSIONS API
app.get('/api/staff', (req, res) => {
  res.json({ staff: dbStore.staff, rolesPermissions: dbStore.rolesPermissions });
});

app.put('/api/roles/permissions', (req, res) => {
  const { role, allowedModules } = req.body;
  if (role && allowedModules) {
    dbStore.rolesPermissions[role] = allowedModules;
  }
  res.json({ success: true, rolesPermissions: dbStore.rolesPermissions });
});

// 18. SECURITY & ACTIVITY LOGS API
app.get('/api/security/logs', (req, res) => {
  res.json(dbStore.securityLogs);
});

app.listen(PORT, () => {
  console.log(`NARAN PETCARE Super Admin Express REST API listening on port ${PORT}`);
});
