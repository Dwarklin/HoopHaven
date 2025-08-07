// Main JavaScript for HoopHaven Basketball Store

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initProductFilter();
    initTestimonialSlider();
    initShoppingCart();
    initLoadMoreButton();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Transform hamburger to X
            const bars = mobileMenu.querySelectorAll('.bar');
            if (mobileMenu.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenu.contains(event.target) && navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                
                const bars = mobileMenu.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }
}

// Product Filter
function initProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length && productCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                // Show/hide products based on filter
                productCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        // Add animation
                        card.style.animation = 'fadeIn 0.5s ease-in-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Testimonial Slider
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    
    if (slides.length && dots.length && prevBtn && nextBtn) {
        let currentSlide = 0;
        
        // Function to show a specific slide
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            
            // Remove active class from all dots
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Show the current slide and activate corresponding dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }
        
        // Next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        // Event listeners for buttons
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }
}

// Shopping Cart
function initShoppingCart() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.querySelector('.close-cart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');
    
    // Cart data
    let cart = [];
    
    // Load cart from localStorage if available
    if (localStorage.getItem('cart')) {
        try {
            cart = JSON.parse(localStorage.getItem('cart'));
            updateCartUI();
        } catch (e) {
            console.error('Error loading cart from localStorage:', e);
            localStorage.removeItem('cart');
        }
    }
    
    // Open cart
    if (cartIcon && cartSidebar && cartOverlay) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            cartSidebar.classList.add('open');
            cartOverlay.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }
    
    // Close cart
    if (closeCart && cartSidebar && cartOverlay) {
        closeCart.addEventListener('click', function() {
            cartSidebar.classList.remove('open');
            cartOverlay.classList.remove('open');
            document.body.style.overflow = ''; // Enable scrolling
        });
        
        cartOverlay.addEventListener('click', function() {
            cartSidebar.classList.remove('open');
            cartOverlay.classList.remove('open');
            document.body.style.overflow = ''; // Enable scrolling
        });
    }
    
    // Add to cart
    if (addToCartButtons.length) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productTitle = productCard.querySelector('.product-title').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                const productImg = productCard.querySelector('.product-img img').src;
                
                // Parse price (remove $ and convert to number)
                const price = parseFloat(productPrice.replace('$', ''));
                
                // Check if product is already in cart
                const existingItem = cart.find(item => item.title === productTitle);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        title: productTitle,
                        price: price,
                        image: productImg,
                        quantity: 1
                    });
                }
                
                // Save cart to localStorage
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Update cart UI
                updateCartUI();
                
                // Show cart
                cartSidebar.classList.add('open');
                cartOverlay.classList.add('open');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                
                // Show added to cart animation
                showAddedToCartAnimation(productCard);
            });
        });
    }
    
    // Update cart UI
    function updateCartUI() {
        if (cartItems && cartTotal && cartCount) {
            // Update cart count
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Update cart items
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <p>Your cart is empty</p>
                        <a href="#products" class="btn btn-primary">Start Shopping</a>
                    </div>
                `;
            } else {
                let cartHTML = '';
                
                cart.forEach((item, index) => {
                    cartHTML += `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.title}">
                            <div class="cart-item-info">
                                <h4>${item.title}</h4>
                                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                                <div class="cart-item-quantity">
                                    <button class="quantity-btn decrease" data-index="${index}">-</button>
                                    <span>${item.quantity}</span>
                                    <button class="quantity-btn increase" data-index="${index}">+</button>
                                </div>
                            </div>
                            <button class="remove-item" data-index="${index}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                });
                
                cartItems.innerHTML = cartHTML;
                
                // Add event listeners for quantity buttons and remove buttons
                document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        if (cart[index].quantity > 1) {
                            cart[index].quantity -= 1;
                        } else {
                            cart.splice(index, 1);
                        }
                        localStorage.setItem('cart', JSON.stringify(cart));
                        updateCartUI();
                    });
                });
                
                document.querySelectorAll('.quantity-btn.increase').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        cart[index].quantity += 1;
                        localStorage.setItem('cart', JSON.stringify(cart));
                        updateCartUI();
                    });
                });
                
                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        cart.splice(index, 1);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        updateCartUI();
                    });
                });
            }
            
            // Update cart total
            const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            cartTotal.textContent = `$${total.toFixed(2)}`;
        }
    }
    
    // Added to cart animation
    function showAddedToCartAnimation(productCard) {
        const notification = document.createElement('div');
        notification.className = 'added-notification';
        notification.innerHTML = '<i class="fas fa-check"></i> Added to cart';
        
        productCard.appendChild(notification);
        
        // Add CSS for the notification
        notification.style.position = 'absolute';
        notification.style.top = '10px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = 'var(--success-color)';
        notification.style.color = 'white';
        notification.style.padding = '0.5rem 1rem';
        notification.style.borderRadius = 'var(--border-radius-md)';
        notification.style.zIndex = '10';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        
        // Animate
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }
}

// Load More Button
function initLoadMoreButton() {
    const loadMoreBtn = document.querySelector('.load-more .btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real application, this would load more products from the server
            // For this demo, we'll just show a message
            loadMoreBtn.textContent = 'Loading...';
            
            setTimeout(() => {
                loadMoreBtn.textContent = 'No More Products';
                loadMoreBtn.disabled = true;
                loadMoreBtn.style.backgroundColor = 'var(--gray-color)';
                loadMoreBtn.style.borderColor = 'var(--gray-color)';
                loadMoreBtn.style.cursor = 'not-allowed';
            }, 1500);
        });
    }
}

// Scroll Animations
window.addEventListener('scroll', function() {
    // Add .scrolled class to header when scrolled
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.product-card, .category-card, .featured-large, .featured-small, .about-image, .about-content, .contact-card');
    
    animateElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
});

// Add CSS for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .product-card, .category-card, .featured-large, .featured-small, .about-image, .about-content, .contact-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .product-card.animate, .category-card.animate, .featured-large.animate, .featured-small.animate, .about-image.animate, .about-content.animate, .contact-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        header.scrolled {
            box-shadow: var(--shadow-md);
        }
        
        .cart-item {
            display: flex;
            align-items: center;
            padding: 1rem 0;
            border-bottom: 1px solid var(--light-gray-color);
        }
        
        .cart-item img {
            width: 70px;
            height: 70px;
            object-fit: cover;
            border-radius: var(--border-radius-sm);
        }
        
        .cart-item-info {
            flex: 1;
            padding: 0 1rem;
        }
        
        .cart-item-info h4 {
            font-size: 0.9rem;
            margin-bottom: 0.25rem;
        }
        
        .cart-item-price {
            font-weight: 600;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }
        
        .cart-item-quantity {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .quantity-btn {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 1px solid var(--light-gray-color);
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-size: 0.8rem;
            transition: all var(--transition-fast);
        }
        
        .quantity-btn:hover {
            background-color: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }
        
        .remove-item {
            background: none;
            border: none;
            color: var(--gray-color);
            cursor: pointer;
            transition: color var(--transition-fast);
        }
        
        .remove-item:hover {
            color: var(--danger-color);
        }
    `;
    document.head.appendChild(style);
});