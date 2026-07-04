# UDYAMkart - Professional Invitation Website

A modern, premium, and fully responsive web platform designed to create an elegant team invitation experience. This website showcases the UDYAMkart brand with cutting-edge design, smooth animations, and professional engagement tools.

## 🌟 Features

### Core Features
- **Premium Design**: Dark theme with gradient accents, glassmorphism effects, and smooth animations
- **Responsive Layout**: Fully responsive design that works seamlessly on mobile, tablet, and desktop
- **Animated Elements**: Reveal animations, floating particles, rotating testimonials, and countdown timer
- **Multiple Pages**: Home, About, Join, and Contact pages with consistent branding
- **Theme Toggle**: Light/Dark mode switcher for user preference
- **Floating Actions**: Quick-access WhatsApp and phone call buttons

### Interactive Sections
- **Hero Section**: Compelling headline with 3D card effect and animated metrics
- **Statistics Dashboard**: Animated counters for client satisfaction, years of experience, ratings, and support
- **Feature Cards**: Three core values (Elegant Presentation, Fast Growth, Trusted Community)
- **Countdown Timer**: Live countdown to upcoming milestone event
- **Showcase Video**: Embedded YouTube video demonstrating Makhana processing
- **Testimonial Slider**: Rotating client feedback with smooth transitions
- **Call-to-Action Section**: Multiple conversion points throughout the site

### Professional Elements
- **Official Logo**: UDYAMkart branding integrated from official source
- **Contact Information**: 
  - Email: hello@udyamkart.com
  - Phone: +91 92055 20952
  - Location: Google Maps integration
- **Working Forms**: Join and Contact forms with success feedback
- **Makhana Story**: Cultural and educational content about the product

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Advanced styling with animations, gradients, and responsive design
- **JavaScript (Vanilla)**: 
  - Intersection Observer for reveal animations
  - Particle canvas animation
  - Countdown timer functionality
  - Form validation and submission
  - Theme toggle with localStorage
  - Testimonial rotation

### Design Elements
- **Font**: Inter (Google Fonts) - Modern, clean typography
- **Color Palette**:
  - Background: #060816 (Dark Navy)
  - Accent: #ffb347 (Gold)
  - Secondary Accent: #7c5cff (Purple)
  - Text: #f5f7ff (Light)
  - Muted: #a4afc9 (Gray)

## 📁 Project Structure

```
MAKAHNA-Invitation-website/
├── index.html              # Home page with hero and showcase
├── about.html              # About company and Makhana story
├── join.html               # Join form and application section
├── contact.html            # Contact information and form
├── css/
│   ├── style.css           # Main styling with animations
│   ├── responsive.css      # Mobile and responsive breakpoints
│   └── animation.css       # Additional animation library (optional)
├── js/
│   ├── script.js           # Core functionality (particles, forms, animations)
│   ├── counter.js          # Optional counter utilities
│   ├── scroll.js           # Optional scroll animations
│   └── fevicon.js          # Optional favicon loader
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server-side dependencies required for local viewing

### Installation

1. **Clone or Download the Project**
   ```bash
   git clone <repository-url>
   cd MAKAHNA-Invitation-website
   ```

2. **Open Locally**
   - Simply open `index.html` in your browser, or
   - Use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js (if installed)
     npx http-server
     ```
   - Navigate to `http://localhost:8000`

3. **View the Site**
   - Start at the home page (index.html)
   - Explore all pages using the navigation menu
   - Test responsive design by resizing the browser

## 📋 Page Guide

### Home Page (index.html)
- Hero section with animated card
- Statistics with counters
- Core features showcase
- Countdown timer
- Makhana processing video showcase
- Rotating testimonials
- How it works steps
- Call-to-action

### About Page (about.html)
- Company mission and values
- Makhana story and heritage
- Educational content about the product
- Professional positioning

### Join Page (join.html)
- Application form
- Multiple input fields (name, email, phone, interest, message)
- Form validation and success feedback
- Professional call-to-action

### Contact Page (contact.html)
- Contact details (email, phone, location)
- Contact form with validation
- Google Maps integration
- Professional messaging

## 🎨 Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
  --bg: #060816;           /* Background color */
  --accent: #ffb347;       /* Primary accent */
  --accent-2: #7c5cff;     /* Secondary accent */
  --text: #f5f7ff;         /* Text color */
  --muted: #a4afc9;        /* Muted text */
}
```

### Contact Information
Update in relevant HTML files:
- Email: `hello@udyamkart.com`
- Phone: `+91 92055 20952`
- Location: `https://maps.app.goo.gl/aEtYsAZkXnwXj4sZ8?g_st=ac`

### Logo
Replace logo URL in header (all pages):
```html
<img class="brand-logo" src="[YOUR-LOGO-URL]" alt="UDYAMkart logo" />
```

### Video
Replace YouTube embed ID in `index.html` showcase section:
```html
<iframe src="https://www.youtube.com/embed/[VIDEO-ID]"></iframe>
```

## ✨ Key Features Explained

### Animated Particles
- Canvas-based particle system running in background
- Improves visual depth and modern feel
- Performance optimized with ~80 particles

### Theme Toggle
- Switch between light and dark modes
- Preference saved to browser's localStorage
- Smooth color transitions

### Countdown Timer
- Live countdown to October 15, 2026
- Updates every second
- Format: Days, Hours, Minutes, Seconds

### Form Handling
- Client-side validation
- Success message display
- Form reset after submission
- Ready for backend integration

### Responsive Design
- Mobile-first approach
- Breakpoints at 900px and 640px
- Touch-friendly buttons and spacing
- Optimized for all screen sizes

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Troubleshooting

### Video Not Loading
- Check YouTube video ID is correct
- Ensure firewall allows YouTube embeds
- Verify internet connection

### Forms Not Working
- Check browser console for errors
- Ensure JavaScript is enabled
- Verify form field names match script

### Animations Not Smooth
- Update browser to latest version
- Check hardware acceleration is enabled
- Reduce number of particles if needed

### Logo Not Displaying
- Verify image URL is accessible
- Check image format (PNG/WEBP recommended)
- Ensure CORS headers allow embedding

## 📞 Contact & Support

**UDYAMkart**
- **Email**: hello@udyamkart.com
- **Phone**: +91 92055 20952
- **Website**: https://udyamkart.com
- **Location**: 
  - Delhi: 55 Second Floor, SAIDULAJAB, Gadaipur, New Delhi
  - Bangalore: Tower C, Prestige Shantiniketan Tech Park, Whitefield, Bengaluru

## 📖 About Makhana

Makhana (Fox Nuts) is a nutritious seed harvested from the lotus plant, deeply rooted in Indian culinary and wellness traditions. Known for its light texture, rich nutritional value, and versatility, makhana symbolizes purity, quality, and heritage—values that UDYAMkart embraces in its mission to support growth and innovation.

## 📄 License

This project is proprietary to UDYAMkart. All rights reserved.

## 🎯 Future Enhancements

- [ ] Backend form submission to email/database
- [ ] Multi-language support
- [ ] Advanced analytics integration
- [ ] Blog section
- [ ] Team member profiles
- [ ] Service pricing calculator
- [ ] Case studies section
- [ ] Live chat integration

---

**Last Updated**: July 4, 2026
**Version**: 1.0
**Status**: Production Ready

For questions or support, contact hello@udyamkart.com
