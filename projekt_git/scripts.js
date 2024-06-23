document.addEventListener('DOMContentLoaded', function () {
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const items = document.querySelectorAll('.carousel-item');
  const sections = document.querySelectorAll('section');
  const clockElement = document.getElementById('clock');
  const scrollToTopButton = document.getElementById('scrollToTop');
  let currentIndex = 0;

  function showCurrentItem() {
      items.forEach(item => item.classList.remove('active'));
      items[currentIndex].classList.add('active');
  }

  function changeItem(direction) {
      currentIndex = (currentIndex + direction + items.length) % items.length;
      showCurrentItem();
  }

  function checkVisibleSections() {
      const windowHeight = window.innerHeight;
      sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          if (rect.top < windowHeight && rect.bottom > 0) {
              section.classList.add('visible');
          } else {
              section.classList.remove('visible');
          }
      });
  }

  function updateClock() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  }

  function handleScroll() {
      const initialSection = document.querySelector('#strona-glowna');
      const rect = initialSection.getBoundingClientRect();
      if (rect.bottom < 0) {
          scrollToTopButton.classList.add('show');
      } else {
          scrollToTopButton.classList.remove('show');
      }
      checkVisibleSections();
  }

  function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  prevButton.addEventListener('click', () => changeItem(-1));
  nextButton.addEventListener('click', () => changeItem(1));
  window.addEventListener('scroll', handleScroll);
  scrollToTopButton.addEventListener('click', scrollToTop);

  showCurrentItem();
  checkVisibleSections();
  updateClock();
  setInterval(updateClock, 1000);
  handleScroll();
});

function validateForm() {
  const imie = document.getElementById('imie').value;
  const nazwisko = document.getElementById('nazwisko').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (imie === "" || nazwisko === "" || email === "" || message === "") {
      alert("Wszystkie pola muszą być wypełnione.");
      return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
      alert("Proszę podać poprawny adres email.");
      return false;
  }

  if (message.length > 100) {
      alert("Treść wiadomości nie może przekraczać 100 znaków.");
      return false;
  }

  return true;
}
