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

const toggleBtn = document.getElementById('toggle-mode-btn');

toggleBtn.addEventListener('click', () => {
  const body = document.body;
  body.classList.toggle('modo-oscuro');
  body.classList.toggle('modo-claro');

  // Guarda el modo actual en localStorage (opcional)
  const modoActual = body.classList.contains('modo-oscuro') ? 'modo-oscuro' : 'modo-claro';
  localStorage.setItem('modo', modoActual);
});

// Al cargar, aplica el modo guardado
window.addEventListener('DOMContentLoaded', () => {
  const modoGuardado = localStorage.getItem('modo') || 'modo-claro';
  document.body.classList.add(modoGuardado);
});


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

// Reemplazar la función existente del event listener
document.querySelectorAll('.card-content-link').forEach(link => {
link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = this.getAttribute('href');
    
    // Remover clase activa de todas las secciones
    document.querySelectorAll('section').forEach(section => {
    section.classList.remove('active-section');
    // Resetear estilos inmediatamente
    section.style.outline = '';
    section.style.marginLeft = '';
    section.style.marginRight = '';
    });
    
    // Aplicar a la sección destino
    const targetSection = document.querySelector(target);
    targetSection.classList.add('active-section');
    
    // Scroll suave
    setTimeout(() => {
    targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    }, 50); // Pequeño delay para permitir que la animación CSS comience
    
    // Eliminar la clase después de la animación
    setTimeout(() => {
    targetSection.classList.remove('active-section');
    }, 2500); // Igual a la duración de la animación
});
});

// Botón "Volver arriba"
const backToTopButton = document.getElementById('back-to-top');

// Mostrar/ocultar botón al hacer scroll
window.addEventListener('scroll', () => {
if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
} else {
    backToTopButton.classList.remove('visible');
}
});

// Scroll suave al hacer clic
backToTopButton.addEventListener('click', () => {
window.scrollTo({
    top: 0,
    behavior: 'smooth'
});

// Feedback visual opcional
backToTopButton.classList.add('clicked');
setTimeout(() => {
    backToTopButton.classList.remove('clicked');
}, 300);
});