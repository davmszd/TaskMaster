type BadgeProps = {
    text: string;
    color?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
}

function Badge({text, color = 'blue'}: BadgeProps){
    const colorStyles = {
        blue: { backgroundColor: '#3b82f6', color: 'white' },
        green: { backgroundColor: '#10b981', color: 'white' },
        red: { backgroundColor: '#ef4444', color: 'white' },
        yellow: { backgroundColor: '#f59e0b', color: 'white' },
        gray: { backgroundColor: '#6b7280', color: 'white' }
    };

    return (
        <span 
            style={{
                ...colorStyles[color],
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '500',
                display: 'inline-block'
            }}
        >
            {text}
        </span>
    );
}

export default Badge;