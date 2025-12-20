import { useState } from 'react';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function ValidatedForm() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  // Validate individual field
  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case 'username':
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
        return '';

      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
        return '';

      case 'password':
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Password must contain uppercase, lowercase, and number';
        }
        return '';

      case 'confirmPassword':
        if (value !== formData.password) return 'Passwords do not match';
        return '';

      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    // Validate on change if field was already touched
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    const error = validateField(fieldName, value);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    let hasErrors = false;

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (!hasErrors) {
      console.log('Form submitted:', formData);
      alert('Registration successful!');
      // Reset form
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      setTouched({});
      setErrors({});
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Registration Form</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                display: 'block',
                width: '100%',
                padding: '0.5rem',
                border: errors.username && touched.username ? '2px solid #ff6b6b' : '1px solid #ddd',
              }}
            />
          </label>
          {errors.username && touched.username && (
            <div style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              {errors.username}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                display: 'block',
                width: '100%',
                padding: '0.5rem',
                border: errors.email && touched.email ? '2px solid #ff6b6b' : '1px solid #ddd',
              }}
            />
          </label>
          {errors.email && touched.email && (
            <div style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              {errors.email}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                display: 'block',
                width: '100%',
                padding: '0.5rem',
                border: errors.password && touched.password ? '2px solid #ff6b6b' : '1px solid #ddd',
              }}
            />
          </label>
          {errors.password && touched.password && (
            <div style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              {errors.password}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                display: 'block',
                width: '100%',
                padding: '0.5rem',
                border: errors.confirmPassword && touched.confirmPassword ? '2px solid #ff6b6b' : '1px solid #ddd',
              }}
            />
          </label>
          {errors.confirmPassword && touched.confirmPassword && (
            <div style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              {errors.confirmPassword}
            </div>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default ValidatedForm;