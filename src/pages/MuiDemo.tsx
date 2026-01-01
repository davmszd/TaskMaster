import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Stack,
  Alert,
  Chip,
  IconButton,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  Badge,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Slider,
  Rating,
  LinearProgress,
  CircularProgress,
  Tooltip,
  Fab,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  AppBar,
  Toolbar,
  Breadcrumbs,
  Link,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Favorite,
  Delete,
  Send,
  Add,
  Home,
  Settings,
  Mail,
  Notifications,
  AccountCircle,
  ShoppingCart,
  Star,
  ExpandMore,
  Inbox,
  Drafts,
  Info,
  Warning,
  CheckCircle,
  Error as ErrorIcon,
  Edit,
  Save,
  CloudUpload,
  Download,
} from '@mui/icons-material';
import { useState } from 'react';

function MuiDemo() {
  const [text, setText] = useState('');
  const [liked, setLiked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('option1');
  const [sliderValue, setSliderValue] = useState(30);
  const [ratingValue, setRatingValue] = useState<number | null>(3);
  const [alignment, setAlignment] = useState('left');
  const [tabValue, setTabValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box sx={{ p: 3 }}>
      {/* App Bar Example */}
      <AppBar position="static" sx={{ mb: 4, borderRadius: 1 }}>
        <Toolbar>
          <Home sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Material-UI Component Library
          </Typography>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <Settings />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Typography variant="h3" component="h1" gutterBottom>
        Material-UI Components Demo
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        This page demonstrates various Material-UI components integrated into
        the React app.
      </Typography>

      {/* Overview Card */}
      <Paper
        elevation={3}
        sx={{ p: 3, mb: 4, bgcolor: 'primary.main', color: 'white' }}
      >
        <Typography variant="h5" gutterBottom>
          📚 Comprehensive MUI Component Library
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Explore 50+ Material-UI components organized into categories:
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="primary">
                Inputs
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Buttons, Text Fields, Switches, Checkboxes, Radio, Select,
                Slider
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="primary">
                Data Display
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cards, Lists, Tables, Chips, Avatars, Badges, Typography
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="primary">
                Feedback
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Alerts, Progress, Dialogs, Snackbars, Tooltips
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="primary">
                Navigation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                AppBar, Tabs, Breadcrumbs, Accordions
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      <Stack spacing={4}>
        {/* Buttons Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Buttons
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
            <Button variant="contained" color="secondary">
              Secondary
            </Button>
            <Button variant="contained" color="success">
              Success
            </Button>
            <Button variant="contained" color="error">
              Error
            </Button>
            <Button variant="contained" startIcon={<Send />}>
              Send
            </Button>
            <Button variant="outlined" endIcon={<Add />}>
              Add Item
            </Button>
          </Stack>
        </Paper>

        {/* Icon Buttons Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Icon Buttons
          </Typography>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Colors:
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton color="primary" aria-label="home">
                  <Home />
                </IconButton>
                <IconButton color="secondary" aria-label="settings">
                  <Settings />
                </IconButton>
                <IconButton
                  color={liked ? 'error' : 'default'}
                  aria-label="like"
                  onClick={() => setLiked(!liked)}
                >
                  <Favorite />
                </IconButton>
                <IconButton color="error" aria-label="delete">
                  <Delete />
                </IconButton>
                <IconButton color="success" aria-label="save">
                  <Save />
                </IconButton>
                <IconButton color="info" aria-label="info">
                  <Info />
                </IconButton>
              </Stack>
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Sizes:
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton size="small" color="primary">
                  <Star fontSize="small" />
                </IconButton>
                <IconButton size="medium" color="primary">
                  <Star fontSize="medium" />
                </IconButton>
                <IconButton size="large" color="primary">
                  <Star fontSize="large" />
                </IconButton>
              </Stack>
            </Box>
          </Stack>
        </Paper>

        {/* Text Fields Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Text Fields
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Standard"
              variant="outlined"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type something..."
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              helperText="We'll never share your email"
            />
            <TextField label="Password" variant="outlined" type="password" />
            <TextField
              label="Multiline"
              variant="outlined"
              multiline
              rows={3}
              placeholder="Enter multiple lines..."
            />
          </Stack>
        </Paper>

        {/* Cards Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Cards
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Card Title
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is a sample card component with content and actions.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                  <Button size="small" color="primary">
                    Action
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Colored Card
                  </Typography>
                  <Typography variant="body2">
                    Cards can have custom colors and styles.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Outlined Card
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This card uses the outlined variant.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Alerts Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Alerts
          </Typography>
          <Stack spacing={2}>
            <Alert severity="success">This is a success alert!</Alert>
            <Alert severity="info">This is an info alert!</Alert>
            <Alert severity="warning">This is a warning alert!</Alert>
            <Alert severity="error">This is an error alert!</Alert>
          </Stack>
        </Paper>

        {/* Chips Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Chips
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label="Default" />
            <Chip label="Primary" color="primary" />
            <Chip label="Secondary" color="secondary" />
            <Chip label="Success" color="success" />
            <Chip
              label="Clickable"
              color="primary"
              onClick={() => alert('Clicked!')}
            />
            <Chip
              label="Deletable"
              color="secondary"
              onDelete={() => alert('Deleted!')}
            />
            <Chip icon={<Favorite />} label="With Icon" color="error" />
          </Stack>
        </Paper>

        {/* Switches Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Switches & Controls
          </Typography>
          <Stack spacing={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
              }
              label="Toggle Feature"
            />
            <FormControlLabel
              control={<Switch defaultChecked color="secondary" />}
              label="Secondary Color"
            />
            <FormControlLabel control={<Switch disabled />} label="Disabled" />
          </Stack>
        </Paper>

        {/* Typography Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Typography
          </Typography>
          <Stack spacing={1}>
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
            <Typography variant="subtitle1">Subtitle 1</Typography>
            <Typography variant="subtitle2">Subtitle 2</Typography>
            <Typography variant="body1">
              Body 1 - Regular text paragraph
            </Typography>
            <Typography variant="body2">
              Body 2 - Smaller text paragraph
            </Typography>
            <Typography variant="caption">Caption text</Typography>
            <Typography variant="overline">Overline text</Typography>
          </Stack>
        </Paper>

        {/* Avatars & Badges Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Avatars & Badges
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            flexWrap="wrap"
            useFlexGap
          >
            <Avatar>JD</Avatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <AccountCircle />
            </Avatar>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <Settings />
            </Avatar>
            <Badge badgeContent={4} color="primary">
              <Mail />
            </Badge>
            <Badge badgeContent={99} color="error">
              <Notifications />
            </Badge>
            <Badge badgeContent={0} showZero color="secondary">
              <ShoppingCart />
            </Badge>
            <Badge variant="dot" color="success">
              <AccountCircle />
            </Badge>
          </Stack>
        </Paper>

        {/* Checkboxes & Radio Buttons Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Checkboxes & Radio Buttons
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Checkboxes:
              </Typography>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Checked"
              />
              <FormControlLabel control={<Checkbox />} label="Unchecked" />
              <FormControlLabel
                control={<Checkbox disabled />}
                label="Disabled"
              />
            </Box>
            <Divider />
            <Box>
              <FormControl>
                <FormLabel>Radio Buttons:</FormLabel>
                <RadioGroup
                  value={radioValue}
                  onChange={(e) => setRadioValue(e.target.value)}
                >
                  <FormControlLabel
                    value="option1"
                    control={<Radio />}
                    label="Option 1"
                  />
                  <FormControlLabel
                    value="option2"
                    control={<Radio />}
                    label="Option 2"
                  />
                  <FormControlLabel
                    value="option3"
                    control={<Radio />}
                    label="Option 3"
                  />
                  <FormControlLabel
                    value="disabled"
                    control={<Radio />}
                    label="Disabled"
                    disabled
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Stack>
        </Paper>

        {/* Select & Slider Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Select & Slider
          </Typography>
          <Stack spacing={3}>
            <FormControl fullWidth>
              <Typography variant="subtitle2" gutterBottom>
                Select Dropdown:
              </Typography>
              <Select
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
              >
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </Select>
            </FormControl>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Slider (Value: {sliderValue}):
              </Typography>
              <Slider
                value={sliderValue}
                onChange={(_, value) => setSliderValue(value as number)}
                valueLabelDisplay="auto"
                marks
                min={0}
                max={100}
                step={10}
              />
            </Box>
          </Stack>
        </Paper>

        {/* Rating Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Rating
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Controllable Rating:
              </Typography>
              <Rating
                value={ratingValue}
                onChange={(_, newValue) => setRatingValue(newValue)}
                size="large"
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Custom Icons:
              </Typography>
              <Rating
                defaultValue={4}
                icon={<Favorite fontSize="inherit" />}
                emptyIcon={<Favorite fontSize="inherit" />}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Half Ratings:
              </Typography>
              <Rating defaultValue={2.5} precision={0.5} />
            </Box>
          </Stack>
        </Paper>

        {/* Progress Indicators Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Progress Indicators
          </Typography>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Linear Progress:
              </Typography>
              <LinearProgress />
              <Box sx={{ mt: 2 }}>
                <LinearProgress variant="determinate" value={50} />
              </Box>
              <Box sx={{ mt: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={75}
                  color="secondary"
                />
              </Box>
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Circular Progress:
              </Typography>
              <Stack direction="row" spacing={2}>
                <CircularProgress />
                <CircularProgress variant="determinate" value={50} />
                <CircularProgress
                  variant="determinate"
                  value={75}
                  color="secondary"
                />
                <CircularProgress color="success" />
              </Stack>
            </Box>
          </Stack>
        </Paper>

        {/* Button Groups & Toggle Buttons Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Button Groups & Toggle Buttons
          </Typography>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Button Group:
              </Typography>
              <ButtonGroup variant="contained">
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
              </ButtonGroup>
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Toggle Button Group:
              </Typography>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={(_, newAlignment) =>
                  newAlignment && setAlignment(newAlignment)
                }
              >
                <ToggleButton value="left">Left</ToggleButton>
                <ToggleButton value="center">Center</ToggleButton>
                <ToggleButton value="right">Right</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Stack>
        </Paper>

        {/* Tooltips & FAB Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Tooltips & Floating Action Buttons
          </Typography>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Tooltips:
              </Typography>
              <Stack direction="row" spacing={2}>
                <Tooltip title="Delete" placement="top">
                  <IconButton>
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit" placement="right">
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Save" placement="bottom">
                  <IconButton color="success">
                    <Save />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Floating Action Buttons:
              </Typography>
              <Stack direction="row" spacing={2}>
                <Fab color="primary" aria-label="add">
                  <Add />
                </Fab>
                <Fab color="secondary" aria-label="edit">
                  <Edit />
                </Fab>
                <Fab variant="extended" color="success">
                  <CloudUpload sx={{ mr: 1 }} />
                  Upload
                </Fab>
                <Fab size="small" color="error">
                  <Delete />
                </Fab>
              </Stack>
            </Box>
          </Stack>
        </Paper>

        {/* Accordions Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Accordions
          </Typography>
          <Box>
            <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleAccordionChange('panel1')}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Accordion 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  This is the content of the first accordion. It can contain any
                  content including text, images, or other components.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel2'}
              onChange={handleAccordionChange('panel2')}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The second accordion with different content. Accordions are
                  great for organizing information.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel3'}
              onChange={handleAccordionChange('panel3')}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Accordion 3</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  <Typography>
                    You can even put complex content inside accordions:
                  </Typography>
                  <Button variant="contained" startIcon={<Download />}>
                    Download File
                  </Button>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Paper>

        {/* Lists Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Lists
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" gutterBottom>
                Basic List:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Inbox />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" secondary="5 new messages" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Drafts />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" secondary="3 drafts" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Mail />
                  </ListItemIcon>
                  <ListItemText primary="Sent" secondary="12 sent" />
                </ListItem>
              </List>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle2" gutterBottom>
                Clickable List:
              </Typography>
              <List>
                <ListItemButton>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <Info />
                  </ListItemIcon>
                  <ListItemText primary="About" />
                </ListItemButton>
              </List>
            </Grid>
          </Grid>
        </Paper>

        {/* Tabs Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Tabs
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={(_, newValue) => setTabValue(newValue)}
            >
              <Tab label="Tab One" icon={<Home />} iconPosition="start" />
              <Tab label="Tab Two" icon={<Star />} iconPosition="start" />
              <Tab label="Tab Three" icon={<Settings />} iconPosition="start" />
            </Tabs>
          </Box>
          <Box sx={{ p: 3 }}>
            {tabValue === 0 && (
              <Typography>
                Content for Tab One. This is where you display content for the
                first tab.
              </Typography>
            )}
            {tabValue === 1 && (
              <Typography>
                Content for Tab Two. Different content appears when you switch
                tabs.
              </Typography>
            )}
            {tabValue === 2 && (
              <Typography>
                Content for Tab Three. Tabs are great for organizing related
                content.
              </Typography>
            )}
          </Box>
        </Paper>

        {/* Breadcrumbs Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Breadcrumbs
          </Typography>
          <Stack spacing={2}>
            <Breadcrumbs>
              <Link underline="hover" color="inherit" href="/">
                <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/getting-started">
                Getting Started
              </Link>
              <Typography color="text.primary">Breadcrumbs</Typography>
            </Breadcrumbs>
            <Breadcrumbs separator="›">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/catalog">
                Catalog
              </Link>
              <Link underline="hover" color="inherit" href="/accessories">
                Accessories
              </Link>
              <Typography color="text.primary">New Collection</Typography>
            </Breadcrumbs>
          </Stack>
        </Paper>

        {/* Dialog & Snackbar Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Dialog & Snackbar
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => setDialogOpen(true)}>
              Open Dialog
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setSnackbarOpen(true)}
            >
              Show Snackbar
            </Button>
          </Stack>

          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogContent>
              <Typography>
                This is a dialog component. You can put any content here,
                including forms, text, or other components.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={() => setDialogOpen(false)}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            message="This is a snackbar notification!"
          />
        </Paper>

        {/* Divider Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Dividers
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant="body1">Content above divider</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">Content below divider</Typography>
            </Box>
            <Divider>WITH TEXT</Divider>
            <Box>
              <Typography variant="body1">
                Vertical dividers in flex:
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
                sx={{ mt: 1 }}
              >
                <Typography>Item 1</Typography>
                <Typography>Item 2</Typography>
                <Typography>Item 3</Typography>
              </Stack>
            </Box>
          </Stack>
        </Paper>

        {/* Alert Icons Section */}
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Alert with Icons
          </Typography>
          <Stack spacing={2}>
            <Alert icon={<CheckCircle fontSize="inherit" />} severity="success">
              This is a success alert with a custom icon!
            </Alert>
            <Alert icon={<Info fontSize="inherit" />} severity="info">
              This is an info alert with a custom icon!
            </Alert>
            <Alert icon={<Warning fontSize="inherit" />} severity="warning">
              This is a warning alert with a custom icon!
            </Alert>
            <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error">
              This is an error alert with a custom icon!
            </Alert>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}

export default MuiDemo;
