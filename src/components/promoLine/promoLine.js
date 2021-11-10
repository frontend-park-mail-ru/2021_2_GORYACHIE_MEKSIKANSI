import promoLine from './promoLine.hbs'
import {PromoBlock} from "hme-design-system/src/components/promoBlock/promoBlock";

export class PromoLine {
  constructor(props) {

  }

  render(parent) {
    this.parent = parent;
    const promos = [];
    for (let i = 1; i < 10; i++) {
      promos.push(new PromoBlock().render());
    }
    this.parent.innerHTML = promoLine({promos: promos});

    this.begin = 0;
    this.promoLine = this.parent.querySelector('.promo-line');
    this.blocks = this.parent.querySelectorAll('.promo-line-block');
    this.leftButton = this.parent.querySelector('.promo-line__button-left');
    this.rightButton = this.parent.querySelector('.promo-line__button-right');

    this.leftButton.addEventListener('click', this.turnLeft);
    this.rightButton.addEventListener('click', this.turnRight);

    this.updateButtonVisibility();
  }

  getNextLeftScrollCoors = () => {
    const blockWidth = this.promoLine.offsetWidth;
    const firstBlock = [...this.blocks].find((block) => {
      return block.offsetLeft + block.offsetWidth - block.parentNode.offsetLeft > this.begin - blockWidth;
    });
    if (firstBlock) {
      this.begin = firstBlock.offsetLeft - firstBlock.parentNode.offsetLeft;

      if (this.begin < blockWidth) {
        this.begin = 0;
      }
    }
    return this.begin;
  };

  getNextRightScrollCoors = () => {
    const blockWidth = this.promoLine.offsetWidth;
    const lastBlock = [...this.blocks].find((block) => {
      return block.offsetLeft + block.offsetWidth - block.parentNode.offsetLeft > this.begin + blockWidth;
    });
    if (lastBlock) {
      this.begin = lastBlock.offsetLeft - lastBlock.parentNode.offsetLeft;
    }
    return this.begin;
  };

  updateButtonVisibility = () => {
    this.leftButton.style.visibility = 'visible';
    this.rightButton.style.visibility = 'visible';
    const summaryWidthOfBlocks = [...this.blocks].reduce((prev, item) => {
      prev += item.offsetWidth;
      return prev;
    }, 0);

    const blockWidth = this.promoLine.offsetWidth;
    if (summaryWidthOfBlocks < blockWidth) {
      this.leftButton.style.visibility = 'hidden';
      this.rightButton.style.visibility = 'hidden';
    } else {
      if (this.begin + blockWidth > document.querySelector('.promo-line').scrollWidth) {
        this.rightButton.style.visibility = 'hidden';
      } else if (this.begin === 0) {
        this.leftButton.style.visibility = 'hidden';
      }
    }
  };

  turnLeft = () => {
    document.querySelector('.promo-line').scrollTo({
      left: this.getNextLeftScrollCoors(),
      behavior: 'smooth',
    });
    this.updateButtonVisibility();
  };

  turnRight = () => {
    document.querySelector('.promo-line').scrollTo({
      left: this.getNextRightScrollCoors(),
      behavior: 'smooth',
    });
    this.updateButtonVisibility();
  };

  remove() {
    this.leftButton.removeEventListener('click', this.turnLeft);
    this.rightButton.removeEventListener('click', this.turnRight);
    this.parent.innerHTML = '';
  }
}
