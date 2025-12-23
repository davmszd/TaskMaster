import styles from './StyledButton.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
};

function StyledButton({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
}: ButtonProps) {
  const className = [
    styles.button,
    styles[variant],
    size !== 'medium' ? styles[size] : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default StyledButton;