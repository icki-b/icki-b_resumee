document.addEventListener('DOMContentLoaded', function () {
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const items = document.querySelectorAll('.carousel-item');
  const sections = document.querySelectorAll('section');
  const clockElement = document.getElementById('clock');
  const scrollToTopButton = document.getElementById('scrollToTop');
  let currentIndex = 0;
  const intervalTime = 4000; // 4 seconds

  const colors = [
    '#2c3e50', // color for section 1
    '#34495e', // color for section 2
    '#1f2a38', // color for section 3
    '#22303c'  // color for section 4
  ];

  function interpolateColor(color1, color2, factor) {
    const hex = (x) => x.toString(16).padStart(2, '0');
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);
    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);
    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));
    return `#${hex(r)}${hex(g)}${hex(b)}`;
  }

  function handleScroll() {
    const scrollY = window.scrollY;
    const sectionHeight = window.innerHeight;
    const totalSections = sections.length;
    let sectionIndex = Math.floor(scrollY / sectionHeight);
    if (sectionIndex >= totalSections - 1) {
      sectionIndex = totalSections - 2;
    }
    const factor = (scrollY % sectionHeight) / sectionHeight;
    const startColor = colors[sectionIndex % colors.length];
    const endColor = colors[(sectionIndex + 1) % colors.length];
    document.body.style.backgroundColor = interpolateColor(startColor, endColor, factor);

    // Show or hide scroll to top button
    if (scrollY > sectionHeight) {
      scrollToTopButton.classList.add('show');
    } else {
      scrollToTopButton.classList.remove('show');
    }

    checkVisibleSections();
  }

  function showCurrentItem() {
    items.forEach(item => item.classList.remove('active'));
    items[currentIndex].classList.add('active');
  }

  function changeItem(direction) {
    currentIndex = (currentIndex + direction + items.length) % items.length;
    showCurrentItem();
  }

  function autoChangeItem() {
    changeItem(1);
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
  setInterval(autoChangeItem, intervalTime); // Add interval for auto-changing items
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
