# Material-UI (MUI) Integration

This document describes the Material-UI integration in this React application.

## Installation

Material-UI and its dependencies have been installed:

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

## Packages Installed

- **@mui/material**: Core MUI components library
- **@emotion/react**: Required peer dependency for styling
- **@emotion/styled**: Required peer dependency for styled components
- **@mui/icons-material**: Material Design icons

## Features Implemented

### 1. MUI Demo Page (`src/pages/MuiDemo.tsx`)

A comprehensive demo page showcasing various MUI components:

- **Buttons**: Contained, outlined, text variants with different colors
- **Icon Buttons**: Interactive buttons with Material icons
- **Text Fields**: Various input types including standard, email, password, and multiline
- **Cards**: Different card styles (default, colored, outlined) with actions
- **Alerts**: Success, info, warning, and error alerts
- **Chips**: Various chip styles with icons and actions
- **Switches**: Toggle controls with different colors
- **Typography**: Complete typography scale from h1-h6, body text, captions, etc.

### 2. MUI Task Form (`src/features/task/TaskFormMui.tsx`)

A Material-UI version of the task creation form featuring:

- Material TextField components with validation
- Select dropdowns for status and priority
- Date picker input
- Material buttons for form actions
- Proper spacing and layout using MUI's Box and Stack components

### 3. MUI Tasks Feature (`src/features/task/TasksFeatureMui.tsx`)

A Material-UI version of the tasks feature with:

- Material Dialog for the modal
- Button with icon for creating new tasks
- Integration with the MUI Task Form

## Navigation

The app now includes a navigation bar with three views:

1. **MUI Demo**: Comprehensive showcase of MUI components
2. **Tasks (Original)**: Original tasks feature using custom CSS
3. **Tasks (MUI)**: Tasks feature rebuilt with MUI components

Use the button group at the top of the page to switch between views.

## Usage Examples

### Basic Button
```tsx
import { Button } from '@mui/material';

<Button variant="contained" color="primary">
  Click Me
</Button>
```

### TextField with Validation
```tsx
import { TextField } from '@mui/material';

<TextField
  label="Title"
  required
  fullWidth
  value={value}
  onChange={(e) => setValue(e.target.value)}
  error={!!error}
  helperText={error}
/>
```

### Card Component
```tsx
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

<Card>
  <CardContent>
    <Typography variant="h5">Card Title</Typography>
    <Typography variant="body2">Card content</Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Action</Button>
  </CardActions>
</Card>
```

### Using Icons
```tsx
import { IconButton } from '@mui/material';
import { Favorite } from '@mui/icons-material';

<IconButton color="error">
  <Favorite />
</IconButton>
```

## Styling with MUI

MUI uses the `sx` prop for inline styling:

```tsx
<Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
  Content
</Box>
```

Common spacing values:
- `p`: padding (p: 2 = 16px)
- `m`: margin
- `pt`, `pb`, `pl`, `pr`: padding top/bottom/left/right
- `mt`, `mb`, `ml`, `mr`: margin top/bottom/left/right

## Resources

- [MUI Documentation](https://mui.com/material-ui/getting-started/)
- [MUI Components](https://mui.com/material-ui/all-components/)
- [MUI Icons](https://mui.com/material-ui/material-icons/)
- [MUI Customization](https://mui.com/material-ui/customization/how-to-customize/)

## Benefits of MUI

1. **Consistent Design**: Follows Material Design guidelines
2. **Accessibility**: Built-in ARIA attributes and keyboard navigation
3. **Responsive**: Mobile-first approach with responsive components
4. **Theming**: Easy to customize with theme provider
5. **TypeScript Support**: Full TypeScript definitions included
6. **Rich Ecosystem**: Large collection of components and icons
7. **Active Development**: Regular updates and community support
