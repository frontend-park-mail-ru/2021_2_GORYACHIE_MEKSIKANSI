import eventBus from 'Modules/eventBus.js';
import {RestaurantEvents} from 'Events/Restaurant.js';
import dishPopup from './dishPopup.hbs';
import {DishModal} from "hme-design-system/src/components/modal/dishModal/dishModal";

export class DishPopup {
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
    controller: controller,
    restaurant: restaurant,
  }) {
    this.controller = controller;
    this.routeTo = routeTo;
    this.parent = parent;
    this.restaurant = restaurant;
  }

  async render(dish) {
    this.number = 1;
    this.dish = dish.dishes;
    this.div = document.createElement('div');
    this.div.classList.add('dish-popup-div');
    // this.div.innerHTML = dishPopup(this.dish);
    console.log('DISH', this.dish);
    await this.div.insertAdjacentHTML('afterbegin', new DishModal(this.dish).render())
    document.body.style.overflowY = 'hidden';

    this.parent.appendChild(this.div);

    document.body.querySelector('.modal-close-button').addEventListener('click', this.remove);
    document.body.querySelector('.modal-wrapper').addEventListener('click', this.outsidePopupClick);

    this.div.querySelector('.modal-dish__plus').addEventListener('click', this.increaseNumber);
    this.div.querySelector('.modal-dish__minus').addEventListener('click', this.decreaseNumber);

    document.body.querySelectorAll('.tick-form-container').forEach((item) => {
      const input = item.querySelector('input');
      if (input.type === 'checkbox') {
        item.addEventListener('input', this.refreshSummary);
      }
    });
    //
    // document.body.querySelector('.dish-popup__buy-button').addEventListener('click', this.addDishToCart);
  }

  addDishToCart = () => {
    const radios = this.div.querySelectorAll('.radio-wrapper');
    const dishRadios = [];
    radios.forEach((item) => {
      item.querySelectorAll('input').forEach((input) => {
        if (input.checked) {
          dishRadios.push({
            rId: Number(item.id),
            id: Number(input.id),
          });
        }
      });
    });

    if (dishRadios.length !== radios.length) {
      // error
      return;
    }

    let dishCheckboxes = [];
    this.div.querySelectorAll('.dish-popup__checkbox-row').forEach((item) => {
      const input = item.querySelector('input');
      if (input.checked) {
        dishCheckboxes.push({
          id: Number(item.id),
        });
      }
    });

    const number = this.div.querySelector('.dish-popup__number').innerHTML;
    this.controller.addDishToCart({
      restaurant: {
        id: this.restaurant.id,
        name: this.restaurant.name,
      },
      dish: {
        id: this.dish.id,
        count: Number(number),
        radios: dishRadios,
        ingredients: dishCheckboxes,
      },
    });
    this.remove();
  }

  remove = () => {
    if (document.body.querySelector('.dish-popup-div')) {
      document.body.querySelector('.modal-close-button').removeEventListener('click', this.remove);
      document.body.querySelector('.modal-wrapper').removeEventListener('click', this.outsidePopupClick);

      document.body.querySelector('.modal-dish__plus').removeEventListener('click', this.increaseNumber);
      document.body.querySelector('.modal-dish__minus').removeEventListener('click', this.decreaseNumber);
      // document.body.querySelector('.dish-popup__buy-button').removeEventListener('click', this.addDishToCart);

      document.body.querySelectorAll('.tick-form-container').forEach((item) => {
        const input = item.querySelector('input');
        if (input.type === 'checkbox') {
          item.removeEventListener('input', this.refreshSummary);
        }
      });

      document.body.removeChild(document.body.querySelector('.dish-popup-div'));
      document.body.style.overflowY = 'scroll';
    }
  }

  outsidePopupClick = (e) => {
    console.log('CLICK');
    if (!document.body.querySelector('.modal').contains(e.target)) {
      this.remove();
    }
  }

  increaseNumber = () => {
    const number = this.div.querySelector('.modal-dish__number');
    this.number += 1;
    number.innerHTML = String(this.number);

    this.refreshSummary();
  }

  decreaseNumber = () => {
    const number = this.div.querySelector('.modal-dish__number');
    if (this.number > 1) {
      this.number -= 1;
      number.innerHTML = String(this.number);
    }

    this.refreshSummary();
  }

  refreshSummary = () => {
    let cost = Number(this.dish.cost);

    const checkboxes = [];
    document.body.querySelectorAll('.tick-form-container').forEach((item) => {
      const input = item.querySelector('input');
      if (input.type === 'checkbox') {
        checkboxes.push(input);
      }
    });

    checkboxes.forEach((item) => {
      if (item.checked) {
        cost += Number(this.dish.ingredients.find((ing) => {
          return Number(item.id) === ing.id;
        }).cost);
      }
    });

    // const checkboxes = document.body.querySelectorAll('.dish-popup__checkbox-row');
    // checkboxes.forEach((DOMitem) => {
    //   if (DOMitem.querySelector('input').checked) {
    //     cost += Number(this.dish.ingredients.find((item) => {
    //       return Number(DOMitem.id) === item.id;
    //     }).cost);
    //   }
    // });

    const summary = document.body.querySelector('.modal__buy-button');
    summary.innerHTML = String(cost * this.number) + '₽ Добавить в корзину';
  }
}