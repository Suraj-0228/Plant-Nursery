# Plant Nursery Website - Complete Development Guide (MERN Stack Project)

## Project Setup & Initial Configuration

### Step 1: Project Initialization
```bash
npm create vite@latest plant-nursery -- --template react
cd plant-nursery
npm install
```

### Step 2: Install Dependencies
```bash
# Core dependencies
npm install react-router-dom lucide-react react-spinners

# Note: GSAP and Lenis will be included via CDN links
```

### Step 3: HTML Template Setup
Replace the content in `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Plant Nursery - Your Green Paradise</title>
    
    <!-- DaisyUI and Tailwind CSS 4 -->
    <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@5/themes.css" rel="stylesheet" type="text/css" />
    
    <!-- GSAP CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    
    <!-- Lenis CDN -->
    <script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1/bundled/lenis.min.js"></script>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

## Project Structure & Architecture

### Step 4: Create Project Structure

Create the following folder structure in simple text format:

src/components/common/Navbar.jsx
src/components/common/Footer.jsx  
src/components/common/ThemeToggle.jsx
src/components/common/FloatingNavbar.jsx
src/components/ui/PlantCard.jsx
src/components/ui/CategoryCard.jsx
src/components/ui/HeroSection.jsx
src/components/ui/MagicBento.jsx
src/components/ui/DotGrid.jsx
src/components/forms/ContactForm.jsx
src/components/forms/LoginForm.jsx
src/components/forms/RegisterForm.jsx
src/pages/Home.jsx
src/pages/Category.jsx
src/pages/Guide.jsx
src/pages/About.jsx
src/pages/Contact.jsx
src/pages/Login.jsx
src/pages/Register.jsx
src/pages/Account.jsx
src/context/AuthContext.jsx
src/context/ThemeContext.jsx
src/hooks/useLocalStorage.jsx
src/hooks/useAuth.jsx
src/data/plants.js
src/data/categories.js
src/data/guides.js
src/utils/animations.js
src/styles/globals.css

## Development Steps

### Step 5: Setup Main App Component
Create `src/App.jsx` with React Router setup:
- Configure routes for all pages
- Include AuthContext provider
- Setup theme context
- Initialize Lenis smooth scrolling
- Setup GSAP animations

### Step 6: Create Authentication System (No Password Hashing)
**AuthContext.jsx:**
- Simple login/logout state management
- Store user data in localStorage (plain text - no encryption)
- Basic form validation without security measures
- Mock authentication (just check if username exists)

**Login/Register Forms:**
- Simple form validation
- Store passwords as plain text in localStorage
- No bcrypt or any hashing libraries
- Basic required field validation only

### Step 7: Build Core Components

#### Floating Navbar Component
- Use React Bits floating navbar pattern
- Implement with DaisyUI classes
- Include theme switcher
- Responsive design for mobile/desktop
- GSAP animations for show/hide on scroll

#### Theme Toggle Component
- Switch between 'garden' and 'forest' DaisyUI themes
- Persist theme choice in localStorage
- Smooth transition animations

#### Hero Section with Dot Grid
- Create dot grid background pattern with CSS
- Rotating featured plants carousel
- Seasonal offers section
- GSAP scroll-triggered animations

#### Magic Bento Grid
- Implement bento-style layout for features
- Showcase different plant categories
- Interactive hover effects with GSAP
- Responsive grid system

### Step 8: Implement Pages

#### Home Page Components:
1. **Hero Section**
   - Dot grid background
   - Featured plants carousel
   - Seasonal promotions
   - Call-to-action buttons

2. **Categories Overview Grid**
   - 4 main categories with images
   - Indoor, Outdoor, Herbs & Vegetables, Flowers
   - Hover animations with GSAP

3. **Magic Bento Features**
   - Plant care tips
   - Seasonal recommendations
   - Community features
   - Care difficulty indicators

4. **Herbal Plants Section**
   - Featured herbs with benefits
   - Health and culinary uses
   - Quick care tips

5. **About Us Snippet**
   - Mission statement
   - Link to full about page

6. **Newsletter Signup**
   - Email collection form
   - Plant care tips incentive

#### Category Page:
- Filter and sort functionality
- Search within categories
- Plant cards with care icons
- Pagination
- Loading states (use HashLoader from react-spinners)

#### Guide Page:
- Interactive care guides
- Seasonal calendar
- Problem diagnosis tool
- Watering schedule builder
- Light requirement matcher

#### About Page:
- Nursery story and mission
- Team member cards
- Location and hours
- Customer testimonials
- Community involvement section

#### Contact Page:
- Contact form with validation
- FAQ section
- Business hours display
- Social media links

#### Account Dashboard:
- Profile management
- Wishlist functionality
- Address book
- Order history (mock data)
- Plant care tracking
- Plant care tracking

### Step 9: Styling & Theming

**Note:** Use DaisyUI garden & forest themes through the CDN links provided in the HTML template.

#### Design Guidelines:
- Natural color scheme with greens and earth tones
- Clean, modern typography using DaisyUI typography classes
- Card-based layouts for plant displays
- Subtle animations and hover effects
- Mobile-first responsive design

### Step 10: Animations & Interactions

#### GSAP Animations (using CDN):
- Scroll-triggered animations for sections
- Hover effects for plant cards
- Page transition animations
- Loading animations
- Smooth reveal effects

#### Lenis Smooth Scrolling (using CDN):
- Initialize in main App component
- Configure for optimal performance
- Integrate with GSAP ScrollTrigger

### Step 11: Data Management

#### Mock Data Files:
Create realistic plant data including:
- Plant names, descriptions, images
- Care difficulty levels
- Light requirements
- Watering schedules
- Categories and tags
- Pricing information

#### Local Storage Usage:
- User authentication data (plain text)
- Theme preferences
- Wishlist items
- Shopping cart contents
- User preferences

### Step 12: Form Handling & Validation

#### Contact Form:
- Name, email, message fields
- Inquiry type selection
- Basic validation (required fields only)
- Success/error popup messages

#### Authentication Forms:
- Registration: fullname, email, username, password, confirm_password
- Login: username, password
- Remember me functionality
- Simple validation (no security measures)

### Step 13: Responsive Design Implementation

#### Breakpoints:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

#### Components Responsive Features:
- Floating navbar adapts to screen size
- Bento grid adjusts columns
- Plant cards responsive sizing
- Form layouts for mobile
- Navigation drawer for mobile

### Step 14: Search & Filter Functionality

#### Search Implementation:
- Global search across all plants
- Category-specific search
- Filter by care difficulty
- Sort by name, difficulty

### Step 15: Final Polish & Testing

#### Performance Optimization:
- Image lazy loading
- Component code splitting
- GSAP performance optimization
- Smooth scrolling performance

#### User Experience:
- Loading states for all async operations
- Error boundaries for React components
- Accessibility features (alt text, keyboard navigation)
- Form validation feedback

## Implementation Notes

### Authentication (Simplified):
```javascript
// Simple auth - no security measures
const login = (username, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }
  return false;
};

const register = (userData) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  users.push(userData); // Store password in plain text
  localStorage.setItem('users', JSON.stringify(users));
};
```

### Theme Integration:
```javascript
// Theme switcher implementation
const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'garden' ? 'forest' : 'garden';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
};
```

### GSAP Animation Examples:
```javascript
// Scroll-triggered animations
gsap.registerPlugin(ScrollTrigger);

gsap.fromTo('.plant-card', {
  y: 50,
  opacity: 0
}, {
  y: 0,
  opacity: 1,
  duration: 0.8,
  stagger: 0.2,
  scrollTrigger: '.plant-card'
});
```

## Final Deliverables

The completed website should include:
- Fully functional React application with Vite
- Responsive design using DaisyUI and Tailwind CSS 4
- Smooth animations with GSAP
- Lenis smooth scrolling
- Theme switching functionality
- Simple authentication system (no password hashing)
- All pages and components as specified
- Mock data for plants and categories
- Local storage for user data and preferences
- Mobile-first responsive design
- Accessibility features

This website will serve as a comprehensive digital presence for a plant nursery, focusing on both plant showcase and educational content to help customers with their gardening journey.