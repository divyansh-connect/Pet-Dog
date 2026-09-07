export const initialProducts = [
  {
    id: "prod-1",
    name: "CleanWalk™ Hands-Free Dog Waste Catcher",
    sku: "CW-100-BLK",
    category: "Equipment",
    price: 69.99,
    comparePrice: 89.99,
    rating: 4.9,
    reviewCount: 142,
    images: [
      "/cleanwalk_hero.png",
      "/cleanwalk_product.png"
    ],
    description: "The flagship luxury hands-free dog waste catcher engineered for effortless walks, sanitary waste collection, and total convenience.",
    features: [
      "Ergonomic one-handed spring release action",
      "Aerospace-grade anodized aluminum & black ceramic housing",
      "Universal leash clip attachment included",
      "Odor-locking sealed internal cartridge",
      "Waterproof & washable exterior"
    ],
    sizes: ["S", "M", "L", "XL"],
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
    images: [
      "/cleanwalk_bags.png"
    ],
    description: "100% plant-based certified compostable waste refill bags specially designed for CleanWalk™ automatic loading mechanism.",
    features: [
      "Extra thick 20-micron leakproof seal",
      "Unscented natural cornstarch material",
      "180 bags per 3-pack (6-month supply)",
      "Standard fit for CleanWalk™ cartridge"
    ],
    sizes: ["Standard"],
    inventory: 240,
    lowStockThreshold: 30,
    status: "In Stock"
  },
  {
    id: "prod-3",
    name: "CleanWalk™ Quick-Reload Cartridge",
    sku: "CW-CRT-01",
    category: "Accessories",
    price: 14.99,
    comparePrice: 17.99,
    rating: 4.7,
    reviewCount: 54,
    images: [
      "/cleanwalk_cartridge.png"
    ],
    description: "Magnetically locking bag cartridge allowing sub-3 second bag reloads on the go.",
    features: [
      "Neodymium magnetic snap locking",
      "Ultra lightweight matte alloy structure",
      "Prevents bag unravelling"
    ],
    sizes: ["Standard"],
    inventory: 8,
    lowStockThreshold: 10,
    status: "Low Stock"
  },
  {
    id: "prod-4",
    name: "NARAN Luxury Italian Leather Leash Set",
    sku: "NR-LSH-LTH",
    category: "Leashes & Harnesses",
    price: 89.99,
    comparePrice: 110.00,
    rating: 5.0,
    reviewCount: 31,
    images: [
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Handcrafted Tuscan full-grain leather leash featuring brass hardware and quick-attach mount for CleanWalk™.",
    features: [
      "Full-grain veg-tanned leather",
      "24k gold-plated brass carabiner",
      "Padded neoprene handle interior"
    ],
    sizes: ["M", "L"],
    inventory: 18,
    lowStockThreshold: 5,
    status: "In Stock"
  },
  {
    id: "prod-5",
    name: "CleanWalk™ Sanitizing Care & Polish Kit",
    sku: "CW-KIT-SAN",
    category: "Care",
    price: 24.99,
    comparePrice: 29.99,
    rating: 4.6,
    reviewCount: 22,
    images: [
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Organic pet-safe sanitizing spray and microfiber polishing towel to keep your CleanWalk™ spotless.",
    features: [
      "Enzyme-based odor neutralizer",
      "Hypoallergenic and pet safe",
      "Includes plush microfiber cloth"
    ],
    sizes: ["Standard"],
    inventory: 45,
    lowStockThreshold: 10,
    status: "In Stock"
  },
  {
    id: "prod-6",
    name: "NARAN Night-Vision LED Leash Attachment",
    sku: "NR-ACC-LED",
    category: "Accessories",
    price: 29.99,
    comparePrice: 34.99,
    rating: 4.9,
    reviewCount: 67,
    images: [
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80"
    ],
    description: "High-output rechargeable LED spot lamp that mounts directly onto CleanWalk™ for night walks.",
    features: [
      "300 lumen CREE LED spotlight",
      "USB-C fast charging port",
      "3 illumination modes"
    ],
    sizes: ["Standard"],
    inventory: 3,
    lowStockThreshold: 5,
    status: "Critical"
  },
  {
    id: "prod-7",
    name: "NARAN All-Weather Dog Walking Jacket",
    sku: "NR-APP-JKT",
    category: "Apparel",
    price: 79.99,
    comparePrice: 99.99,
    rating: 4.8,
    reviewCount: 40,
    images: [
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Waterproof windbreaker styled with dedicated magnet pockets for CleanWalk™ and accessories.",
    features: [
      "Gore-Tex windproof material",
      "Reflective gold trim detailing",
      "Integrated treat and waste bag dispenser"
    ],
    sizes: ["S", "M", "L", "XL"],
    inventory: 32,
    lowStockThreshold: 8,
    status: "In Stock"
  },
  {
    id: "prod-8",
    name: "CleanWalk™ Starter Bundle",
    sku: "CW-BNDL-01",
    category: "Bundles",
    price: 99.99,
    comparePrice: 129.99,
    rating: 5.0,
    reviewCount: 210,
    images: [
      "/cleanwalk_hero.png",
      "/cleanwalk_bags.png"
    ],
    description: "The complete package: CleanWalk™ Waste Catcher + 3-Pack Compostable Bags + Leather Leash.",
    features: [
      "Includes CleanWalk™ Catcher",
      "180 refill bags included",
      "Save 25% compared to individual items"
    ],
    sizes: ["M", "L"],
    inventory: 60,
    lowStockThreshold: 10,
    status: "In Stock"
  }
];

export const initialOrders = [
  {
    id: "NARAN-1024",
    customer: {
      name: "Victoria Sterling",
      email: "victoria@example.com",
      phone: "+1 (555) 234-5678",
      address: "740 Park Ave, Apt 12B, New York, NY 10021"
    },
    channel: "Website",
    items: [
      { productId: "prod-1", name: "CleanWalk™ Waste Catcher", size: "M", price: 69.99, quantity: 1 },
      { productId: "prod-2", name: "CleanWalk™ Compostable Bags", size: "Standard", price: 19.99, quantity: 2 }
    ],
    subtotal: 109.97,
    shipping: 0.00,
    tax: 9.75,
    total: 119.72,
    paymentStatus: "Paid",
    status: "Processing",
    date: "2026-09-05T14:30:00Z"
  },
  {
    id: "NARAN-1023",
    customer: {
      name: "Marcus Vance",
      email: "marcus@vancecapital.com",
      phone: "+1 (555) 876-5432",
      address: "1200 Wilshire Blvd, Los Angeles, CA 90017"
    },
    channel: "Shopify",
    items: [
      { productId: "prod-8", name: "CleanWalk™ Starter Bundle", size: "L", price: 99.99, quantity: 1 }
    ],
    subtotal: 99.99,
    shipping: 12.00,
    tax: 8.50,
    total: 120.49,
    paymentStatus: "Paid",
    status: "Shipped",
    date: "2026-09-04T18:15:00Z"
  },
  {
    id: "NARAN-1022",
    customer: {
      name: "Elena Rostova",
      email: "elena@designstudio.io",
      phone: "+1 (555) 345-6789",
      address: "450 Sutter St, San Francisco, CA 94108"
    },
    channel: "Amazon",
    items: [
      { productId: "prod-4", name: "NARAN Luxury Italian Leather Leash", size: "M", price: 89.99, quantity: 1 }
    ],
    subtotal: 89.99,
    shipping: 0.00,
    tax: 7.65,
    total: 97.64,
    paymentStatus: "Paid",
    status: "Delivered",
    date: "2026-09-03T11:20:00Z"
  },
  {
    id: "NARAN-1021",
    customer: {
      name: "Harrison Forde",
      email: "harrison@forde-law.com",
      phone: "+1 (555) 987-6543",
      address: "300 N La Salle St, Chicago, IL 60654"
    },
    channel: "Website",
    items: [
      { productId: "prod-1", name: "CleanWalk™ Waste Catcher", size: "L", price: 69.99, quantity: 2 },
      { productId: "prod-6", name: "NARAN Night-Vision LED Attachment", size: "Standard", price: 29.99, quantity: 1 }
    ],
    subtotal: 169.97,
    shipping: 0.00,
    tax: 14.45,
    total: 184.42,
    paymentStatus: "Paid",
    status: "Pending",
    date: "2026-09-05T16:00:00Z"
  }
];

export const initialCustomers = [
  {
    id: "cust-1",
    name: "Victoria Sterling",
    email: "victoria@example.com",
    phone: "+1 (555) 234-5678",
    ordersCount: 4,
    totalSpent: 489.50,
    avgOrderValue: 122.37,
    lastOrder: "2026-09-05",
    status: "VIP",
    address: "740 Park Ave, Apt 12B, New York, NY 10021"
  },
  {
    id: "cust-2",
    name: "Marcus Vance",
    email: "marcus@vancecapital.com",
    phone: "+1 (555) 876-5432",
    ordersCount: 2,
    totalSpent: 245.99,
    avgOrderValue: 122.99,
    lastOrder: "2026-09-04",
    status: "Active",
    address: "1200 Wilshire Blvd, Los Angeles, CA 90017"
  },
  {
    id: "cust-3",
    name: "Elena Rostova",
    email: "elena@designstudio.io",
    phone: "+1 (555) 345-6789",
    ordersCount: 1,
    totalSpent: 97.64,
    avgOrderValue: 97.64,
    lastOrder: "2026-09-03",
    status: "Active",
    address: "450 Sutter St, San Francisco, CA 94108"
  },
  {
    id: "cust-4",
    name: "Harrison Forde",
    email: "harrison@forde-law.com",
    phone: "+1 (555) 987-6543",
    ordersCount: 3,
    totalSpent: 384.42,
    avgOrderValue: 128.14,
    lastOrder: "2026-09-05",
    status: "Active",
    address: "300 N La Salle St, Chicago, IL 60654"
  }
];

export const initialSocialAccounts = [
  { platform: "Instagram", handle: "@naranpetcare", followers: "48.5K", engagement: "5.4%", connected: true },
  { platform: "TikTok", handle: "@naranpetcare", followers: "124.2K", engagement: "8.2%", connected: true },
  { platform: "Facebook", handle: "NARAN Petcare Official", followers: "22.1K", engagement: "3.1%", connected: true },
  { platform: "YouTube", handle: "NARAN Petcare Luxury", followers: "15.8K", engagement: "6.7%", connected: true },
  { platform: "X", handle: "@naranpetcare", followers: "9.4K", engagement: "2.8%", connected: true }
];

export const initialSocialPosts = [
  {
    id: "post-1",
    caption: "Say goodbye to awkward dog walks. CleanWalk™ keeps your hands 100% waste-free and stylish. 🐾✨ #NaranPetcare #CleanWalk #DogTech",
    image: "/cleanwalk_hero.png",
    platforms: ["Instagram", "Facebook", "TikTok"],
    status: "Published",
    publishedAt: "2026-09-04T12:00:00Z",
    likes: 1420,
    comments: 89,
    shares: 215
  },
  {
    id: "post-2",
    caption: "Tuscan handcrafted leather paired with aerospace alloy. Engineering elegance for your furry best friend.",
    image: "/cleanwalk_product.png",
    platforms: ["Instagram", "X"],
    status: "Scheduled",
    scheduledFor: "2026-09-06T15:00:00Z",
    likes: 0,
    comments: 0,
    shares: 0
  },
  {
    id: "post-3",
    caption: "Draft post: How our 100% plant-based compostable bags break down in 90 days. Eco-luxury at its finest.",
    image: "/cleanwalk_bags.png",
    platforms: ["Instagram", "TikTok", "YouTube"],
    status: "Draft",
    scheduledFor: null,
    likes: 0,
    comments: 0,
    shares: 0
  }
];

export const initialMessages = [
  {
    id: "msg-1",
    platform: "Instagram",
    sender: "sophia_hudson",
    senderName: "Sophia Hudson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    lastMessage: "Is the CleanWalk Size M suitable for a French Bulldog?",
    timestamp: "10 mins ago",
    resolved: false,
    thread: [
      { sender: "Sophia Hudson", text: "Hi! I love your product photos! Quick question: Is the CleanWalk Size M suitable for a French Bulldog?", time: "10:15 AM", isUser: false }
    ]
  },
  {
    id: "msg-2",
    platform: "Website",
    sender: "david_miller",
    senderName: "David Miller",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    lastMessage: "Do you ship internationally to the UK?",
    timestamp: "1 hour ago",
    resolved: true,
    thread: [
      { sender: "David Miller", text: "Do you ship internationally to the UK?", time: "09:30 AM", isUser: false },
      { sender: "NARAN Support", text: "Hello David! Yes, we offer express global shipping via DHL Express.", time: "09:35 AM", isUser: true }
    ]
  }
];

export const initialComments = [
  {
    id: "cmt-1",
    platform: "Instagram",
    author: "@paws_and_city",
    content: "This is literally a game changer for NYC morning walks! Ordering mine right now 😍",
    postTitle: "Say goodbye to awkward dog walks...",
    date: "2 hours ago",
    status: "Active"
  },
  {
    id: "cmt-2",
    platform: "Facebook",
    author: "Robert Chen",
    content: "Does it come with a warranty?",
    postTitle: "Tuscan handcrafted leather...",
    date: "5 hours ago",
    status: "Active"
  }
];

export const initialReviews = [
  {
    id: "rev-1",
    customer: "Chloe Bennett",
    product: "CleanWalk™ Waste Catcher",
    rating: 5,
    review: "Unbelievable quality! The gold accents look so sleek and I never have to touch a dirty bag again.",
    source: "Website",
    date: "2026-09-03",
    status: "Approved"
  },
  {
    id: "rev-2",
    customer: "Alexander Wright",
    product: "CleanWalk™ Starter Bundle",
    rating: 5,
    review: "Worth every penny. The leather leash is soft yet sturdy and the scoop mechanism snaps firmly shut.",
    source: "Shopify",
    date: "2026-09-02",
    status: "Approved"
  }
];

export const initialCampaigns = [
  {
    id: "camp-1",
    name: "Autumn Luxury Walk Launch",
    platform: "Instagram & TikTok Ads",
    budget: 5000,
    spent: 3400,
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    status: "Active",
    reach: "145,000",
    clicks: "12,400",
    conversions: 320,
    revenue: 24500,
    roi: "490%"
  },
  {
    id: "camp-2",
    name: "VIP Retargeting Campaign",
    platform: "Google Search & Shopping",
    budget: 2500,
    spent: 1200,
    startDate: "2026-09-03",
    endDate: "2026-09-20",
    status: "Active",
    reach: "42,000",
    clicks: "5,100",
    conversions: 140,
    revenue: 11200,
    roi: "348%"
  }
];

export const initialStaff = [
  {
    id: "staff-1",
    name: "Alexander Naran",
    email: "admin@naranpetcare.com",
    role: "Super Admin",
    status: "Active",
    lastActive: "Now"
  },
  {
    id: "staff-2",
    name: "Sarah Wilson",
    email: "sarah.w@naranpetcare.com",
    role: "Social Media Manager",
    status: "Active",
    lastActive: "15 mins ago"
  },
  {
    id: "staff-3",
    name: "Michael Chang",
    email: "michael.c@naranpetcare.com",
    role: "Order Manager",
    status: "Active",
    lastActive: "1 hour ago"
  },
  {
    id: "staff-4",
    name: "Jessica Taylor",
    email: "jessica.t@naranpetcare.com",
    role: "Inventory Manager",
    status: "Active",
    lastActive: "3 hours ago"
  }
];

export const initialApprovals = [
  {
    id: "appr-1",
    title: "Product Price Adjustment Request",
    description: "CleanWalk™ Starter Bundle price change: $99.99 → $119.99",
    requestedBy: "Sarah Wilson",
    module: "Products",
    date: "2026-09-05 13:40",
    status: "Pending"
  },
  {
    id: "appr-2",
    title: "New Marketing Budget Allocation",
    description: "$2,000 increase for TikTok influencer gifting campaign",
    requestedBy: "Sarah Wilson",
    module: "Marketing",
    date: "2026-09-04 16:20",
    status: "Pending"
  }
];

export const initialActivityLogs = [
  {
    id: "act-1",
    user: "Alexander Naran",
    action: "System Initialization",
    module: "System",
    description: "NARAN PETCARE Central Admin control panel loaded successfully.",
    timestamp: "2026-09-05 10:00:00"
  },
  {
    id: "act-2",
    user: "Customer Portal",
    action: "Order Placed",
    module: "Orders",
    description: "Order NARAN-1024 placed by Victoria Sterling ($119.72).",
    timestamp: "2026-09-05 14:30:00"
  }
];

export const initialNotifications = [
  {
    id: "notif-1",
    type: "New Order",
    title: "New Order Received",
    message: "Order NARAN-1024 ($119.72) placed by Victoria Sterling.",
    time: "10 mins ago",
    read: false
  },
  {
    id: "notif-2",
    type: "Low Stock",
    title: "Low Stock Alert",
    message: "NARAN Night-Vision LED Attachment is down to 3 units.",
    time: "45 mins ago",
    read: false
  }
];

export const initialIntegrations = [
  { id: "integ-1", name: "Shopify Store", category: "E-Commerce", icon: "ShoppingBag", connected: true, lastSync: "5 mins ago" },
  { id: "integ-2", name: "Amazon Seller Central", category: "Marketplace", icon: "Box", connected: true, lastSync: "1 hour ago" },
  { id: "integ-3", name: "Instagram Shop", category: "Social Commerce", icon: "Instagram", connected: true, lastSync: "15 mins ago" },
  { id: "integ-4", name: "TikTok Shop", category: "Social Commerce", icon: "Video", connected: false, lastSync: "Never" },
  { id: "integ-5", name: "Klaviyo Email & SMS", category: "Marketing", icon: "Mail", connected: true, lastSync: "10 mins ago" }
];
