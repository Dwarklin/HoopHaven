# HoopHaven - Basketball Retail Website

## Overview

HoopHaven is a modern, responsive e-commerce website for a basketball retail store. The website is designed to showcase basketball products including shoes, basketballs, apparel, and accessories in a visually appealing and user-friendly manner.

## Features

- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices
- **Modern UI**: Clean, contemporary design with smooth animations and transitions
- **Product Showcase**: Categorized product display with filtering options
- **Shopping Cart**: Interactive shopping cart with add, remove, and quantity adjustment functionality
- **Testimonials**: Customer testimonial slider with automatic rotation
- **Newsletter Signup**: Email subscription form for marketing purposes
- **Contact Form**: User-friendly contact form for customer inquiries

## Technologies Used

- HTML5
- CSS3 (with CSS variables and Flexbox/Grid layouts)
- JavaScript (Vanilla JS, no frameworks)
- Font Awesome for icons
- Google Fonts (Poppins)

## Project Structure

```
├── index.html              # Main HTML file
├── styles/
│   └── main.css           # Main stylesheet
├── js/
│   └── main.js            # JavaScript functionality
├── images/                # Image assets
│   ├── hero-bg.svg        # Hero section background
│   ├── payment-visa.svg   # Payment method icons
│   ├── payment-mastercard.svg
│   ├── payment-paypal.svg
│   └── payment-amex.svg
└── README.md              # Project documentation
```

## Setup Instructions

1. Clone or download the repository
2. Open `index.html` in your web browser to view the website
3. No build process or dependencies required - it's a static website

## Customization

### Adding Products

To add new products, duplicate the product card HTML structure in the `index.html` file and update the following:

```html
<div class="product-card" data-category="category-name">
    <div class="product-badge">Badge Text</div> <!-- Optional -->
    <div class="product-img">
        <img src="images/product-image.jpg" alt="Product Name">
        <div class="product-actions">
            <!-- Action buttons -->
        </div>
    </div>
    <div class="product-info">
        <h3 class="product-title">Product Name</h3>
        <!-- Rating and price -->
    </div>
</div>
```

### Changing Colors

The website uses CSS variables for consistent theming. To change the color scheme, edit the variables in the `:root` section of `main.css`:

```css
:root {
    /* Colors */
    --primary-color: #ff6b00;
    --secondary-color: #2b2d42;
    --accent-color: #4361ee;
    /* ... other variables ... */
}
```

## Browser Compatibility

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Product detail pages
- User authentication system
- Checkout process
- Product search functionality
- Product reviews and ratings system
- Related products suggestions

## License

This project is available for personal and commercial use.

---

© 2023 HoopHaven. All Rights Reserved.