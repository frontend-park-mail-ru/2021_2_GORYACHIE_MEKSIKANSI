import Navbar from 'Components/navbar/navbar.js';
import {View} from '../baseView/View.js';
import page from '../baseView/page.hbs';
import restaurantReviewsPage from './restaurantReviewsPage.hbs';
import {RestaurantHeader} from 'hme-design-system/src/components/restaurantHeader/restaurantHeader';
import {Review} from 'hme-design-system/src/components/review/review';
import {ContentBlock} from 'hme-design-system/src/components/contentBlock/contentBlock';
import {TextArea} from 'hme-design-system/src/forms/textArea/textArea';
import Fonts from 'hme-design-system/src/components/fonts/fonts';
import {Button} from 'hme-design-system/src/components/button/button';
import userStore from '../../modules/reducers/userStore';
import {StarsRating} from '../../components/starsRating/starsRating';
import {CreateSnack} from '../../components/snackBar/snackBar';
import eventBus from '../../modules/eventBus';
import {ProfileEvents} from '../../events/Profile';
import {SearchEvents} from '../../events/Search';


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

    eventBus.addEventListener(ProfileEvents.userReviewPublishSuccess, this.refresh);
  }

  /**
   * Rendering restaurant reviews page
   *
   * @param {object} props
   *
   */
  render(props = {}) {
    this.restaurant = props.restaurants ? props.restaurants : {};
    this.reviews = this.restaurant.reviews ? this.restaurant.reviews : [];
    this.refresh();
  }

  /**
   * Render view without new info about restaurant
   */
  refresh = () => {
    this.remove();
    this.navbar.render();
    const reviews = [Review({
      rate: this.restaurant.rate,
      text: 'Общая оценка складывается из общего числа отзывов',
    })];
    if (this.restaurant.reviews) {
      this.restaurant.reviews.forEach((review) => {
        reviews.push(Review(review));
      });
    }

    if (userStore.getState().auth) {
      reviews.push(new ContentBlock({
        content: [
          Fonts({
            text: 'Оставьте ваш отзыв!',
            size: 'font_h1',
          }),
          TextArea({placeholder: 'Оставьте ваш отзыв тут!'}),
          '<div class="stars_review_rating"></div>',
          new Button({
            label: 'Опубликовать',
            color: 'black',
            rounded: false,
            classes: ['mt', ' publish_button'],
          }).render(),
        ],
      }).render());
    }

    this.parent.insertAdjacentHTML('afterbegin', page({
      head: new RestaurantHeader({restaurant: this.restaurant}).render(),
      content: restaurantReviewsPage({
        tags: this.restaurant.tags,
        reviews: reviews,
      }),
    }));

    this.parent.querySelector('.restaurant-page__cart').innerHTML = new Button({
      label: 'Назад к ресторану',
      rounded: true,
      size: 'bg',
      classes: ['button_wide', ' back_button'],
    }).render();

    if (userStore.getState().auth) {
      this.parent.querySelector('.publish_button').addEventListener('click', this.publishReview);
      this.starsRating = new StarsRating(this.parent.querySelector('.stars_review_rating'));
      this.starsRating.render();
    }

    this.parent.querySelectorAll('.restaurant-underheader__tag').forEach((item) => {
      item.onclick = this.makeSearchRequestByTag;
    });

    this.parent.querySelector('.back_button').addEventListener('click', () => {
      this.controller.routeTo('/restaurants/' + this.restaurant.id);
    });

    this.parent.querySelector('.favourite_button').addEventListener('click', () => {
      this.controller.switchFavourite(this.restaurant.id);
    });
    eventBus.addEventListener(ProfileEvents.userFavouriteSwitchSuccess, this.refreshHeader);
  }

  refreshHeader = (favourite) => {
    this.restaurant = {
      ...this.restaurant,
      favourite: favourite,
    };
    this.parent.querySelector('.page__head').innerHTML = new RestaurantHeader({restaurant: this.restaurant}).render();
  }

  /**
   * Request for a search
   * @param {event} e
   */
  makeSearchRequestByTag = (e) => {
    eventBus.emitEventListener(SearchEvents.searchRequest, e.target.innerHTML);
  }

  /**
   * Make check and call controller to publish review on restaurant
   */
  publishReview = () => {
    const textArea = this.parent.querySelector('.textarea');
    if (textArea.value.length < 10) {
      CreateSnack({
        title: 'Слишком короткий отзыв, минимальная длина отзыва: 10 символов',
        status: 'orange',
      });
    } else {
      this.controller.publishReview(this.restaurant.id, textArea.value, this.starsRating.getValue());
    }
  }

  /**
   * Removing page
   */
  remove() {
    eventBus.unsubscribe(ProfileEvents.userFavouriteSwitchSuccess, this.refreshHeader);
    if (this.starsRating) {
      this.starsRating.remove();
    }
    this.navbar.remove();
    this.parent.innerHTML = '';
  }
}
