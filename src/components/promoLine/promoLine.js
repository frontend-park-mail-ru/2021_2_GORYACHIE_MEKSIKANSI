
let begin = 0;
let blockWidth = document.querySelector('.promo-line').offsetWidth;

// console.log(document.querySelector('.promo-line').offsetLeft);

const getNextRightScrollCoors = () => {
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
  const blocks = document.querySelectorAll('.promo-block');
  const firstBlock = [...blocks].find((block) => {
    return block.offsetLeft + block.offsetWidth - block.parentNode.offsetLeft > begin;
  });
  console.log(firstBlock);
  if (firstBlock) {
    begin = firstBlock.offsetLeft - firstBlock.parentNode.offsetLeft;
  }
  return begin;
};

const turnLeft = () => {
  if (begin > blockWidth) {
    begin -= blockWidth;
  }
  if (begin < blockWidth) {
    begin = 0;
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