import eventBus from '../../modules/eventBus.js';
import {RestaurantEvents} from '../../events/Restaurant.js';

export class DishPopup {
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
    controller: controller,
    restaurantId: id,
  }) {
    this.controller = controller;
    this.routeTo = routeTo;
    this.parent = parent;
    this.restId = id;

    eventBus.addEventListener(RestaurantEvents.restaurantPopGetSuccess, this.render.bind(this));
  }

  render(dish) {
    console.log("RENDERING");
    this.dish = dish;
    const div = document.createElement('div');
    div.classList.add('dish-popup-div');
    div.innerHTML = Handlebars.templates['dishPopup.hbs'](this.dish);
    document.body.appendChild(div);
    document.body.style.overflowY = 'hidden';

    document.body.querySelector('.dish-popup__close-button').addEventListener('click', this.remove);
    document.body.querySelector('.dish-popup-wrapper').addEventListener('click', this.outsidePopupClick);

    document.body.querySelector('.plus').addEventListener('click', this.increaseNumber);
    document.body.querySelector('.minus').addEventListener('click', this.decreaseNumber);

    document.body.querySelectorAll('.dish-popup__checkbox-input').forEach((item) => {
      item.addEventListener('input', this.refreshSummary);
    });
  }

  getDish = (e) => {
    const {target} = e;
    const dishId = Number(target.closest('.dish').getAttribute('id'));
    this.controller.getDish(this.restId, dishId);
  }

  settingUp() {
    this.dishes = document.querySelectorAll('.dish');
    this.dishes.forEach((item) => {
      item.addEventListener('click', this.getDish);
    });
  }

  remove = () => {
    if (document.body.querySelector('.dish-popup-div')) {
      document.body.querySelector('.dish-popup__close-button').removeEventListener('click', this.remove);
      document.body.querySelector('.dish-popup-wrapper').removeEventListener('click', this.outsidePopupClick);

      document.body.querySelector('.plus').removeEventListener('click', this.increaseNumber);
      document.body.querySelector('.minus').removeEventListener('click', this.decreaseNumber);

      document.body.querySelectorAll('.dish-popup__checkbox-input').forEach((item) => {
        item.removeEventListener('input', this.refreshSummary);
      });

      document.body.removeChild(document.body.querySelector('.dish-popup-div'));
      document.body.style.overflowY = 'scroll';
    }
  }

  outsidePopupClick = (e) => {
    if (!document.body.querySelector('.dish-popup').contains(e.target)) {
      this.remove();
    }
  }

  increaseNumber = () => {
    const number = document.body.querySelector('.dish-popup__number');
    number.innerHTML = String(Number(number.innerHTML) + 1);

    this.refreshSummary();
  }

  decreaseNumber = () => {
    const number = document.body.querySelector('.dish-popup__number');
    if (Number(number.innerHTML) > 1) {
      number.innerHTML = String(Number(number.innerHTML) - 1);
    }

    this.refreshSummary();
  }

  refreshSummary = () => {
    let cost = Number(this.dish.dishCost);
    const checkboxes = document.body.querySelectorAll('.dish-popup__checkbox-row');
    checkboxes.forEach((DOMitem) => {
      if (DOMitem.querySelector('input').checked) {
        cost += Number(this.dish.dishCheckboxesRows.find((item) => {
          return Number(DOMitem.getAttribute('id')) === item.dishCheckBoxId;
        }).dishCheckboxRowCost);

      }
    });

    const summary = document.body.querySelector('.dish-popup__summary-cost');
    const number = document.body.querySelector('.dish-popup__number');
    summary.innerHTML = String(cost * Number(number.innerHTML));
  }
}