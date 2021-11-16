import Navbar from 'Components/navbar/navbar.js';
import baseRestaurantProfilePage from '../restaurantProfileBase.hbs';
import styles from '../restaurantProfilePage.scss'
import {BaseProfileView} from '../../profileViews/baseProfileView';
import {DishBlock} from "hme-design-system/src/components/dishBlock/dishBlock";
import {List} from "hme-design-system/src/components/list/list";
import {Button, ButtonIcon} from "hme-design-system/src/components/button/button";
import {editSvg, trashSvg} from "../../../modules/consts";
import {menuRestaurantProfileMenuBodyMock} from "../../mocks";
import {ChangeInputModal} from '../../../components/changeModal/changeModal';

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
    if (this.data.menu) {
    this.data.menu.forEach((menu) => {
        const objList = [];
        if (menu.dishes) {
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
        }
      });
    }

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
      button.addEventListener('click', this.showChangeMenuModal);
    });
    this.parent.querySelectorAll('.trash_button').forEach((button) => {
      button.addEventListener('click', this.removeMenu);
    })
    this.parent.querySelector('.add_menu_button').addEventListener('click', this.showAddMenuModal);
  }

  removeMenu = (e) => {
    const listId = e.target.closest('.list-title').id;
    this.data.menu = this.data.menu.filter((item) => {
      return item.title !== listId;
    });
    console.log(this.data.menu);
    this.remove();
    this.render();
  }

  showAddMenuModal = () => {
    this.showAddMenuModalDiv = document.createElement('div');
    this.showAddMenuModalDiv.innerHTML = ChangeInputModal({title: 'Хотите добавить раздел?'});
    this.parent.appendChild(this.showAddMenuModalDiv);
    this.showAddMenuModalDiv.querySelector('.modal_accept').addEventListener('click', this.addMenu);
    this.showAddMenuModalDiv.querySelector('.modal_cancel').addEventListener('click', this.removeAddMenuModal);
    this.showAddMenuModalDiv.querySelector('.modal-close-button').addEventListener('click', this.removeAddMenuModal);
  }

  removeAddMenuModal = () => {
    this.showAddMenuModalDiv.querySelector('.modal_accept').removeEventListener('click', this.addMenu);
    this.showAddMenuModalDiv.querySelector('.modal_cancel').removeEventListener('click', this.removeAddMenuModal);
    this.showAddMenuModalDiv.querySelector('.modal-close-button').removeEventListener('click', this.removeAddMenuModal);
    this.showAddMenuModalDiv.remove();
  }

  showChangeMenuModal = (e) => {
    console.log(e.target.closest('.list-title').id);
    this.showChangeMenuModalId = e.target.closest('.list-title').id;
    this.showChangeMenuModalDiv = document.createElement('div');
    this.showChangeMenuModalDiv.innerHTML = ChangeInputModal({title: 'Хотите изменить название меню?'});
    this.parent.appendChild(this.showChangeMenuModalDiv);
    this.showChangeMenuModalDiv.querySelector('.modal_accept').addEventListener('click', this.changeMenu);
    this.showChangeMenuModalDiv.querySelector('.modal_cancel').addEventListener('click', this.removeChangeMenuModal);
    this.showChangeMenuModalDiv.querySelector('.modal-close-button').addEventListener('click', this.removeChangeMenuModal);
  }

  removeChangeMenuModal = () => {
    this.showChangeMenuModalDiv.querySelector('.modal_accept').removeEventListener('click', this.changeMenu);
    this.showChangeMenuModalDiv.querySelector('.modal_cancel').removeEventListener('click', this.removeChangeMenuModal);
    this.showChangeMenuModalDiv.querySelector('.modal-close-button').removeEventListener('click', this.removeChangeMenuModal);
    this.showChangeMenuModalDiv.remove();
  }

  /**
   * Take value of input and add menu
   */
  addMenu = () => {
    const value = this.showAddMenuModalDiv.querySelector('.modal_input').value;
    if (value !== '') {
      this.data.menu.push({
        title: value,
        id: 3,
        dishes: [],
      });
      this.remove();
      this.render();
    }
  }

  changeMenu = () => {
    const value = this.showChangeMenuModalDiv.querySelector('.modal_input').value;
    if (value !== '') {
      this.data.menu.find((item) => {
        console.log(item.id, this.showChangeMenuModalId);
        return item.title === this.showChangeMenuModalId;
      }).title = value;
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