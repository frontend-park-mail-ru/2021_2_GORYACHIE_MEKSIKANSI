
class PromoLine {
  constructor(props) {

  }

  render(parent) {
    this.parent = parent;
    parent.innerHTML = Handlebars.templates['promoLine.hbs']({promos: [1, 2, 3, 4, 5]});
  }
}

let begin = 0;
let blockWidth = document.querySelector('.promo-line').offsetWidth;

const getNextRightScrollCoors = () => {
  blockWidth = document.querySelector('.promo-line').offsetWidth;
  const blocks = document.querySelectorAll('.promo-block');
  const lastBlock = [...blocks].find((block) => {
    return block.offsetLeft + block.offsetWidth - block.parentNode.offsetLeft > begin + blockWidth;
  });
  console.log(lastBlock);
  if (lastBlock) {
    begin = lastBlock.offsetLeft - lastBlock.parentNode.offsetLeft;
  }
  return begin;
};

const getNextLeftScrollCoors = () => {
  blockWidth = document.querySelector('.promo-line').offsetWidth;
  const blocks = document.querySelectorAll('.promo-block');
  const firstBlock = [...blocks].find((block) => {
    return block.offsetLeft + block.offsetWidth - block.parentNode.offsetLeft > begin;
  });
  if (firstBlock) {
    begin = firstBlock.offsetLeft - firstBlock.parentNode.offsetLeft;
  }
  return begin;
};

const turnLeft = () => {
  if (begin < blockWidth) {
    begin = 0;
  } else if (begin > blockWidth) {
    begin -= blockWidth;
  }
  document.querySelector('.promo-line').scrollTo({
    left: getNextLeftScrollCoors(),
    behavior: 'smooth',
  });
  updateButtonVisiblity();
};

const updateButtonVisiblity = () => {
  document.querySelector('.promo-line__button-left').style.visibility = 'visible';
  document.querySelector('.promo-line__button-right').style.visibility = 'visible';

  const blocks = document.querySelectorAll('.promo-line-block');
  const summaryWidthOfBlocks = [...blocks].reduce((prev, item) => {
    prev += item.offsetWidth;
    return prev;
  }, 0);
  if (summaryWidthOfBlocks < blockWidth) {
    document.querySelector('.promo-line__button-right').style.visibility = 'hidden';
    document.querySelector('.promo-line__button-left').style.visibility = 'hidden';
  } else {
    if (begin + blockWidth > document.querySelector('.promo-line').scrollWidth) {
      document.querySelector('.promo-line__button-right').style.visibility = 'hidden';
    }

    if (begin === 0) {
      document.querySelector('.promo-line__button-left').style.visibility = 'hidden';
    }
  }
};

const turnRight = () => {
  document.querySelector('.promo-line').scrollTo({
    left: getNextRightScrollCoors(),
    behavior: 'smooth',
  });
  updateButtonVisiblity();
};

document.querySelector('.promo-line__button-left').addEventListener('click', turnLeft);
document.querySelector('.promo-line__button-right').addEventListener('click', turnRight);

updateButtonVisiblity();
