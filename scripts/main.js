    const buttons = document.querySelectorAll('.complete-btn');
  
    buttons.forEach((btn, index) => {
      const icon = btn.querySelector('i');
      const card = btn.parentElement;
      const saved = localStorage.getItem('progress-' + index);
  
      // Al cargar la página
      if (saved === 'completed') {
        icon.classList.remove('fa-square');
        icon.classList.add('fa-square-check', 'fa-bounce');
        btn.classList.add('completed');
        card.classList.add('completed'); // importante
      }
  
      // Al hacer clic
      btn.addEventListener('click', () => {
        const isCompleted = icon.classList.contains('fa-square-check');
  
        if (isCompleted) {
          // Desmarcar
          icon.classList.remove('fa-square-check', 'fa-bounce');
          icon.classList.add('fa-square');
          btn.classList.remove('completed');
          card.classList.remove('completed'); // importante
          localStorage.setItem('progress-' + index, 'incomplete');
        } else {
          // Marcar como completado
          icon.classList.remove('fa-square');
          icon.classList.add('fa-square-check', 'fa-bounce');
          btn.classList.add('completed');
          card.classList.add('completed'); // importante
          localStorage.setItem('progress-' + index, 'completed');
        }
      });
    });

    const body = document.body;
    const toggleBtn = document.getElementById('toggle-mode-btn');
  
    // Inicializar modo basado en localStorage o preferencia del sistema
    const savedMode = localStorage.getItem('modo');
    if (savedMode) {
      body.classList.add(savedMode);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      body.classList.add(prefersDark ? 'modo-oscuro' : 'modo-claro');
    }
  
    toggleBtn.addEventListener('click', () => {
      if (body.classList.contains('modo-oscuro')) {
        body.classList.replace('modo-oscuro', 'modo-claro');
        localStorage.setItem('modo', 'modo-claro');
        toggleBtn.textContent = '🌙 Cambiar modo';
      } else {
        body.classList.replace('modo-claro', 'modo-oscuro');
        localStorage.setItem('modo', 'modo-oscuro');
        toggleBtn.textContent = '☀️ Cambiar modo';
      }
    });

    // Inicializar el texto del botón al cargar
    if (body.classList.contains('modo-oscuro')) {
      toggleBtn.textContent = '☀️ Cambiar modo';
    } else {
      toggleBtn.textContent = '🌙 Cambiar modo';
    }

    // En tu archivo main.js, añade esto:

// Función para manejar el scroll suave con polyfill para Safari
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Event listeners para los enlaces de las cards
document.querySelectorAll('.card-content-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = this.getAttribute('href');
    smoothScrollTo(target);
    
    // Opcional: Añadir clase activa a la sección destino
    document.querySelectorAll('section').forEach(section => {
      section.classList.remove('active-section');
    });
    document.querySelector(target).classList.add('active-section');
  });
});

// Polyfill para Safari (opcional)
if (!('scrollBehavior' in document.documentElement.style)) {
  import('smoothscroll-polyfill').then(module => {
    module.polyfill();
  });
}