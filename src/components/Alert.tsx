import styles from './Alert.module.css';

type AlertProps = {
  variant: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
};

function Alert({ variant, title, message }: AlertProps) {
  // Combine classes: base class + variant class
  const alertClass = `${styles.alert} ${styles[variant]}`;

  return (
    <div className={alertClass}>
      {title && <div className={styles.alertTitle}>{title}</div>}
      <p className={styles.alertMessage}>{message}</p>
    </div>
  );
}

export default Alert;