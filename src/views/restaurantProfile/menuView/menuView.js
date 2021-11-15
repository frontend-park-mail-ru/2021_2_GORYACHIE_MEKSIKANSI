import Navbar from 'Components/navbar/navbar.js';
import baseRestaurantProfilePage from '../restaurantProfileBase.hbs';
import styles from '../restaurantProfilePage.scss'
import {BaseProfileView} from '../../profileViews/baseProfileView';
import {DishBlock} from "hme-design-system/src/components/dishBlock/dishBlock";
import {List} from "hme-design-system/src/components/list/list";
import {Button, ButtonIcon} from "hme-design-system/src/components/button/button";
import {editSvg, trashSvg} from "../../../modules/consts";
import {menuRestaurantProfileMenuBodyMock} from "../../mocks";
import {Modal} from "hme-design-system/src/components/modal/modal";
import {Input} from "hme-design-system/src/forms/input/input";
import {ButtonGroup} from "hme-design-system/src/components/buttonGroup/buttonGroup";

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
    // this.parent.querySelector('.add_menu_button').addEventListener('click', () => {
      // this.data.menu.push({
      //   title: 'Новый раздел',
      //   id: 3,
      //   dishes: [],
      // });
      // this.remove();
      // this.render();
    // });
    this.parent.querySelector('.add_menu_button').addEventListener('click', () => this.showAddMenuModal());
  }

  /**
   * Show modal menu with input to add menu
   */
  showAddMenuModal = () => {
    this.addMenuModalDiv = document.createElement('div');
    this.parent.appendChild(this.addMenuModalDiv);
    this.addMenuModalDiv.innerHTML = new Modal({
        title: 'Поменять название раздела?',
        centerContent: [new Input({
          label: '',
          placeholder: 'Новое название раздела',
          border: true,
          borderRadius: 'high',
          type: 'text',
          classes: ['menu_name_input'],
        }).render()],
        bottomContent: [
          ButtonGroup({
            row: true,
            buttons: [new Button({
              label: 'Отмена',
              color: 'green',
              classes: ['add_dish_modal_cancel'],
            }).render(),
              new Button({
                label: 'Принять',
                classes: ['add_dish_modal_accept'],
              }).render(),]
          }),
        ],
      }
    ).render();

    this.addMenuModalDiv.querySelector('.modal-close-button').addEventListener('click', this.closeAddMenuModal);
    this.addMenuModalDiv.querySelector('.add_dish_modal_cancel').addEventListener('click', this.closeAddMenuModal);
    this.addMenuModalDiv.querySelector('.add_dish_modal_accept').addEventListener('click', this.addMenu);
  }

  /**
   * Remove addMenuModal and remove event listeners
   */
  closeAddMenuModal = () => {
    this.addMenuModalDiv.querySelector('.modal-close-button').removeEventListener('click', this.closeAddMenuModal);
    this.addMenuModalDiv.remove();
  }

  /**
   * Take value of input and add menu
   */
  addMenu = () => {
    const menuName = this.addMenuModalDiv.querySelector('.menu_name_input').value;
    if (menuName !== '') {
      this.data.menu.push({
        title: menuName,
        id: 3,
        dishes: [],
      });
      this.closeAddMenuModal();
      this.remove();
      this.render();
    }
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