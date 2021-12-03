import Navbar from '@/components/navbar/navbar';
import orderDelivery from '@/components/cartOrder/orderDelivery.hbs';
import orderSummary from '@/components/cartOrder/orderSummary.hbs';
import baseProfilePage from '@/views/profileViews/baseProfilePage.hbs';
import {BaseProfileView} from '@/views/profileViews/baseProfileView';

/**
 * Profile view class
 */
export class CartView extends BaseProfileView {
  private parent: HTMLElement;
  private readonly routeTo: Function;
  private controller: Object;
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
  }

  /**
   * Method that render login page in inner HTML of element
   * @param {Object} props objects relating for rendering view
   */
  render(props: any = {}) {
    super.render();
    Navbar.render();
    this.parent.innerHTML += baseProfilePage({
      pageTitle: 'Оформление заказа',
      content: orderDelivery(props.orders),
      rightMenu: orderSummary({})});
    document.querySelector<HTMLElement>('.footer').style.marginTop = '0';
  }

  /**
   * Method calling by
   * @param {string} event
   */
  _submitListener(event) {}

  /**
   * Method for setting up before rendering elements
   */
  settingUp() {
    const form = document.getElementById('form_submit');
    form.addEventListener('click', this._submitListener.bind(this));
  }

  /**
   * Method for removing setted up listeners and other data
   */
  remove() {
    super.remove();
    Navbar.remove();
    this.parent.innerHTML = '';
  }
}
