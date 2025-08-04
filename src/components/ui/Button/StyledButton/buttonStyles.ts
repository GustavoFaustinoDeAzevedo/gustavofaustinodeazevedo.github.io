const variantStyles = {
  primary: {
    backgroundColor: 'var(--c-primary)',
    color: 'var(--c-text)',
  },
  secondary: {
    backgroundColor: 'var(--c-secondary)',
    color: 'var(--c-text)',
  },
  success: {
    backgroundColor: '#28a745',
    color: '#ffffff',
  },
  danger: {
    backgroundColor: '#dc3545',
    color: '#ffffff',
  },
  warning: {
    backgroundColor: '#ffc107',
    color: '#212529',
  },
  info: {
    backgroundColor: '#17a2b8',
    color: '#ffffff',
  },
} as const;

export default variantStyles;
