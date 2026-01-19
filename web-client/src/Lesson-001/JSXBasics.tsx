function JSXBasics() {
  // JavaScript expressions go inside {}
  const name = 'Developer';
  const age = 25;
  const isActive = true;

  // This is a comment in JSX

  return (
    <div>
      {/* JSX comment - use Ctrl+/ to toggle */}
      <h2>JSX Basics</h2>
      {/* Variables */}
      <p>Hello, {name}!</p>
      <p>Age: {age}</p>
      {/* Expressions */}
      <p>Next year: {age + 1}</p>
      <p>Uppercase: {name.toUpperCase()}</p>
      {/* Booleans don't render */}
      <p>Active: {isActive}</p> {/* Shows nothing */}
      <p>Active: {String(isActive)}</p> {/* Shows "true" */}
      {/* className, not class */}
      <div className="box">Styled box</div>
      {/* htmlFor, not for */}
      <label htmlFor="email">Email:</label>
      <input id="email" type="email" />
      {/* Inline styles use objects */}
      <p style={{ color: 'blue', fontSize: '18px' }}>Styled text</p>
    </div>
  );
}

export default JSXBasics;
