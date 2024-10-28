let currentIndex = 0;
const cards = document.querySelector('.cards1');
const cardCount = document.querySelectorAll('.cards1 .card1').length;

document.getElementById('next1').addEventListener('click', () => {
  if (currentIndex < cardCount - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateCardPosition();
});

document.getElementById('prev1').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = cardCount - 1;
  }
  updateCardPosition();
});

function updateCardPosition() {
  const cardWidth = document.querySelector('.card1').offsetWidth;
  cards.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}
