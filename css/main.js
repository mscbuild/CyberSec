function initLoader() {
    const loader = document.getElementById('loader');
    const progressBar = loader.querySelector('.loader-progress-bar');
    const loaderPercent = loader.querySelector('.loader-percentage');
    
    if (!loader || !progressBar) return;
    
    let progress = 0;
    const terminalLines = loader.querySelectorAll('.terminal-line');
    
    terminalLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
        }, index * 200);
    });
    
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: loader,
                        opacity: [1, 0],
                        duration: 500,
                        easing: 'easeInOutQuad',
                        complete: () => {
                            loader.classList.add('hidden');
                            initPageAnimations();
                        }
                    });
                } else {
                    loader.classList.add('hidden');
                    initPageAnimations();
                }
            }, 500);
        }
        
        progressBar.style.width = progress + '%';
        if (loaderPercent) {
            loaderPercent.textContent = Math.floor(progress) + '%';
        }
    }, 80);
}

function initMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 14, 26, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            ctx.fillText(text, x, y);
            
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function initParticles() {
    const container = document.getElementById('hackParticles');
    if (!container) return;
    
    const particleCount = 30;
    const chars = ['0', '1', '{', '}', '[', ']', '<', '>', '/', '*'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = chars[Math.floor(Math.random() * chars.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 4) + 's';
        container.appendChild(particle);
    }
}

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const header = document.getElementById('header');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                const sections = document.querySelectorAll('section[id]');
                const scrollPos = window.scrollY + 200;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

function initPageAnimations() {
    setTimeout(() => {
        initHeroAnimations();
        initScrollAnimations();
    }, 300);
}

function initHeroAnimations() {
    if (typeof anime === 'undefined') return;
    
    const titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach((word, index) => {
        anime({
            targets: word,
            opacity: [0, 1],
            translateY: [50, 0],
            delay: index * 200,
            duration: 1000,
            easing: 'easeOutExpo'
        });
    });
    
    const badge = document.querySelector('.hero-badge');
    if (badge) {
        anime({
            targets: badge,
            opacity: [0, 1],
            scale: [0.8, 1],
            delay: 300,
            duration: 800,
            easing: 'easeOutBack'
        });
    }
    
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        anime({
            targets: subtitle,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: 800,
            duration: 800,
            easing: 'easeOutExpo'
        });
    }
    
    const description = document.querySelector('.hero-description');
    if (description) {
        anime({
            targets: description,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: 1000,
            duration: 800,
            easing: 'easeOutExpo'
        });
    }
    
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length > 0) {
        anime({
            targets: statCards,
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(100, {start: 1200}),
            duration: 800,
            easing: 'easeOutExpo'
        });
    }
    
    const buttons = document.querySelectorAll('.hero-buttons .btn');
    if (buttons.length > 0) {
        anime({
            targets: buttons,
            opacity: [0, 1],
            scale: [0.8, 1],
            delay: anime.stagger(100, {start: 1800}),
            duration: 800,
            easing: 'easeOutBack'
        });
    }
    
    const monitor = document.querySelector('.security-monitor');
    if (monitor) {
        anime({
            targets: monitor,
            opacity: [0, 1],
            scale: [0.9, 1],
            rotate: [5, 0],
            delay: 1000,
            duration: 1200,
            easing: 'easeOutElastic(1, .8)'
        });
    }
    
    const floatIcons = document.querySelectorAll('.float-icon');
    if (floatIcons.length > 0) {
        anime({
            targets: floatIcons,
            opacity: [0, 1],
            scale: [0, 1],
            delay: anime.stagger(150, {start: 1500}),
            duration: 800,
            easing: 'easeOutBack'
        });
    }
}

function initScrollAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        try {
            gsap.registerPlugin(ScrollTrigger);
            
            gsap.utils.toArray('.section').forEach(section => {
                const header = section.querySelector('.section-header');
                if (header) {
                    gsap.from(header, {
                        opacity: 0,
                        y: -50,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        }
                    });
                }
            });
            
            gsap.utils.toArray('.service-card, .cert-card, .feature-card, .contact-card').forEach(card => {
                gsap.from(card, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                });
            });
        } catch (e) {
            console.log('GSAP ScrollTrigger not available, using fallback');
            initScrollAnimationsFallback();
        }
    } else {
        initScrollAnimationsFallback();
    }
}

