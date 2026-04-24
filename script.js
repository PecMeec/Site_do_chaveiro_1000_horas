// ============================================
// BANNER SLIDESHOW
// ============================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showNextSlide() {
  if (totalSlides === 0) return;
  
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % totalSlides;
  slides[currentSlide].classList.add('active');
}

// Auto-advance slides a cada 5 segundos
if (totalSlides > 0) {
  setInterval(showNextSlide, 5000);
}

// ============================================
// RELÓGIO COM EMOJIS (24h)
// ============================================
const relogio = document.getElementById('relogio');
if (relogio) {
  const emojisRelogio = ['🕐','🕑','🕒','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚','🕛'];
  let indexRelogio = 0;

  setInterval(() => {
    relogio.textContent = emojisRelogio[indexRelogio];
    indexRelogio = (indexRelogio + 1) % emojisRelogio.length;
  }, 300);
}

// ============================================
// TRANSPARÊNCIA NA BARRA AO ROLAR
// ============================================
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ============================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ============================================
// RASTREAMENTO DE EVENTOS PARA GOOGLE ADS
// ============================================
function trackEvent(eventName, eventData = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventData);
  }
}

// Rastrear cliques nos botões CTA
document.querySelectorAll('.cta-btn, .cta-btn-secondary').forEach(btn => {
  btn.addEventListener('click', function() {
    const text = this.textContent.trim();
    if (text.includes('WhatsApp')) {
      trackEvent('click_whatsapp_cta', { location: 'banner' });
    } else if (text.includes('Ligar')) {
      trackEvent('click_call_cta', { location: 'banner' });
    }
  });
});

// Rastrear cliques no botão WhatsApp flutuante
const whatsappBtn = document.querySelector('.whatsapp');
if (whatsappBtn) {
  whatsappBtn.addEventListener('click', function() {
    trackEvent('click_whatsapp_floating');
  });
}

// ============================================
// OTIMIZAÇÃO DE IMAGENS (LAZY LOADING)
// ============================================
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

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// ANIMAÇÃO DE ENTRADA PARA ELEMENTOS
// ============================================
function animateOnScroll() {
  const elements = document.querySelectorAll('.card, .testimonial, .info-box');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideIn 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', animateOnScroll);

// ============================================
// MONITORAMENTO DE PERFORMANCE
// ============================================
if (window.performance && window.performance.timing) {
  window.addEventListener('load', function() {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    // Enviar métrica para Google Analytics (opcional)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_load_time', {
        'value': pageLoadTime,
        'event_category': 'performance'
      });
    }
  });
}

// ============================================
// MOBILE MENU TOGGLE (se necessário no futuro)
// ============================================
// Placeholder para expansão futura

console.log('✓ Script carregado com sucesso');

// ============================================
// FORMULARIO DE ORCAMENTO
// ============================================
const formOrcamento = document.getElementById('form-orcamento');
if (formOrcamento) {
  formOrcamento.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const servico = document.getElementById('servico').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    
    // Validacao basica
    if (!nome || !telefone || !servico) {
      alert('Por favor, preencha todos os campos obrigatorios!');
      return;
    }
    
    // Rastrear evento no Google Ads
    trackEvent('form_submission', {
      'service': servico,
      'has_message': mensagem ? 'yes' : 'no'
    });
    
    // Montar mensagem para WhatsApp
    const mensagemWhatsApp = `Ola! Gostaria de solicitar um orcamento.%0A%0ANome: ${nome}%0ATelefone: ${telefone}%0AServico: ${servico}${mensagem ? `%0ADetalhes: ${mensagem}` : ''}`;
    const urlWhatsApp = `https://wa.me/5511948518746?text=${mensagemWhatsApp}`;
    
    // Abrir WhatsApp em nova aba
    window.open(urlWhatsApp, '_blank');
    
    // Limpar formulario
    formOrcamento.reset();
    
    // Mostrar mensagem de sucesso
    alert('Orcamento enviado com sucesso! Entraremos em contato em breve.');
  });
}
