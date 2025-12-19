type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
};

function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  const baseStyle = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  };

  const variantStyle =
    variant === 'primary'
      ? { backgroundColor: '#0066cc', color: 'white' }
      : { backgroundColor: '#e0e0e0', color: '#333' };

  return (
    <button style={{ ...baseStyle, ...variantStyle }} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;