
let begin = 0;

// console.log(document.querySelector('.promo-line').offsetLeft);

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
  console.log(begin);
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
  console.log(begin);
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
};

const turnRight = () => {
  document.querySelector('.promo-line').scrollTo({
    left: getNextRightScrollCoors(),
    behavior: 'smooth',
  });
};

document.querySelector('.left').addEventListener('click', turnLeft);
document.querySelector('.right').addEventListener('click', turnRight);