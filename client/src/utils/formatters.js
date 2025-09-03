// Utility functions for number formatting and display

export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

export const formatNumber = (num) => {
  if (typeof num !== 'number') return '0';
  
  // For thousands, millions, etc.
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
};

export const formatLargeNumber = (num) => {
  if (typeof num !== 'number') return '0';
  return new Intl.NumberFormat('en-US').format(num);
};

// Table status configurations
export const tableStatusConfig = {
  'available': {
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    textColor: 'text-white',
    badge: 'bg-green-100 text-green-800',
    icon: '✓',
    label: 'Available'
  },
  'occupied': {
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
    textColor: 'text-white',
    badge: 'bg-red-100 text-red-800',
    icon: '●',
    label: 'Occupied'
  },
  'reserved': {
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    textColor: 'text-white',
    badge: 'bg-blue-100 text-blue-800',
    icon: '⏰',
    label: 'Reserved'
  },
  'cleaning': {
    color: 'bg-yellow-500',
    hoverColor: 'hover:bg-yellow-600',
    textColor: 'text-white',
    badge: 'bg-yellow-100 text-yellow-800',
    icon: '🧽',
    label: 'Cleaning'
  },
  'maintenance': {
    color: 'bg-gray-500',
    hoverColor: 'hover:bg-gray-600',
    textColor: 'text-white',
    badge: 'bg-gray-100 text-gray-800',
    icon: '🔧',
    label: 'Maintenance'
  }
};

export const getTableStatusConfig = (status) => {
  const normalizedStatus = status?.toLowerCase();
  return tableStatusConfig[normalizedStatus] || tableStatusConfig['available'];
};
