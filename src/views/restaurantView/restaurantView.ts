import Navbar from '@/components/navbar/navbar';
import {DishPopup} from '@/components/dishPopup/dishPopup';
import {Cart} from '@/components/cart/cart';
import {View} from '@/views/baseView/View';
import EventBus from '@/modules/eventBus';
import {RestaurantEvents} from '@/events/Restaurant';
import page from '@/views/baseView/page.hbs';
import restaurantPage from './restaurantPage.hbs';
import {DishesList} from '@/components/dishesList/dishesList';
import userStore from '@/modules/reducers/userStore';
import {continueModal} from 'hme-design-system/stories/modal.stories';
import {ContinueModal} from 'hme-design-system/src/components/modal/continueModal/continueModal';
import {RestaurantHeader} from 'hme-design-system/src/components/restaurantHeader/restaurantHeader';
import eventBus from '@/modules/eventBus';
import {SearchEvents} from '@/events/Search';
import {ProfileEvents} from '@/events/Profile';
import {CreateSnack} from "@/components/snackBar/snackBar";
import {RestaurantController} from "@/controllers/restaurantController";


/**
 * RestaurantView class
 */
export class RestaurantView extends View {
  private popup: DishPopup;
  private cart: Cart;
  private dishesList: DishesList;
  public routeTo: Function;
  private restaurant: any;
  private controller: RestaurantController;
  private continueDiv: HTMLDivElement;
  private parent: HTMLElement
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

    this.popup = new DishPopup({
      parent: document.body,
      routeTo: this.routeTo,
      controller: this.controller,
    });

    this.cart = new Cart({
      parent: this.parent,
      routeTo: this.routeTo,
      controller: this.controller,
    });

    this.dishesList = new DishesList({
      parent: this.parent,
      routeTo: this.routeTo,
      controller: this.controller,
    });

    EventBus.addEventListener(RestaurantEvents.restaurantCartUpdateSuccess, this.refreshNavbar);
    EventBus.addEventListener(RestaurantEvents.restaurantPopGetSuccess, this.popup.render.bind(this.popup));
  }

  /**
   * Refreshing navbar when parameters upadted
   */
  refreshNavbar = () => {
    Navbar.updateCartButtonNumber();
  }

  /**
   * Rendering restaurant page
   *
   * @param {object} props
   *
   */
  render(props: any = {}) {
    this.restaurant = props.restaurant;
    this.popup.restaurant = this.restaurant;

    Navbar.render();
    this.parent.insertAdjacentHTML('afterbegin', page({
      head: new RestaurantHeader({restaurant: this.restaurant}).render(),
      content: restaurantPage(this.restaurant),
    }));

    this.dishesList.render({
      parent: this.parent.querySelector('.restaurant-page__dishes-list'),
      restaurant: this.restaurant,
    });

    this.cart.parent = this.parent.querySelector('.restaurant-page__cart');
    this.cart.render();

    this.parent.querySelectorAll('.restaurant-underheader__tag').forEach((item: HTMLElement) => {
      item.onclick = this.makeSearchRequestByTag;
    });

    this.parent.querySelector('.restaurant-header__love-icon').addEventListener('click', () => {
      this.controller.switchFavourite(this.restaurant.id);
    });

    eventBus.addEventListener(ProfileEvents.userFavouriteSwitchSuccess, this.refreshHeader);
  }

  /**
   * Emit request event for a search
   * @param {event} e
   */
  makeSearchRequestByTag = (e) => {
    eventBus.emitEventListener(SearchEvents.searchRequest, e.target.innerHTML);
  }

  /**
   * Letting user to continue ordering or change restaurant
   *
   * @param {object} newR
   * @param {object} oldR
   *
   */
  continueOrdering = (newR, oldR) => {
    this.popup.remove();
    this.continueDiv = document.createElement('div');
    this.continueDiv.classList.add('continue-popup-div');
    // this.continueDiv.innerHTML = continuePopup({new: newR, old: oldR});
    this.continueDiv.innerHTML = new ContinueModal({
      newRestaurantName: newR.name,
      oldRestaurantName: oldR.name,
    }).render();
    this.parent.appendChild(this.continueDiv);
    document.body.style.overflowY = 'hidden';

    this.continueDiv.querySelector('.continue-modal__cancel').addEventListener('click', this.closeContinueOrdering);
    this.continueDiv.querySelector('.modal-close-button').addEventListener('click', this.closeContinueOrdering);
    this.continueDiv.querySelector('.continue-modal__accept').addEventListener('click', this.acceptContinueOrdering);
  }

  /**
   * Closing continue ordering popup
   */
  closeContinueOrdering = () => {
    if (this.continueDiv) {
      this.continueDiv.querySelector('.continue-modal__cancel').removeEventListener('click', this.closeContinueOrdering);
      this.continueDiv.querySelector('.continue-modal__accept').removeEventListener('click', this.acceptContinueOrdering);
      this.continueDiv.querySelector('.modal-close-button').removeEventListener('click', this.closeContinueOrdering);
      this.continueDiv.remove();
    }
    document.body.style.overflowY = 'scroll';
  }

  acceptContinueOrdering = () => {
    this.controller.continueAdding();
    this.closeContinueOrdering();
  }

  /**
   * Refresh restaurant header
   * @param {boolean} favourite
   */
  refreshHeader = (favourite) => {
    if (favourite.status === true) {
      CreateSnack({
        title: `Ресторан добавлен в избарнное!`,
        status: 'green',
      });
    } else {
      CreateSnack({
        title: `Ресторан удален из избранного:(`,
        status: 'red',
      });
    }
    this.restaurant = {
      ...this.restaurant,
      favourite: favourite.status,
    };
    this.parent.querySelector('.page__head').innerHTML = new RestaurantHeader({restaurant: this.restaurant}).render();
    this.parent.querySelector('.restaurant-header__love-icon').addEventListener('click', () => {
      this.controller.switchFavourite(this.restaurant.id);
    });
  }

  /**
   * Removing page
   */
  remove() {
    eventBus.unsubscribe(ProfileEvents.userFavouriteSwitchSuccess, this.refreshHeader);
    if (this.continueDiv) {
      this.closeContinueOrdering();
    }

    Navbar.remove();
    this.dishesList.remove();
    this.popup.remove();
    this.cart.remove();
    this.parent.innerHTML = '';
  }
}
