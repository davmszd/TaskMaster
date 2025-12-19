import { useState } from 'react';

type TextInputProps = {
  label?: string;
  maxLength?: number;
  placeholder?: string;
  initialValue?: string;
};

function TextInput({ label = 'Text Input', maxLength = 100, placeholder = 'Type something...', initialValue = '' }: TextInputProps) {
  const [text, setText] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };

  const charCount = text.length;
  const isNearLimit = charCount >= maxLength * 0.8;
  const isAtLimit = charCount >= maxLength;

  return (
    <div style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        {label}
      </label>
      
      <textarea
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          minHeight: '100px',
          padding: '0.75rem',
          fontSize: '1rem',
          borderRadius: '4px',
          border: `2px solid ${isAtLimit ? '#ff6b6b' : isNearLimit ? '#f59e0b' : '#ddd'}`,
          resize: 'vertical',
          fontFamily: 'inherit',
          boxSizing: 'border-box',
        }}
      />
      
      <div style={{ 
        marginTop: '0.5rem', 
        fontSize: '0.875rem',
        color: isAtLimit ? '#ff6b6b' : isNearLimit ? '#f59e0b' : '#666',
        fontWeight: isNearLimit ? 'bold' : 'normal'
      }}>
        {charCount} / {maxLength} characters
        {isAtLimit && ' (limit reached)'}
      </div>
    </div>
  );
}

export default TextInput;
