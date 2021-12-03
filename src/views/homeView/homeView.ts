import {View} from '@/views/baseView/View';
import Navbar from '@/components/navbar/navbar';
import homePage from './homePage.hbs';
import page from '@/views/baseView/page.hbs';
import {RestaurantsList} from '@/components/restaurantsList/restaurantLists';
import {PromoLine} from '@/components/promoLine/promoLine';
import {RestaurantReviewsView} from "@/views/restaurantReviewsView/restaurantReviewsView";

/**
 * Home view class
 */
export class HomeView extends View {
  private readonly routeTo: Function;
  private readonly controller: Object;
  private parent: HTMLElement;
  private promo: PromoLine;
  private restaurantsList: RestaurantsList;
  /**
   *
   * @param {HTMLElement} parent
   * @param {Function} routeTo
   * @param {Object} controller
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
    this.promo = new PromoLine();
    this.restaurantsList = new RestaurantsList();
  }
  /**
   * Method that render home page in inner HTML of element
   * @param {Object} props
   */
  render(props: any = {}) {
    Navbar.render();
    this.parent.insertAdjacentHTML('afterbegin', page({
      content: homePage(),
    }));
    this.promo.render(this.parent.querySelector('.home-page__promo-line-blocks'));
    this.restaurantsList.render({
      parent: this.parent.querySelector('.home-page__restaurants-list'),
      restaurantsList: props.restaurants,
      title: 'Рестораны',
    });
  }
  /**
   * Method for removing setted up listeners and other data
   */
  remove() {
    Navbar.remove();
    this.promo.remove();
    this.restaurantsList.remove();
    this.parent.innerHTML = '';
  }
}
