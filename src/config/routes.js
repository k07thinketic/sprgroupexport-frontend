export const routeMeta = [
  // ===== Dashboard =====
  {
    path: '/admin',
    label: 'Dashboard',
    sidebar: true,
  },

  // ===== Media =====
  {
    path: '/admin/media',
    label: 'Media',
    parent: '/admin',
    sidebar: true,
  },
  {
    path: '/admin/media/media-settings',
    label: 'Media Settings',
    parent: '/admin/media',
    sidebar: true,
  },
  {
    path: '/admin/media/detail/:_id',
    label: 'Image Details',
    parent: '/admin/media',
    sidebar: false,
  },

  // ===== Customers =====
  {
    path: '/admin/customers',
    label: 'Customers',
    parent: '/admin',
    sidebar: true,
  },

  // ===== Catalog =====
  {
    path: '/admin/categories/display',
    label: 'Categories',
    parent: '/admin',
    sidebar: true,
  },
  {
    path: '/admin/attributes',
    label: 'Product Attributes',
    parent: '/admin',
    sidebar: true,
  },
  {
    path: '/admin/products',
    label: 'Products',
    parent: '/admin',
    sidebar: true,
  },
  {
    path: '/admin/inventory',
    label: 'Inventory',
    parent: '/admin',
    sidebar: true,
  },
  {
    path: '/admin/bulk-upload',
    label: 'Bulk Upload',
    parent: '/admin',
    sidebar: true,
  },
  {
    path: '/admin/reviews',
    label: 'Reviews',
    parent: '/admin',
    sidebar: true,
  },

  // ===== Orders =====
  {
    path: '/admin/orders',
    label: 'Orders',
    parent: '/admin',
    sidebar: true,
  },

  // ===== Reports =====
  {
    path: '/admin/reports',
    label: 'Reports',
    parent: '/admin',
    sidebar: true,
  },

  // ===== Coupons =====
  {
    path: '/admin/coupons',
    label: 'Coupons',
    parent: '/admin',
    sidebar: true,
  },

  // ===== Shipping =====
  {
    path: '/admin/shipping-methods',
    label: 'Shipping Methods',
    parent: '/admin',
    sidebar: true,
  },

  // ===== Payment =====
  {
    path: '/admin/payment-methods',
    label: 'Payment Methods',
    parent: '/admin',
    sidebar: true,
  },

  // ===== Settings =====
  {
    path: '/admin/settings/general',
    label: 'General Settings',
    parent: '/admin',
    sidebar: true,
  },
  {
    path: '/admin/settings/website',
    label: 'Settings (Website)',
    parent: '/admin',
    sidebar: true,
  },
]
