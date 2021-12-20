import Navbar from 'Components/navbar/navbar.js';
import {urls} from 'Modules/urls.js';
import EventBus from 'Modules/eventBus.js';
import {OrderingEvents} from 'Events/Ordering.js';
import baseProfilePage from '../baseProfilePage.hbs';
import Address from 'Modules/lsAddress.js';
import orderDelivery from 'Components/cartOrder/orderDelivery.hbs';
import orderSummary from 'Components/cartOrder/orderSummary.hbs';
import userStore from 'Modules/reducers/userStore';
import cartStore from 'Modules/reducers/cartStore';
import {BaseProfileView} from '../baseProfileView';
import {Modal} from 'hme-design-system/src/components/modal/modal';
import {Card} from 'hme-design-system/src/components/card/card';
import {Order} from 'hme-design-system/src/components/contentBlock/order/order';
import {CreateSnack} from '../../../components/snackBar/snackBar';
import {paymentMethods} from '../../../modules/consts';
import {RestaurantEvents} from '../../../events/Restaurant';

// eslint-disable-next-line valid-jsdoc
/**
 * Profile view class
 */
export class OrderingView extends BaseProfileView {
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
    EventBus.addEventListener(OrderingEvents.addressRefreshed, this.refresh);
    EventBus.addEventListener(RestaurantEvents.restaurantCartUpdateSuccess, this.refreshCart);
    this.navbar.render();

    this.drawPageContent(); // rendering
  }

  refresh = () => {
    this.remove();
    this.render();
  }

  drawPageContent = () => {
    let order = {};
    if (cartStore.getState().restaurant.id !== -1) {
      order = {
        historyOrder: false,
        ...cartStore.getState().restaurant,
        items: cartStore.getState().cart,
        dCost: cartStore.getState().cost?.dCost,
        sumCost: cartStore.getState().cost?.sumCost,
      };
    }
    this.parent.innerHTML += baseProfilePage({
      pageTitle: 'Оформление заказа',
      content: orderDelivery({
        restaurant: cartStore.getState().restaurant.id !== -1 ? cartStore.getState().restaurant : '',
        address: userStore.getState().address?.fullAddress,
      }) + Order(order),
      rightMenu: orderSummary({
        sumCost: cartStore.getState().cost ? cartStore.getState().cost?.sumCost : '',
      })});
    this.parent.querySelector('.cart-order-summary__pay-button').addEventListener('click', this.showConfirm);
    document.getElementById('promocode_button').addEventListener('click', this.confirmPromocode);
  }

  refreshCart = () => {
    this.parent.querySelector('.base-profile-page__content').remove();
    this.drawPageContent();
  }

  confirmPromocode = () => {
    const promocode = document.getElementById('promocode').value;
    this.controller.confirmPromocode(promocode);
  }

  showConfirm = () => {
    if (cartStore.getState().restaurant.id !== -1) {
      if (this.parent.querySelector('.card').checked) {
        this.confirmDiv = document.createElement('div');
        this.confirmDiv.innerHTML = new Modal({
          title: 'Онлайн оплата',
          centerContent: [new Card({sumCost: cartStore.getState().cost.sumCost}).render()],
        }).render();
        this.parent.appendChild(this.confirmDiv);
        document.body.style.overflowY = 'hidden';
        this.confirmDiv.querySelector('.modal-close-button').addEventListener('click', this.removeConfirm);
        this.confirmDiv.querySelector('.card__pay-button').addEventListener('click', this.callControllerCreateOrder);
      } else {
        this.callControllerCreateOrder();
      }
    } else {
      CreateSnack({
        title: 'Закажите сначала что-нибудь)',
        status: 'orange',
      });
    }
  }

  getOrderInfoFromInputs = () => {
    return {
      methodPay: this.parent.querySelector('.card').checked ? paymentMethods.card : paymentMethods.cash,
      porch: Number(document.getElementById('porch').value),
      floor: Number(document.getElementById('floor').value),
      flat: document.getElementById('flat').value,
      intercom: document.getElementById('intercom').value,
      comment: document.getElementById('comment').value,
    };
  }

  callControllerCreateOrder = () => {
    this.controller.createOrder(this.getOrderInfoFromInputs());
  }

  removeConfirm = () => {
    if (this.confirmDiv) {
      this.confirmDiv.querySelector('.modal-close-button').removeEventListener('click', this.removeConfirm);
      this.confirmDiv.remove();
    }
    document.body.style.overflowY = 'scroll';
  }

  /**
   * Method for removing setted up listeners and other data
   */
  remove() {
    EventBus.unsubscribe(RestaurantEvents.restaurantCartUpdateSuccess, this.refreshCart);
    super.remove();
    this.navbar.remove();

    this.removeConfirm();
    this.parent.innerHTML = '';
  }
}
