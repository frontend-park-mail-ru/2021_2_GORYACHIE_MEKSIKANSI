import Navbar from 'Components/navbar/navbar.js';
import {View} from '../baseView/View.js';
import page from '../baseView/page.hbs';
import restaurantReviewsPage from './restaurantReviewsPage.hbs';
import {RestaurantHeader} from 'hme-design-system/src/components/restaurantHeader/restaurantHeader';
import {Review} from "hme-design-system/src/components/review/review";
import {ContentBlock} from "hme-design-system/src/components/contentBlock/contentBlock";
import {TextArea} from "hme-design-system/src/forms/textArea/textArea";
import Fonts from "hme-design-system/src/components/fonts/fonts";
import {Button} from "hme-design-system/src/components/button/button";
import {reviewsBodyMock} from "../mocks";


/**
 * RestaurantView class
 */
export class RestaurantReviewsView extends View {
  /**
   * Constructor for Map class
   *
   * @param {{parent: HTMLElement, routeTo: object, controller: Class}} params
   *
   */
  constructor({
                parent: parent = document.body,
                routeTo: routeTo = () => {},
                controller: controller,
              }) {
    super({
      parent: parent,
      routeTo: routeTo,
      controller: controller,
    });
    this.navbar = Navbar;
  }

  /**
   * Rendering restaurant reviews page
   *
   * @param {object} props
   *
   */
  render(props = {}) {
    this.restaurant = reviewsBodyMock;
    // this.restaurant = props.restaurant;
    this.reviews = this.restaurant.reviews;
    this.navbar.render();

    const reviews = [Review({
      rate: this.restaurant.rating,
      text: 'Общая оценка складывается из общего числа отзывов'
    })];
    if (this.restaurant.reviews) {
      this.restaurant.reviews.forEach((review) => {
        reviews.push(Review(review));
      });
    }

    reviews.push(new ContentBlock({
      content: [
        Fonts({
          text: 'Оставьте ваш отзыв!',
          size: 'font_h1',
        }),
        TextArea({placeholder: 'Оставьте ваш отзыв тут!'}),
        new Button({
          label: 'Опубликовать',
          color: 'black',
          rounded: 'high',
          classes: ['mt'],
        }).render(),
      ]
    }).render())

    this.parent.insertAdjacentHTML('afterbegin', page({
      head: new RestaurantHeader({restaurant: this.restaurant}).render(),
      content: restaurantReviewsPage({
        tags: this.restaurant.tags,
        reviews: reviews,
      }),
    }));

    this.parent.querySelector('.restaurant-page__cart').innerHTML = new Button({
      label: 'Назад к ресторану',
      rounded: 'high',
      size: 'bg',
      classes: ['button_wide'],
    }).render();
  }

  /**
   * Removing page
   */
  remove() {
    this.navbar.remove();
    this.dishesList.remove();
    this.cart.remove();
    this.parent.innerHTML = '';
  }
}
