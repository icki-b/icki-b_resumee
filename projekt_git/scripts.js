document.addEventListener('DOMContentLoaded', function () {
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const items = document.querySelectorAll('.carousel-item');
  let currentIndex = 0;

  function showCurrentItem() {
    items.forEach(item => item.classList.remove('active'));
    items[currentIndex].classList.add('active');
  }

  function changeItem(direction) {
    currentIndex = (currentIndex + direction + items.length) % items.length;
    showCurrentItem();
  }

  prevButton.addEventListener('click', () => changeItem(-1));
  nextButton.addEventListener('click', () => changeItem(1));

  showCurrentItem();
});