function initScrollAnimationsFallback() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                } else {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const animateElements = document.querySelectorAll('.service-card, .cert-card, .feature-card, .contact-card, .section-header');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

function initStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count') || 0);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (typeof anime !== 'undefined') {
                        anime({
                            targets: { value: 0 },
                            value: target,
                            duration: 2000,
                            easing: 'easeOutExpo',
                            update: function(anim) {
                                stat.textContent = Math.floor(anim.animatables[0].target.value);
                            }
                        });
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            if (isActive) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}

function initParallax() {
    const monitor = document.querySelector('.security-monitor');
    const floatIcons = document.querySelectorAll('.float-icon');
    
    if (!monitor) return;
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroSection = document.querySelector('.hero');
                const heroHeight = heroSection.offsetHeight;
                
                if (scrolled < heroHeight) {
                    const parallaxSpeed = 0.2;
                    const offset = scrolled * parallaxSpeed;
                    
                    if (monitor) {
                        monitor.style.transform = `translateY(${offset}px)`;
                    }
                    
                    floatIcons.forEach((icon, index) => {
                        const speed = 0.15 + (index * 0.05);
                        const iconOffset = scrolled * speed;
                        icon.style.transform = `translateY(${iconOffset}px)`;
                    });
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

function initScrollEffects() {
    const sections = document.querySelectorAll('.section');
    let useGSAP = false;
    
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        try {
            gsap.registerPlugin(ScrollTrigger);
            useGSAP = true;
            
            sections.forEach((section) => {
                const bg = section.querySelector('.section-bg');
                if (bg) {
                    gsap.set(bg, { y: 0, clearProps: 'transform' });
                    
                    gsap.to(bg, {
                        y: -20,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1,
                            invalidateOnRefresh: true,
                            onLeave: () => {
                                gsap.set(bg, { y: 0, clearProps: 'transform' });
                            },
                            onEnterBack: () => {
                                gsap.set(bg, { y: 0, clearProps: 'transform' });
                            },
                            onUpdate: (self) => {
                                if (self.progress === 0) {
                                    gsap.set(bg, { y: 0, clearProps: 'transform' });
                                } else if (self.progress === 1) {
                                    gsap.set(bg, { y: -20 });
                                }
                            }
                        }
                    });
                }
            });
            
            const scanLine = document.querySelector('.scan-line');
            if (scanLine) {
                gsap.to(scanLine, {
                    y: window.innerHeight * 2,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.hero',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            }
        } catch (e) {
            console.log('GSAP ScrollTrigger error:', e);
            useGSAP = false;
        }
    }
    
    if (!useGSAP) {
        let ticking = false;
        
        function updateParallax() {
            sections.forEach(section => {
                const bg = section.querySelector('.section-bg');
                if (bg) {
                    const rect = section.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    const sectionHeight = rect.height;
                    
                    if (rect.top < windowHeight && rect.bottom > 0) {
                        const viewportProgress = (windowHeight - rect.top) / (windowHeight + sectionHeight);
                        const progress = Math.max(0, Math.min(1, viewportProgress));
                        const maxOffset = 20;
                        const offset = progress * maxOffset;
                        bg.style.transform = `translateY(${offset}px)`;
                    } else if (rect.bottom < 0 || rect.top > windowHeight) {
                        bg.style.transform = 'translateY(0)';
                    }
                }
            });
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
        
        updateParallax();
        
        window.addEventListener('resize', () => {
            updateParallax();
        }, { passive: true });
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                const bg = entry.target.querySelector('.section-bg');
                if (bg && !useGSAP) {
                    bg.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    window.addEventListener('load', () => {
        sections.forEach(section => {
            const bg = section.querySelector('.section-bg');
            if (bg) {
                bg.style.transform = 'translateY(0)';
            }
        });
    });
}

function initDirection() {
    const dirToggle = document.getElementById('dirToggle');
    const html = document.documentElement;
    let currentDir = localStorage.getItem('dir') || 'ltr';
    
    function setDirection(dir) {
        currentDir = dir;
        localStorage.setItem('dir', dir);
        html.setAttribute('dir', dir);
        
        const dirText = dirToggle?.querySelector('.dir-text');
        if (dirText) dirText.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    }
    
    if (dirToggle) {
        setDirection(currentDir);
        dirToggle.addEventListener('click', () => {
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            setDirection(newDir);
            
            if (typeof anime !== 'undefined') {
                anime({
                    targets: dirToggle,
                    rotate: [0, 360],
                    duration: 500,
                    easing: 'easeInOutQuad'
                });
            }
        });
    }
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (typeof anime !== 'undefined') {
            const btn = contactForm.querySelector('.btn-submit');
            anime({
                targets: btn,
                scale: [1, 0.95, 1],
                duration: 300
            });
        }
        
        const message = 'Message sent securely! Your data is encrypted.';
        
        setTimeout(() => {
            alert(message);
            contactForm.reset();
        }, 300);
    });
}

function initHacksSlider() {
    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSlideEl = document.getElementById('currentSlide');
    const totalSlidesEl = document.getElementById('totalSlides');
    const sliderProgress = document.getElementById('sliderProgress');
    const sliderIndicators = document.getElementById('sliderIndicators');
    const sliderViewport = document.querySelector('.slider-viewport');
    
    if (!sliderTrack || !prevBtn || !nextBtn) return;
    
    const slides = sliderTrack.querySelectorAll('.slider-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let isTransitioning = false;
    
    if (totalSlidesEl) totalSlidesEl.textContent = String(totalSlides).padStart(2, '0');
    
    function createIndicators() {
        if (!sliderIndicators) return;
        sliderIndicators.innerHTML = '';
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'slider-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            sliderIndicators.appendChild(indicator);
        });
    }
    
    function updateSlider() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        const isRTL = document.documentElement.dir === 'rtl';
        const translateX = isRTL ? currentSlide * 100 : -currentSlide * 100;
        sliderTrack.style.transform = `translateX(${translateX}%)`;
        
        const viewportWidth = sliderViewport ? sliderViewport.offsetWidth : window.innerWidth;
        slides.forEach((slide) => {
            slide.style.width = `${viewportWidth}px`;
        });
        
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        if (currentSlideEl) {
            currentSlideEl.textContent = String(currentSlide + 1).padStart(2, '0');
        }
        
        if (sliderProgress) {
            sliderProgress.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;
        }
        
        if (sliderIndicators) {
            const indicators = sliderIndicators.querySelectorAll('.slider-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }
        
        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    }
    
    function resizeSlider() {
        if (sliderViewport && sliderTrack) {
            const viewportWidth = sliderViewport.offsetWidth;
            slides.forEach((slide) => {
                slide.style.width = `${viewportWidth}px`;
            });
            updateSlider();
        }
    }
    
    window.addEventListener('resize', resizeSlider);
    
    function goToSlide(index) {
        if (isTransitioning || index === currentSlide || index < 0 || index >= totalSlides) return;
        currentSlide = index;
        updateSlider();
    }
    
    function nextSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
    });
    
    let autoSlideInterval;
    function startAutoSlide() {
        if (window.innerWidth <= 768) return;
        if (autoSlideInterval) return;
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    if (sliderViewport) {
        sliderViewport.addEventListener('mouseenter', stopAutoSlide);
        sliderViewport.addEventListener('mouseleave', startAutoSlide);
    }
    
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    
    if (sliderViewport) {
        sliderViewport.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            isDragging = true;
            stopAutoSlide();
        }, { passive: true });
        
        sliderViewport.addEventListener('touchmove', (e) => {
            if (isDragging) {
                touchEndX = e.touches[0].clientX;
            }
        }, { passive: true });
        
        sliderViewport.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            isDragging = false;
            touchStartX = 0;
            touchEndX = 0;
        }, { passive: true });
    }
    
    window.addEventListener('resize', () => {
        stopAutoSlide();
        if (window.innerWidth > 768) {
            startAutoSlide();
        }
    });
    
    createIndicators();
    updateSlider();
    startAutoSlide();
}

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initMatrix();
    initParticles();
    initNavigation();
    initStats();
    initMobileMenu();
    initParallax();
    initScrollEffects();
    initDirection();
    initHacksSlider();
});
