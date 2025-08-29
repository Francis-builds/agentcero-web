/* ===================================
   AgentCero - Interactive JavaScript
   =================================== */

// Demo Chat Functionality
class AgentCeroDemo {
    constructor() {
        this.scenarios = {
            support: {
                name: 'Soporte al Cliente',
                responses: [
                    'Hola, soy AgentCero. ¿En qué puedo ayudarte con tu consulta de soporte?',
                    'Entiendo tu problema. Permíteme revisar tu cuenta y encontrar una solución.',
                    'He encontrado el problema. Te voy a transferir con un especialista técnico.',
                    'Perfecto, hemos resuelto tu consulta. ¿Hay algo más en lo que pueda ayudarte?'
                ]
            },
            sales: {
                name: 'Ventas',
                responses: [
                    'Hola, soy AgentCero. Me da mucho gusto contactarte para hablar sobre nuestras soluciones.',
                    'Basado en tu perfil, creo que nuestro plan Professional sería ideal para tu empresa.',
                    '¿Te gustaría agendar una demo personalizada para ver cómo podemos ayudarte?',
                    'Excelente, he agendado tu demo para mañana a las 2 PM. Te envío la confirmación por email.'
                ]
            },
            appointments: {
                name: 'Citas Médicas',
                responses: [
                    'Hola, soy AgentCero de la Clínica San José. ¿En qué puedo ayudarte con tu cita?',
                    'Perfecto, veo que necesitas una cita con cardiología. Tengo disponibilidad el viernes.',
                    'Te he agendado para el viernes 15 de marzo a las 10:00 AM con el Dr. González.',
                    '¿Te parece bien si te envío un recordatorio por SMS 24 horas antes de tu cita?'
                ]
            }
        };
        
        this.currentScenario = 'support';
        this.messageIndex = 0;
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupIntersectionObserver();
        this.startMetricsAnimation();
    }
    
