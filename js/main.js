// Main JavaScript file for D SAILESH KUMAR's portfolio

class Portfolio {
    constructor() {
        this.init();
    }

    async init() {
        // Initialize theme
        this.initTheme();
        
        // Initialize navigation
        this.initNavigation();
        
        // Initialize contact form
        this.initContactForm();
        
        // Initialize tooltips
        this.initTooltips();
        
        // Load content
        await this.loadContent();
        
        // Initialize WebGL background
        this.initWebGL();
        
        // Initialize smooth scrolling
        this.initSmoothScrolling();
    }

    // Theme Management
    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
        
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const themeIcon = document.getElementById('themeIcon');
        if (theme === 'dark') {
            themeIcon.className = 'bi bi-sun-fill';
        } else {
            themeIcon.className = 'bi bi-moon-fill';
        }
    }

    // Navigation
    initNavigation() {
        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasNavbar'));
                    if (offcanvas) {
                        offcanvas.hide();
                    }
                }
            });
        });

        // Active navigation highlighting
        this.initActiveNavigation();
    }

    initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all nav links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to current section's nav link
                    const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, {
            rootMargin: '-50% 0px -50% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    initSmoothScrolling() {
        // Ensure smooth scrolling works properly
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    // Contact Form
    initContactForm() {
        const form = document.getElementById('contactForm');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm(form)) {
                this.handleFormSubmission(form);
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        form.classList.add('was-validated');
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        if (field.hasAttribute('required') && !value) {
            isValid = false;
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }

        // Update field state
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
        }

        return isValid;
    }

    handleFormSubmission(form) {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Reset form
            form.reset();
            form.classList.remove('was-validated');
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success modal
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
        }, 2000);
    }

    // Tooltips
    initTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Content Loading
    async loadContent() {
        try {
            // Load skills
            this.loadSkills();
            
            // Load projects
            await this.loadProjects();
            
            // Load certificates
            await this.loadCertificates();
            
        } catch (error) {
            console.error('Error loading content:', error);
        }
    }

    loadSkills() {
        const skills = [
            { name: 'HTML', level: 'Advanced', icon: 'bi bi-filetype-html' },
            { name: 'CSS', level: 'Advanced', icon: 'bi bi-filetype-css' },
            { name: 'JavaScript', level: 'Intermediate', icon: 'bi bi-filetype-js' },
            { name: 'Node.js', level: 'Intermediate', icon: 'bi bi-server' },
            { name: 'Express.js', level: 'Intermediate', icon: 'bi bi-lightning-fill' },
            { name: 'MongoDB', level: 'Beginner', icon: 'bi bi-database' },
            { name: 'React', level: 'Beginner', icon: 'bi bi-circle' },
            { name: 'Git', level: 'Intermediate', icon: 'bi bi-git' }
        ];

        const skillsContainer = document.getElementById('webSkills');
        skillsContainer.innerHTML = skills.map(skill => `
            <div class="skill-item">
                <div class="skill-icon">
                    <i class="${skill.icon}"></i>
                </div>
                <div class="skill-info">
                    <h4>${skill.name}</h4>
                    <div class="skill-level">${skill.level}</div>
                </div>
            </div>
        `).join('');
    }

    async loadProjects() {
        try {
            const response = await fetch('data/projects.json');
            const projects = await response.json();
            this.renderProjects(projects);
        } catch (error) {
            console.error('Error loading projects:', error);
            // Load fallback projects
            this.renderProjects(this.getFallbackProjects());
        }
    }

    renderProjects(projects) {
        const projectsContainer = document.getElementById('projectsContainer');
        projectsContainer.innerHTML = projects.map(project => `
            <div class="col-lg-4 col-md-6">
                <div class="project-card" tabindex="0">
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}" loading="lazy">
                        <div class="project-overlay">
                            <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="overlay-btn" aria-label="View live demo for ${project.title}">
                                <i class="bi bi-box-arrow-up-right"></i>
                            </a>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-links">
                            <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                                <i class="bi bi-box-arrow-up-right me-2"></i>Live Demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getFallbackProjects() {
        return [
            {
                title: "HTML IN MY STYLE",
                image: "./html.png",
                description: "A personal portfolio website built with HTML, CSS, and JavaScript, showcasing my skills and projects.",
                live: "https://techinmystyle.com/html%20in%20my%20style/"
            },
            {
                title: "CSS IN MY STYLE",
                image: "./css.png",
                description: "A responsive and visually appealing portfolio website using advanced CSS techniques and animations.",
                live: "https://techinmystyle.com/css%20in%20my%20style/"
            },
            {
                title: "JavaScript IN MY STYLE",
                image: "./js.png",
                description: "A dynamic portfolio website with interactive features and animations using JavaScript and DOM manipulation.",
 
                live: "https://techinmystyle.com/javascript%20in%20my%20style%20-%20basic/"
            }
        ];
    }

    async loadCertificates() {
        try {
            const response = await fetch('data/certificates.json');
            const certificates = await response.json();
            this.renderCertificates(certificates);
        } catch (error) {
            console.error('Error loading certificates:', error);
            // Load fallback certificates
            this.renderCertificates(this.getFallbackCertificates());
        }
    }

    renderCertificates(certificates) {
        const certificatesContainer = document.getElementById('certificatesContainer');
        certificatesContainer.innerHTML = certificates.map(cert => `
            <div class="col-lg-4 col-md-6">
                <div class="certificate-item">
                    <img src="${cert.thumbnail}" 
                         alt="${cert.title}" 
                         class="certificate-thumbnail" 
                         loading="lazy"
                         onclick="window.open('${cert.url}', '_blank', 'noopener,noreferrer')"
                         onkeydown="if(event.key==='Enter'||event.key===' ')window.open('${cert.url}','_blank','noopener,noreferrer')"
                         tabindex="0"
                         role="button"
                         aria-label="View certificate: ${cert.title}">
                </div>
            </div>
        `).join('');
    }

    getFallbackCertificates() {
        return [
            {
                title: "HTML IN MY STYLE",
                thumbnail: "./html.png",
                url: "https://freecodecamp.org/certification/sailesh/javascript-algorithms-and-data-structures"
            },
            {
                title: "Responsive Web Design",
                thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
                url: "https://freecodecamp.org/certification/sailesh/responsive-web-design"
            },
            {
                title: "Node.js Fundamentals",
                thumbnail: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600",
                url: "https://coursera.org/verify/nodejs-fundamentals-sailesh"
            },
            {
                title: "MongoDB Basics",
                thumbnail: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600",
                url: "https://university.mongodb.com/verify/mongodb-basics-sailesh"
            }
        ];
    }

    // WebGL Background
    initWebGL() {
        // Check if device supports WebGL and is not mobile
        if (!this.shouldEnableWebGL()) {
            return;
        }

        try {
            this.setupWebGL();
            this.initAnimationToggle();
        } catch (error) {
            console.error('WebGL initialization failed:', error);
        }
    }

    shouldEnableWebGL() {
        // Disable on mobile devices for performance
        const isMobile = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
        
        // Check hardware concurrency (number of CPU cores)
        const hasGoodHardware = navigator.hardwareConcurrency >= 4;
        
        // Check if WebGL is supported
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        return !isMobile && hasGoodHardware && gl;
    }

    setupWebGL() {
        const canvas = document.getElementById('webgl-background');
        
        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        
        // Create particles
        this.createParticles();
        
        // Position camera
        this.camera.position.z = 5;
        
        // Start animation
        this.animationId = null;
        this.isAnimating = true;
        this.animate();
        
        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    createParticles() {
        const particleCount = 50; // Reduced for performance
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Random positions
            positions[i3] = (Math.random() - 0.5) * 10;
            positions[i3 + 1] = (Math.random() - 0.5) * 10;
            positions[i3 + 2] = (Math.random() - 0.5) * 10;
            
            // Colors (blue/purple theme)
            colors[i3] = 0.4 + Math.random() * 0.3; // R
            colors[i3 + 1] = 0.4 + Math.random() * 0.4; // G  
            colors[i3 + 2] = 0.8 + Math.random() * 0.2; // B
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.6
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    animate() {
        if (!this.isAnimating) return;
        
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Rotate particles slowly
        if (this.particles) {
            this.particles.rotation.x += 0.0005;
            this.particles.rotation.y += 0.001;
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) return;
        
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    initAnimationToggle() {
        const toggleBtn = document.getElementById('animationToggle');
        
        toggleBtn.addEventListener('click', () => {
            this.isAnimating = !this.isAnimating;
            
            if (this.isAnimating) {
                this.animate();
                toggleBtn.innerHTML = '<i class="bi bi-pause-fill"></i><span>Pause Animation</span>';
                document.body.classList.remove('webgl-paused');
            } else {
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                }
                toggleBtn.innerHTML = '<i class="bi bi-play-fill"></i><span>Resume Animation</span>';
                document.body.classList.add('webgl-paused');
            }
        });
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Service worker registration for better performance (optional)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}