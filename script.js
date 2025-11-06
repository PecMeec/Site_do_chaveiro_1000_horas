// Banner slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showNextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

setInterval(showNextSlide, 4000);

// Relógio com emojis
const relogio = document.getElementById('relogio');
const emojisRelogio = ['🕐','🕑','🕒','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚','🕛'];
let indexRelogio = 0;

setInterval(() => {
  relogio.textContent = emojisRelogio[indexRelogio];
  indexRelogio = (indexRelogio + 1) % emojisRelogio.length;
}, 300);

// Transparência na barra ao rolar
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});