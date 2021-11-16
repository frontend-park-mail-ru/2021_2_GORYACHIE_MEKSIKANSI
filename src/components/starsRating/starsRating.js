import styles from './starsRating.scss'
import starsRatingTemplate from './starsRating.hbs'

export class StarsRating {
  constructor(parent) {
    this.parent = parent;
    this.stars = [
      {id: 1, checked: true},
      {id: 2, checked: true},
      {id: 3, checked: true},
      {id: 4, checked: true},
      {id: 5, checked: true},
    ];
    this.rating = 5;
  }

  render() {
    this.parent.innerHTML = starsRatingTemplate({stars: this.stars});

    this.parent.querySelectorAll('.star').forEach((star) => {
      star.addEventListener('click', this.update);
    });
  }

  update = (e) => {
    const id = e.target.closest('.star').id;
    this.stars = this.stars.map((star) => {
      if (star.id <= id) {
        return {id: star.id, checked: true};
      } else {
        return {id: star.id, checked: false};
      }
    });
    this.rating = id;
    console.log(this.rating);

    this.remove();
    this.render();
  }

  getValue = () => {
    return this.rating;
  }

  remove() {
    this.parent.querySelectorAll('.star').forEach((star) => {
      star.removeEventListener('click', this.update);
    });
    this.parent.innerHTML = '';
  }
}