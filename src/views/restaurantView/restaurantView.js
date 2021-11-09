import Navbar from 'Components/navbar/navbar.js';
import {DishPopup} from 'Components/dishPopup/dishPopup.js';
import {Cart} from 'Components/cart/cart.js';
import {View} from '../baseView/View.js';
import EventBus from "Modules/eventBus.js";
import {RestaurantEvents} from "Events/Restaurant.js";
import page from '../baseView/page.hbs';
import restaurantHeader from 'Components/restaurantHeader/restaurantHeader.hbs';
import restaurantPage from './restaurantPage.hbs';
import continuePopup from 'Components/continuePopup/continuePopup.hbs'
import {DishesList} from '../../components/dishesList/dishesList';
import userStore from "Modules/reducers/userStore";

export class RestaurantView extends View {
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
    })

    EventBus.addEventListener(RestaurantEvents.restaurantCartUpdateSuccess, this.refreshNavbar);
    EventBus.addEventListener(RestaurantEvents.restaurantPopGetSuccess, this.popup.render.bind(this.popup));
  }

  refreshNavbar = () => {
    this.navbar.updateCartButtonNumber()
  }

  render(props = {}) {
    this.restaurant = props.restaurant;
    this.popup.restaurant = this.restaurant;

    this.navbar.render();
    this.parent.insertAdjacentHTML('afterbegin', page({
      head: restaurantHeader(this.restaurant),
      content: restaurantPage(this.restaurant),
    }));

    this.dishesList.render({
      parent: this.parent.querySelector('.restaurant-page__dishes-list'),
      restaurant: this.restaurant,
    });

    this.cart.parent = this.parent.querySelector('.restaurant-page__cart');
    this.cart.render();
  }

  continueOrdering = (newR, oldR) => {
    this.popup.remove();
    this.continueDiv = document.createElement('div');
    this.continueDiv.classList.add('continue-popup-div');
    this.continueDiv.innerHTML = continuePopup({new: newR, old: oldR});
    this.parent.appendChild(this.continueDiv);
    document.body.style.overflowY = 'hidden';

    this.continueDiv.querySelector('.continue-popup-cancel').addEventListener('click', this.closeContinueOrdering);
    this.continueDiv.querySelector('.continue-popup-continue').addEventListener('click', this.acceptContinueOrdering);
  }

  closeContinueOrdering = () => {
    if (this.continueDiv) {
      this.continueDiv.querySelector('.continue-popup-cancel').removeEventListener('click', this.closeContinueOrdering);
      this.continueDiv.querySelector('.continue-popup-continue').removeEventListener('click', this.acceptContinueOrdering);
      this.continueDiv.remove();
    }
    document.body.style.overflowY = 'scroll';
  }

  acceptContinueOrdering = () => {
    this.controller.continueAdding();
    this.closeContinueOrdering();
  }

  remove() {
    if (this.continueDiv) {
      this.closeContinueOrdering();
    }
    this.navbar.remove();
    this.dishesList.remove();
    this.popup.remove();
    this.cart.remove();
    this.parent.innerHTML = '';
  }
}
