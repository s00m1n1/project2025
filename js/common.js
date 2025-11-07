let currentPage = 1;
let totalPage = 0;
let pageGroup = 0;
let lastNumber = 5;
let firstNumber = 1;
let database = [];
let originDatabase = [];
let map = null;

// 글자수 20제한
function shortenText(text, limit = 20) {
  if (text.length > limit) {
    return text.substring(0, limit - 3) + "...";
  }
  return text;
}

function shortenText2(text, limit = 30) {
  if (text.length > limit) {
    return text.substring(0, limit - 3) + "...";
  }
  return text;
}

window.addEventListener("DOMContentLoaded", async () => {

  const policy = new Swiper(".policy-swiper", {
    direction: "vertical",
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
  });

  const siteBoxes = document.querySelectorAll('.sitebox');
  siteBoxes.forEach(box => {
    const sub = box.querySelector('.sub');
    box.addEventListener('mouseenter', () => sub.classList.add('on'));
    box.addEventListener('mouseleave', () => sub.classList.remove('on'));
  });

  document.querySelector('.top-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});