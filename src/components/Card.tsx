type CardProps = {
  title: string;
  description: string;
  footer?: React.ReactNode;
};

function Card({ title, description, footer }: CardProps) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1rem',
      }}
    >
      <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ color: '#666', marginBottom: '1rem' }}>{description}</p>
      {footer && <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>{footer}</div>}
    </div>
  );
}

export default Card;