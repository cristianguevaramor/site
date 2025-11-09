       /*
        Script principal: agrupa todas las funcionalidades (acordeones, tema, video, animaciones)
        dentro de un objeto app para mantener el código modular y ordenado. 
        */
   const app = {
            init() {
            // Se agrupan las inicializaciones al cargar el DOM.
                this.setupAccordions();
                this.setupThemeToggle();
                this.setupVideoModal();
                this.animateQualityBars();
            },

            // Acordeones para mostrar/ocultar contenido teórico sin saturar la vista.
            setupAccordions() {
                document.querySelectorAll('.accordion').forEach(accordion => {
                    accordion.querySelector('.accordion-header').addEventListener('click', () => {
                        accordion.classList.toggle('active');
                    });
                });
            },

            // Modo oscuro persistente usando localStorage.
            setupThemeToggle() {
                const toggle = document.getElementById('themeToggle');
                const icon = document.getElementById('themeIcon');
                const text = document.getElementById('themeText');
                
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'dark') {
                    document.body.classList.add('dark-mode');
                    icon.textContent = '☀️';
                    text.textContent = 'Claro';
                }

                toggle.addEventListener('click', () => {
                    document.body.classList.toggle('dark-mode');
                    
                    if (document.body.classList.contains('dark-mode')) {
                        icon.textContent = '☀️';
                        text.textContent = 'Claro';
                        localStorage.setItem('theme', 'dark');
                    } else {
                        icon.textContent = '🌙';
                        text.textContent = 'Oscuro';
                        localStorage.setItem('theme', 'light');
                    }
                });
            },

            // Muestra un video embebido sin redirigir al usuario fuera de la página.
            setupVideoModal() {
                const modal = document.getElementById('videoModal');
                const btn = document.getElementById('btnVideo');
                const close = document.getElementById('closeModal');
                const frame = document.getElementById('videoFrame');

                btn.addEventListener('click', () => {
                    modal.style.display = 'block';
                    frame.src = 'https://www.youtube.com/embed/sAwr1dAJ-sk';
                });

                const closeModal = () => {
                    modal.style.display = 'none';
                    frame.src = '';
                };

                close.addEventListener('click', closeModal);
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) closeModal();
                });
            },

            // Anima las barras de evaluación al ser visibles.
            animateQualityBars() {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const fills = entry.target.querySelectorAll('.quality-fill');
                            fills.forEach((fill, index) => {
                                const score = fill.getAttribute('data-score');
                                // Inicia en 0%
                                fill.style.width = '0%';
                                
                                // Anima con delay escalonado para cada barra
                                setTimeout(() => {
                                    fill.style.width = score + '%';
                                    fill.textContent = score + '%';
                                }, 200 + (index * 150));
                            });
                            observer.unobserve(entry.target);
                        }
                    });
                });

                const evalSection = document.querySelector('.evaluation-container');
                if (evalSection) observer.observe(evalSection);
            }
        };


        document.addEventListener('DOMContentLoaded', () => app.init());