    bindEvents() {
        // Scenario buttons
        document.querySelectorAll('.scenario-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchScenario(e.target.dataset.scenario);
            });
        });
        
        // Chat input
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendMessage');
        
        if (chatInput && sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
        
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Mobile menu toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
        
        // ROI Calculator
        const calculatorBtn = document.getElementById('openCalculator');
        if (calculatorBtn) {
            calculatorBtn.addEventListener('click', () => {
                this.openROICalculator();
            });
        }
        
        // FAQ Accordion
        this.setupFAQ();
        
        // Contact Form
        this.setupContactForm();
    }
    
    switchScenario(scenario) {
        this.currentScenario = scenario;
        this.messageIndex = 0;
        
        // Update active button
        document.querySelectorAll('.scenario-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-scenario="${scenario}"]`).classList.add('active');
        
        // Reset chat
        this.resetChat();
        
        // Start new scenario
        setTimeout(() => {
            this.addAIMessage(this.scenarios[scenario].responses[0]);
        }, 500);
    }
    
    resetChat() {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
        }
    }
    
    sendMessage() {
        const chatInput = document.getElementById('chatInput');
        if (!chatInput || !chatInput.value.trim()) return;
        
        const message = chatInput.value.trim();
        this.addUserMessage(message);
        chatInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            this.messageIndex++;
            const responses = this.scenarios[this.currentScenario].responses;
            if (this.messageIndex < responses.length) {
                this.addAIMessage(responses[this.messageIndex]);
            } else {
                this.addAIMessage('¡Gracias por probar AgentCero! ¿Te gustaría agendar una demo real?');
            }
            this.updateMetrics();
        }, 1000 + Math.random() * 1000);
    }
    
    addUserMessage(message) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user';
        messageDiv.innerHTML = `
            <div class="message-avatar">👤</div>
            <div class="message-content">${message}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    addAIMessage(message) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message ai';
        messageDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">${message}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    updateMetrics() {
        // Simulate real-time metrics updates
        const responseTime = document.getElementById('responseTime');
        const satisfaction = document.getElementById('satisfaction');
        const resolution = document.getElementById('resolution');
        
        if (responseTime) {
            const time = (0.5 + Math.random() * 1).toFixed(1);
            responseTime.textContent = `${time}s`;
        }
        
        if (satisfaction) {
            const sat = (95 + Math.random() * 4).toFixed(0);
            satisfaction.textContent = `${sat}%`;
        }
        
        if (resolution) {
            const res = (90 + Math.random() * 8).toFixed(0);
            resolution.textContent = `${res}%`;
        }
    }
    
    startMetricsAnimation() {
        // Animate metrics every 3 seconds
        setInterval(() => {
            this.updateMetrics();
        }, 3000);
    }
    
    setupIntersectionObserver() {
        // Premium scroll animations - Framer style
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation delays
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                        
                        // Animate counters
                        if (entry.target.classList.contains('stat-number')) {
                            this.animateCounter(entry.target);
                        }
                        
                        // Add shimmer effect to premium elements
                        if (entry.target.classList.contains('service-card') || 
                            entry.target.classList.contains('pricing-card')) {
                            entry.target.classList.add('shimmer');
                            setTimeout(() => {
                                entry.target.classList.remove('shimmer');
                            }, 2000);
                        }
                    }, index * 100);
                }
            });
        }, observerOptions);
        
        // Observe elements with different animation classes
        document.querySelectorAll('.service-card').forEach((el, index) => {
            el.classList.add('scroll-reveal');
            if (index % 2 === 0) {
                el.classList.add('scroll-reveal-left');
            } else {
                el.classList.add('scroll-reveal-right');
            }
            observer.observe(el);
        });
        
        document.querySelectorAll('.process-step').forEach(el => {
            el.classList.add('scroll-reveal-scale');
            observer.observe(el);
        });
        
        document.querySelectorAll('.pricing-card').forEach((el, index) => {
            el.classList.add('scroll-reveal');
            observer.observe(el);
        });
        
        document.querySelectorAll('.testimonial-card').forEach((el, index) => {
            el.classList.add('scroll-reveal');
            if (index % 2 === 0) {
                el.classList.add('scroll-reveal-left');
            } else {
                el.classList.add('scroll-reveal-right');
            }
            observer.observe(el);
        });
        
        document.querySelectorAll('.stat-number').forEach(el => {
            el.classList.add('scroll-reveal-scale');
            observer.observe(el);
        });
        
        // Setup parallax effects
        this.setupParallax();
    }
    
    setupParallax() {
        // Framer-style parallax scrolling
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-element');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };
        
        const requestParallaxUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestParallaxUpdate);
    }
    
    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const originalText = element.textContent;
            const prefix = originalText.match(/[^\d]*/)[0];
            const suffix = originalText.match(/[^\d]*$/)[0];
            
            element.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        }, 16);
    }
    
    openROICalculator() {
        // Create modal for ROI calculator
        const modal = document.createElement('div');
        modal.className = 'roi-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Calculadora de ROI</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="roi-form">
                        <div class="form-group">
                            <label>Número de empleados en atención al cliente:</label>
                            <input type="number" id="employees" min="1" value="5">
                        </div>
                        <div class="form-group">
                            <label>Costo promedio mensual por empleado (USD):</label>
                            <input type="number" id="cost" min="1000" value="3000">
                        </div>
                        <div class="form-group">
                            <label>Consultas mensuales aproximadas:</label>
                            <input type="number" id="queries" min="100" value="5000">
                        </div>
                        <div class="form-group">
                            <label>Horas promedio por consulta:</label>
                            <input type="number" id="hours" min="0.1" step="0.1" value="0.5">
                        </div>
                        <button type="submit" class="btn btn-primary">Calcular ROI</button>
                    </form>
                    <div class="roi-results" style="display: none;">
                        <h4>Resultados:</h4>
                        <div class="result-item">
                            <span class="result-label">Costo actual mensual:</span>
                            <span class="result-value" id="currentCost"></span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Costo con AgentCero:</span>
                            <span class="result-value" id="agentCeroCost"></span>
                        </div>
                        <div class="result-item highlight">
                            <span class="result-label">Ahorro mensual:</span>
                            <span class="result-value" id="monthlySavings"></span>
                        </div>
                        <div class="result-item highlight">
                            <span class="result-label">ROI anual:</span>
                            <span class="result-value" id="annualROI"></span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Bind modal events
        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        modal.querySelector('.roi-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateROI();
        });
    }
    
    calculateROI() {
        const employees = parseInt(document.getElementById('employees').value);
        const cost = parseInt(document.getElementById('cost').value);
        const queries = parseInt(document.getElementById('queries').value);
        const hours = parseFloat(document.getElementById('hours').value);
        
        const currentCost = employees * cost;
        const agentCeroCost = Math.min(queries <= 10000 ? 2999 : queries <= 50000 ? 5999 : 8999);
        const monthlySavings = currentCost - agentCeroCost;
        const annualROI = ((monthlySavings * 12) / (agentCeroCost * 12)) * 100;
        
        // Display results
        document.getElementById('currentCost').textContent = `$${currentCost.toLocaleString()}`;
        document.getElementById('agentCeroCost').textContent = `$${agentCeroCost.toLocaleString()}`;
        document.getElementById('monthlySavings').textContent = `$${monthlySavings.toLocaleString()}`;
        document.getElementById('annualROI').textContent = `${annualROI.toFixed(0)}%`;
        
        document.querySelector('.roi-results').style.display = 'block';
    }
    
    setupFAQ() {
        // FAQ Accordion functionality
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }
    
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const formSuccess = contactForm.querySelector('.form-success');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'block';
            submitBtn.disabled = true;
            
            // Collect form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                // Simulate API call (replace with actual endpoint)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Log form data (replace with actual API call)
                console.log('Form submitted:', data);
                
                // Optional: Send to analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        event_category: 'contact',
                        event_label: data['use-case'] || 'general'
                    });
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo o contáctanos directamente.');
            } finally {
                // Reset button state
                btnText.style.display = 'block';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
        
        // Demo and consultancy buttons
        const scheduleDemoBtn = document.getElementById('scheduleDemo');
        const consultancyBtn = document.getElementById('consultancy');
        
        if (scheduleDemoBtn) {
            scheduleDemoBtn.addEventListener('click', () => {
                // Pre-fill form for demo request
                this.prefillContactForm('demo');
                document.getElementById('contactForm').scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        if (consultancyBtn) {
            consultancyBtn.addEventListener('click', () => {
                // Pre-fill form for consultancy
                this.prefillContactForm('consultancy');
                document.getElementById('contactForm').scrollIntoView({ behavior: 'smooth' });
            });
        }
    }
    
    prefillContactForm(type) {
        const messageField = document.getElementById('message');
        if (!messageField) return;
        
        const messages = {
            demo: 'Hola, me interesa agendar una demo personalizada de AgentCero para mi empresa. ¿Cuándo podríamos coordinar una llamada?',
            consultancy: 'Hola, me gustaría recibir una consultoría gratuita sobre cómo AgentCero puede ayudar a optimizar nuestro contact center. ¿Podemos agendar una llamada?'
        };
        
        messageField.value = messages[type] || '';
        messageField.focus();
    }
}

// Header scroll effect
class HeaderEffects {
    constructor() {
        this.header = document.querySelector('.header');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }

    init() {
        if (!this.header) return;
        
        window.addEventListener('scroll', () => {
            this.handleHeaderScroll();
            this.handleScrollSpy();
        });
    }

    handleHeaderScroll() {
        if (window.scrollY > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }

    handleScrollSpy() {
        const scrollPosition = window.scrollY + 200; // Offset for header height
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                this.navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AgentCeroDemo();
    new HeaderEffects();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Add some CSS for the ROI modal and loading states
const additionalCSS = `
.roi-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.modal-content {
    background: rgba(10, 10, 10, 0.95);
    border: 1px solid #5941a9;
    border-radius: 16px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
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
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.3s ease;
}

.modal-close:hover {
    color: white;
}

.modal-body {
    padding: 1.5rem;
    color: white;
}

.roi-form .form-group {
    margin-bottom: 1rem;
}

.roi-form label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
}

.roi-form input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    color: white;
    font-size: 1rem;
}

.roi-form input:focus {
    outline: none;
    border-color: #5941a9;
    background: rgba(255, 255, 255, 0.1);
}

.roi-results {
    margin-top: 2rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
}

.result-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding: 0.5rem 0;
}

.result-item.highlight {
    font-weight: 600;
    color: #0066CC;
    border-top: 1px solid #dee2e6;
    padding-top: 1rem;
    margin-top: 1rem;
}

.header.scrolled {
    background: transparent;
    box-shadow: none;
}

body.loaded {
    opacity: 1;
}

@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 80px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 80px);
        background: white;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        padding-top: 2rem;
        transition: left 0.3s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .demo-container {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .hero-metrics {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .credibility-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .process-timeline {
        grid-template-columns: 1fr;
    }
    
    .pricing-grid {
        grid-template-columns: 1fr;
    }
    
    .pricing-card.featured {
        transform: none;
    }
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
