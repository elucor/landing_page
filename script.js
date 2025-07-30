// JavaScript para interactividad
document.addEventListener('DOMContentLoaded', function() {
    // Detectar si el dispositivo es táctil
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    
    // Añadir clase al body para estilos específicos
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    } else {
        document.body.classList.add('no-touch');
    }
    
    // Optimizar rendimiento en dispositivos móviles
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
        document.body.classList.add('reduced-motion');
    }
    // Navegación suave para los enlaces internos con optimización para móviles
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Cerrar menú móvil si está abierto (para futura implementación)
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
                
                // Usar requestAnimationFrame para mejor rendimiento
                const headerOffset = window.innerWidth <= 768 ? 70 : 100; // Offset menor en móviles
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Usar scrollTo con comportamiento suave, pero con fallback para navegadores antiguos
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: isReducedMotion ? 'auto' : 'smooth'
                    });
                } else {
                    // Fallback para navegadores que no soportan scrollBehavior
                    window.scrollTo(0, offsetPosition);
                }
            }
        });
    });
    
    // Funcionalidad para los botones de categorías
    const categoryButtons = document.querySelectorAll('.btn[data-category]');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            // Aquí puedes agregar la lógica para mostrar los productos de la categoría seleccionada
            console.log(`Categoría seleccionada: ${category}`);
            alert(`Has seleccionado la categoría: ${category}. ¡Pronto verás nuestra colección!`);
        });
    });
    
    // Animación suave para los botones
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Efecto de aparición al hacer scroll (optimizado para rendimiento)
    // Saltear animaciones si el usuario prefiere movimiento reducido
    if (!isReducedMotion) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            // Umbral más bajo para dispositivos móviles para cargar antes
            threshold: isTouchDevice ? 0.05 : 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Usar requestAnimationFrame para mejor rendimiento
                    requestAnimationFrame(() => {
                        entry.target.classList.add('visible');
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Reducir elementos animados en dispositivos móviles para mejor rendimiento
        const animatedElements = document.querySelectorAll(
            isTouchDevice ? 
            '.section-title, .about-text h3, .hero-content h1, .hero-image' : 
            '.category-card, .section-title, .about-text h3, .about-text p, .hero-content h1, .hero-content p, .hero-image'
        );
        
        // Aplicar animaciones con un pequeño retraso para mejorar el rendimiento inicial
        setTimeout(() => {
            animatedElements.forEach(el => {
                el.classList.add('fade-in');
                observer.observe(el);
            });
        }, 100);
    } else {
        // Si el usuario prefiere movimiento reducido, mostrar todo sin animaciones
        document.querySelectorAll('.category-card, .section-title, .about-text h3, .about-text p, .hero-content h1, .hero-content p, .hero-image')
            .forEach(el => el.classList.add('visible'));
    }
    
    // Añadir efecto hover a las imágenes de categoría (optimizado para táctil)
    const categoryImages = document.querySelectorAll('.category-image');
    categoryImages.forEach(img => {
        // Solo aplicar eventos de mouse en dispositivos no táctiles
        if (!isTouchDevice) {
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        } else {
            // En dispositivos táctiles, usar eventos touch
            const parentCard = img.closest('.category-card');
            if (parentCard) {
                parentCard.addEventListener('touchstart', function() {
                    this.classList.add('touch-active');
                }, { passive: true });
                
                parentCard.addEventListener('touchend', function() {
                    // Pequeño retraso para que se vea el efecto
                    setTimeout(() => {
                        this.classList.remove('touch-active');
                    }, 300);
                }, { passive: true });
            }
        }
    });

    // Validación mejorada para el formulario de contacto (optimizada para móviles)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Añadir validación en tiempo real para mejor UX en móviles
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        // Validar en tiempo real después de que el usuario termine de escribir
        inputs.forEach(input => {
            // Usar eventos optimizados para móviles
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            // Limpiar errores cuando el usuario comienza a escribir de nuevo
            input.addEventListener('input', function() {
                const formControl = this.parentElement;
                if (formControl.classList.contains('error')) {
                    clearError(this);
                }
            });
        });
        
        // Validación al enviar
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // Validar todos los campos
            if (!validateInput(nameInput)) isValid = false;
            if (!validateInput(emailInput)) isValid = false;
            if (!validateInput(messageInput)) isValid = false;
            
            if (isValid) {
                // Desactivar el botón para prevenir múltiples envíos
                const submitButton = contactForm.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = 'Enviando...';
                }
                
                // Enviar el formulario usando EmailJS
               ; // Reemplazar con tu Service ID de EmailJS
                const serviceID = 'service_wyjwbyu';
                const templateID = 'template_dpynewr';
 // Reemplazar con tu Template ID de EmailJS
                
                // Preparar los parámetros para la plantilla
                const templateParams = {
                    from_name: nameInput.value,
                    reply_to: emailInput.value,
                    message: messageInput.value
                };
                
                // Enviar el email
                emailjs.send(serviceID, templateID,templateParams)
                    .then(() => {
                        showNotification('¡Gracias por tu mensaje! Te contactaremos pronto.');
                        contactForm.reset();
                        
                        // Restaurar el botón
                        if (submitButton) {
                            submitButton.disabled = false;
                            submitButton.textContent = 'Enviar Mensaje';
                        }
                    }, function(error) {
                        console.log('FAILED...', error);
                        showNotification('Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.');
                        if (submitButton) {
                            submitButton.disabled = false;
                            submitButton.textContent = 'Enviar Mensaje';
                        }
                    });
            } else {
                // funcion para validar input
                
                showNotification('Por favor complete todos los campos');


                // Hacer scroll al primer error para móviles
                const firstError = contactForm.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Enfocar el input con error
                    const errorInput = firstError.querySelector('input, textarea');
                    if (errorInput) errorInput.focus();
                }
            }
        });
    }
    
    // Función para mostrar notificación amigable para móviles
    function showNotification(message) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Añadir al DOM
        document.body.appendChild(notification);
        
        // Mostrar con animación
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            // Eliminar del DOM después de la animación
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Función para validar un input individual
    function validateInput(input) {
        if (!input) return false;
        
        const value = input.value.trim();
        let isValid = true;
        
        switch(input.id) {
            case 'name':
                if (!value) {
                    showError(input, 'Por favor ingresa tu nombre');
                    isValid = false;
                } else {
                    clearError(input);
                }
                break;
                
            case 'email':
                if (!value) {
                    showError(input, 'Por favor ingresa tu email');
                    isValid = false;
                } else if (!isValidEmail(value)) {
                    showError(input, 'Por favor ingresa un email válido');
                    isValid = false;
                } else {
                    clearError(input);
                }
                break;
                
            case 'message':
                if (!value) {
                    showError(input, 'Por favor ingresa tu mensaje');
                    isValid = false;
                } else {
                    clearError(input);
                }
                break;
        }
        
        return isValid;
    }
    
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message') || document.createElement('div');
        
        if (!formControl.querySelector('.error-message')) {
            errorElement.className = 'error-message';
            formControl.appendChild(errorElement);
        }
        
        errorElement.innerText = message;
        formControl.classList.add('error');
    }
    
    function clearError(input) {
        const formControl = input.parentElement;
        formControl.classList.remove('error');
        const errorElement = formControl.querySelector('.error-message');
        if (errorElement) {
            errorElement.innerText = '';
        }
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});