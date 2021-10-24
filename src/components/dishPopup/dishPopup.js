import eventBus from 'Modules/eventBus.js';
import {RestaurantEvents} from 'Events/Restaurant.js';
import dishPopup from './dishPopup.hbs';

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

    eventBus.addEventListener(RestaurantEvents.restaurantPopGetSuccess, this.render.bind(this));
  }

  render(dish) {
    this.dish = dish.dishes;
    this.div = document.createElement('div');
    this.div.classList.add('dish-popup-div');
    this.div.innerHTML = dishPopup(this.dish);
    this.parent.appendChild(this.div);
    document.body.style.overflowY = 'hidden';

    document.body.querySelector('.dish-popup__close-button').addEventListener('click', this.remove);
    document.body.querySelector('.dish-popup-wrapper').addEventListener('click', this.outsidePopupClick);

    this.div.querySelector('.plus').addEventListener('click', this.increaseNumber);
    this.div.querySelector('.minus').addEventListener('click', this.decreaseNumber);

    document.body.querySelectorAll('.dish-popup__checkbox-input').forEach((item) => {
      item.addEventListener('input', this.refreshSummary);
    });

    document.body.querySelector('.dish-popup__buy-button').addEventListener('click', this.addDishToCart);
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
            name: this.dish.radios.find((item1) => {
              return Number(item1.id) === Number(item.id);
            }).opt.find((item) => {
              return Number(item.id) === Number(input.id);
            }).name,
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
          id: item.id,
        });
      }
    });

    dishCheckboxes = this.dish.ingredients.filter((item) => {
      const checkbox = dishCheckboxes.find((innerCheckbox) => {
        return Number(innerCheckbox.id) === item.id;
      })
      return !!checkbox;
    });

    const number = this.div.querySelector('.dish-popup__number').innerHTML;
    this.controller.addDishToCart({
      restaurant: this.restaurant,
      dish: {
        ...this.dish,
        id: this.dish.id,
        count: Number(number),
        radios: dishRadios,
        ingredients: dishCheckboxes,
      },
    });
    console.log(dishCheckboxes)
    this.remove();
  }

  getDish = (e) => {
    const {target} = e;
    const dishId = Number(target.closest('.dish').getAttribute('id'));
    this.controller.getDish(this.restaurant.id, dishId);
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
      document.body.querySelector('.dish-popup__buy-button').addEventListener('click', this.addDishToCart);

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
    const number = this.div.querySelector('.dish-popup__number');
    number.innerHTML = String(Number(number.innerHTML) + 1);

    this.refreshSummary();
  }

  decreaseNumber = () => {
    const number = this.div.querySelector('.dish-popup__number');
    if (Number(number.innerHTML) > 1) {
      number.innerHTML = String(Number(number.innerHTML) - 1);
    }

    this.refreshSummary();
  }

  refreshSummary = () => {
    let cost = Number(this.dish.cost);
    const checkboxes = document.body.querySelectorAll('.dish-popup__checkbox-row');
    checkboxes.forEach((DOMitem) => {
      if (DOMitem.querySelector('input').checked) {
        cost += Number(this.dish.ingredients.find((item) => {
          return Number(DOMitem.id) === item.id;
        }).cost);
      }
    });

    const summary = document.body.querySelector('.dish-popup__summary-cost');
    const number = this.div.querySelector('.dish-popup__number');
    summary.innerHTML = String(cost * Number(number.innerHTML));
  }
}