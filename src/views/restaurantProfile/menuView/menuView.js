import Navbar from 'Components/navbar/navbar.js';
import baseProfilePage from '../../profileViews/baseProfilePage.hbs';
import {BaseProfileView} from '../../profileViews/baseProfileView';
import {DishBlock} from "hme-design-system/src/components/dishBlock/dishBlock";
import {List} from "hme-design-system/src/components/list/list";
import dishesList from "../../../components/dishesList/dishesList.hbs";
import {Button} from "hme-design-system/src/components/button/button";

/**
 * Profile view class
 */
export class MenuView extends BaseProfileView {
  /**
   *
   * @param {HTMLElement} parent
   * @param {Function} routeTo
   * @param {Class} controller
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
   * Method that render login page in inner HTML of element
   * @param {Object} props objects relating for rendering view
   */
  render(props = {}) {
    super.render();
    this.navbar.render();

    const lists = new List({listTitle: 'Новый раздел', objList: [DishBlock({addDishProfile: true})]}).render();

    this.parent.innerHTML += baseProfilePage({
      pageTitle: 'Настройка меню',
      content: lists + new Button({
        label: 'Добавить раздел',
        color: 'black',
        rounded: true,
        size: 'bg',
        icon: '',
        classes: ['button_wide'],
      }).render(),
    });
  }

  /**
   * Method for removing setted up listeners and other data
   */
  remove() {
    super.remove();
    this.navbar.remove();
    this.parent.innerHTML = '';
  }
}