// Ultra-Modern Portfolio JavaScript - Smooth Animations & Interactions

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupVideoModal();
        this.setupContactForm();
        this.setupSmoothScrolling();
        this.setupParallaxEffects();
        this.setupTestimonialSlider();
        this.setupPhotoPlaceholder();
    }

    // Intersection Observer for scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Animate elements on scroll
        const animateElements = document.querySelectorAll(
            '.skill-card, .timeline-item, .project-card, .cert-card, .testimonial-card'
        );
        
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            observer.observe(el);
        });
    }

    // Video modal functionality
    setupVideoModal() {
        const videoPreview = document.querySelector('.video-preview');
        if (videoPreview) {
            videoPreview.addEventListener('click', () => {
                this.openVideoModal();
            });
        }
    }

    openVideoModal() {
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
            <div class="modal-content glass">
                <div class="modal-header">
                    <h3>Training Showcase</h3>
                    <button class="modal-close" onclick="this.closest('.video-modal').remove()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="video-placeholder-large">
                        <div class="play-button-large">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <path d="M8 5v14l11-7z" fill="currentColor"/>
                            </svg>
                        </div>
                        <p>Dynamic Learning • Google-Style Upskilling • Interactive Sessions</p>
                        <small>Replace this with your actual training video or YouTube embed</small>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .video-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: modalFadeIn 0.3s ease;
            }
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
            }
            .modal-content {
                position: relative;
                width: 90%;
                max-width: 800px;
                border-radius: 16px;
                overflow: hidden;
                animation: modalSlideIn 0.3s ease;
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            .modal-header h3 {
                color: white;
                margin: 0;
                font-weight: 600;
            }
            .modal-close {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.7);
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 8px;
                transition: all 0.3s ease;
            }
            .modal-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: white;
            }
            .modal-body {
                padding: 1.5rem;
            }
            .video-placeholder-large {
                height: 400px;
                background: linear-gradient(135deg, rgba(79, 172, 254, 0.2) 0%, rgba(167, 139, 250, 0.2) 100%);
                border-radius: 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                color: white;
                gap: 1rem;
            }
            .play-button-large {
                width: 80px;
                height: 80px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(10px);
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .play-button-large:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: scale(1.1);
            }
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes modalSlideIn {
                from { transform: translateY(30px) scale(0.95); }
                to { transform: translateY(0) scale(1); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(modal);
    }

    // Contact form handling
    setupContactForm() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmit(e.target);
            });
        }
    }

    handleContactSubmit(form) {
        const formData = new FormData(form);
        const name = formData.get('name') || form.querySelector('input[type="text"]').value;
        const email = formData.get('email') || form.querySelector('input[type="email"]').value;
        const message = formData.get('message') || form.querySelector('textarea').value;

        // Show success message
        this.showNotification(`Thanks ${name}! Your message has been received. I'll get back to you soon.`, 'success');
        form.reset();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
        `;

        // Add notification styles
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 2rem;
                    right: 2rem;
                    z-index: 10001;
                    animation: notificationSlideIn 0.3s ease;
                }
                .notification-content {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 12px;
                    padding: 1rem 1.5rem;
                    color: white;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                }
                .notification-success .notification-content {
                    border-color: rgba(34, 197, 94, 0.3);
                    background: rgba(34, 197, 94, 0.1);
                }
                .notification button {
                    background: none;
                    border: none;
                    color: rgba(255, 255, 255, 0.7);
                    cursor: pointer;
                    padding: 0.25rem;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                }
                .notification button:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                }
                @keyframes notificationSlideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Smooth scrolling for navigation links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Parallax effects for background elements
    setupParallaxEffects() {
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }

    // Testimonial slider (auto-rotate)
    setupTestimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        if (testimonials.length <= 1) return;

        let currentIndex = 0;
        
        const showTestimonial = (index) => {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.opacity = i === index ? '1' : '0.3';
                testimonial.style.transform = i === index ? 'scale(1)' : 'scale(0.95)';
            });
        };

        const nextTestimonial = () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        };

        // Initialize
        showTestimonial(0);
        
        // Auto-rotate every 5 seconds
        setInterval(nextTestimonial, 5000);
    }

    // Photo placeholder interaction
    setupPhotoPlaceholder() {
        const photoPlaceholder = document.getElementById('photoPlaceholder');
        if (photoPlaceholder) {
            photoPlaceholder.addEventListener('click', () => {
                this.showNotification('Photo placeholder clicked! Replace with your actual photo.', 'info');
            });
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Add some additional interactive effects
window.addEventListener('load', () => {
    // Add loading animation completion
    document.body.classList.add('loaded');
    
    // Add cursor trail effect for desktop
    if (window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const animateTrail = () => {
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;
            
            const trail = document.querySelector('.cursor-trail');
            if (trail) {
                trail.style.left = trailX + 'px';
                trail.style.top = trailY + 'px';
            }
            
            requestAnimationFrame(animateTrail);
        };
        
        // Create cursor trail element
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(79, 172, 254, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(trail);
        
        animateTrail();
    }
});
