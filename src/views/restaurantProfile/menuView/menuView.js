import Navbar from 'Components/navbar/navbar.js';
import baseRestaurantProfilePage from '../restaurantProfileBase.hbs';
import styles from '../restaurantProfilePage.scss'
import {BaseProfileView} from '../../profileViews/baseProfileView';
import {DishBlock} from "hme-design-system/src/components/dishBlock/dishBlock";
import {List} from "hme-design-system/src/components/list/list";
import {Button, ButtonIcon} from "hme-design-system/src/components/button/button";
import {editSvg, trashSvg} from "../../../modules/consts";
import {menuRestaurantProfileMenuBodyMock} from "../../mocks";

/**
 * Restaurant profile page with menu settings view class
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
    this.data = menuRestaurantProfileMenuBodyMock;
  }

  /**
   * Method that render login page in inner HTML of element
   * @param {Object} props objects relating for rendering view
   */
  render(props = {}) {
    super.render();
    this.navbar.render();

    let content = '';
    this.data.menu.forEach((menu) => {
      const objList = [];
      menu.dishes.forEach((dish) => {
        objList.push(DishBlock(dish));
      });
      objList.push(DishBlock({addDishProfile: true}));
      content += new List({
        listTitle: menu.title,
        objList: objList,
        buttons: [
          new ButtonIcon({
            iconButtonColor: 'gray',
            icon: editSvg,
            classes: ['edit_button']
          }).render(),
          new ButtonIcon({
            iconButtonColor: 'gray',
            icon: trashSvg,
            classes: ['trash_button']
          }).render(),
        ]
      }).render();
    });

    this.parent.innerHTML += baseRestaurantProfilePage({
      pageTitle: 'Настройка меню',
      content: content + new Button({
        label: 'Добавить раздел',
        color: 'black',
        rounded: true,
        size: 'bg',
        icon: '',
        classes: ['button_wide', ' add_menu_button'],
      }).render(),
    });

    this.settingUp();
  }

  /**
   * method for setting up listeners and other things
   */
  settingUp() {
    this.parent.querySelectorAll('.edit_button').forEach((button) => {
      button.addEventListener('click', () => console.log('CLICK'));
    });
    this.parent.querySelector('.add_menu_button').addEventListener('click', () => {
      this.data.menu.push({
        title: 'Новый раздел',
        id: 3,
        dishes: [],
      });
      this.remove();
      this.render();
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