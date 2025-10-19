import { Store, Lead, WidgetSettings } from '../types';

const createWidgetSettings = (overrides: Partial<WidgetSettings> = {}): WidgetSettings => ({
  heading: 'Don\'t Miss Out!',
  description: 'Enter your details to get an exclusive 20% discount on this item.',
  buttonText: 'Get My Discount',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  buttonColor: '#3b82f6',
  overlayOpacity: 0.5,
  isActive: true,
  ...overrides
});

export const generateInitialData = () => {
  const stores: Store[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Demo Store',
      domain: 'demo-store.com',
      plan: 'Starter',
      totalLeads: 247,
      leadsThisMonth: 89,
      remainingLeads: 911,
      maxLeads: 1000,
      createdAt: '2024-01-15T00:00:00Z',
      widgetSettings: createWidgetSettings({
        heading: 'Don\'t Miss Out!',
        description: 'Enter your details to get an exclusive 20% discount on this item.',
        buttonText: 'Get My Discount',
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        buttonColor: '#3b82f6'
      })
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'TechGear Pro',
      domain: 'techgearpro.com',
      plan: 'Pro',
      totalLeads: 1543,
      leadsThisMonth: 234,
      remainingLeads: 999999,
      maxLeads: 999999,
      createdAt: '2023-11-20T00:00:00Z',
      widgetSettings: createWidgetSettings({
        heading: 'Exclusive Tech Deal!',
        description: 'Get insider pricing on premium tech products. Limited time offer!',
        buttonText: 'Claim Tech Discount',
        backgroundColor: '#f8fafc',
        textColor: '#0f172a',
        buttonColor: '#10b981'
      })
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'Fashion Forward',
      domain: 'fashionforward.store',
      plan: 'Free',
      totalLeads: 67,
      leadsThisMonth: 23,
      remainingLeads: 33,
      maxLeads: 100,
      createdAt: '2024-02-08T00:00:00Z',
      widgetSettings: createWidgetSettings({
        heading: 'Style Alert!',
        description: 'Join our VIP list for early access to new collections and exclusive discounts.',
        buttonText: 'Get VIP Access',
        backgroundColor: '#fef3c7',
        textColor: '#92400e',
        buttonColor: '#d97706'
      })
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440004',
      name: 'Home & Garden Plus',
      domain: 'homegardenplus.net',
      plan: 'Starter',
      totalLeads: 456,
      leadsThisMonth: 78,
      remainingLeads: 422,
      maxLeads: 1000,
      createdAt: '2023-12-03T00:00:00Z',
      widgetSettings: createWidgetSettings({
        heading: 'Transform Your Space',
        description: 'Get expert tips and exclusive deals on home improvement products.',
        buttonText: 'Get Home Deals',
        backgroundColor: '#ffffff',
        textColor: '#374151',
        buttonColor: '#6366f1',
        isActive: false
      })
    }
  ];

  // Comprehensive product catalog for realistic demo
  const productCatalog = {
    'Demo Store': [
      'Premium Wireless Headphones',
      'Smart Home Hub',
      'Ergonomic Office Chair',
      'Professional Camera Lens',
      'Organic Skincare Set',
      'Bluetooth Speaker',
      'Gaming Mechanical Keyboard',
      'Stainless Steel Water Bottle',
      'LED Desk Lamp',
      'Yoga Mat Premium'
    ],
    'TechGear Pro': [
      'Gaming Laptop RTX 4080',
      '4K Webcam Pro',
      'Wireless Charging Pad',
      'USB-C Hub 7-in-1',
      'Mechanical Gaming Mouse',
      'Noise Cancelling Earbuds',
      'Portable SSD 2TB',
      'Smart Watch Pro',
      'Wireless Keyboard',
      'Monitor 32" 4K'
    ],
    'Fashion Forward': [
      'Designer Handbag',
      'Silk Scarf Collection',
      'Premium Denim Jeans',
      'Cashmere Sweater',
      'Leather Boots',
      'Evening Dress',
      'Sunglasses Collection',
      'Pearl Necklace',
      'Wool Coat',
      'Athletic Wear Set'
    ],
    'Home & Garden Plus': [
      'Smart Garden System',
      'Outdoor Furniture Set',
      'LED Grow Lights',
      'Automatic Sprinkler System',
      'Garden Tool Set',
      'Patio Heater',
      'Decorative Planters',
      'Solar Path Lights',
      'Compost Bin',
      'Greenhouse Kit'
    ]
  };

  const customerNames = [
    'Alex Johnson', 'Sarah Chen', 'Michael Rodriguez', 'Emma Thompson', 'James Wilson',
    'Lisa Anderson', 'David Kim', 'Rachel Green', 'Kevin Brown', 'Amanda Davis',
    'Ryan Miller', 'Jessica Taylor', 'Mark Garcia', 'Nicole Martinez', 'Chris Lee',
    'Ashley White', 'Brandon Clark', 'Megan Hall', 'Tyler Young', 'Samantha King',
    'Daniel Wright', 'Jennifer Lopez', 'Sophie Turner', 'Jake Morrison', 'Maya Patel',
    'Connor Walsh', 'Zoe Campbell', 'Ethan Parker', 'Olivia Reed', 'Lucas Bennett',
    'Isabella Cruz', 'Noah Foster', 'Ava Mitchell', 'Mason Torres', 'Grace Adams',
    'Logan Scott', 'Chloe Evans', 'Hunter Baker', 'Lily Cooper', 'Caleb Murphy'
  ];

  const leads: Lead[] = [];
  let leadId = 1;

  stores.forEach(store => {
    const storeProducts = productCatalog[store.name as keyof typeof productCatalog] || productCatalog['Demo Store'];
    const leadsCount = Math.min(store.totalLeads, 100); // Generate up to 100 leads for demo
    
    for (let i = 0; i < leadsCount; i++) {
      // Distribute leads over the last 30 days with more recent activity
      const daysAgo = Math.floor(Math.random() * 30);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      
      // Weight recent leads more heavily
      const recentWeight = daysAgo < 7 ? 0.4 : daysAgo < 14 ? 0.3 : 0.3;
      if (Math.random() > recentWeight && i > 10) continue;
      
      const product = storeProducts[Math.floor(Math.random() * storeProducts.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      
      leads.push({
        id: leadId.toString(),
        storeId: store.id,
        name: customerNames[Math.floor(Math.random() * customerNames.length)],
        phone: `+1-555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        product,
        quantity,
        variantId: `${product.split(' ').map(w => w.charAt(0)).join('')}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        sourceUrl: `https://${store.domain}/products/${product.toLowerCase().replace(/\s+/g, '-')}`,
        timestamp: date.toISOString()
      });
      leadId++;
    }
  });

  // Sort leads by timestamp (newest first)
  leads.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return { stores, leads };
};

// Generate realistic variant IDs based on product names
const generateVariantId = (productName: string): string => {
  const words = productName.split(' ');
  const prefix = words.map(word => word.charAt(0)).join('').toUpperCase();
  const suffix = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `${prefix}-${suffix}`;
};

// Generate realistic phone numbers
export const generatePhoneNumber = (): string => {
  const areaCode = Math.floor(Math.random() * 800) + 200;
  const exchange = Math.floor(Math.random() * 800) + 200;
  const number = Math.floor(Math.random() * 10000);
  return `+1-${areaCode}-${exchange}-${String(number).padStart(4, '0')}`;
};

// Generate realistic source URLs
export const generateSourceUrl = (domain: string, product: string): string => {
  const slug = product.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `https://${domain}/products/${slug}`;
};
