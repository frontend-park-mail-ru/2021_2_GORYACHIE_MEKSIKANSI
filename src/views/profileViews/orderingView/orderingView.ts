import Navbar from '@/components/navbar/navbar';
import EventBus from '@/modules/eventBus';
import {OrderingEvents} from '@/events/Ordering';
import baseProfilePage from '@/views/profileViews/baseProfilePage.hbs';
import orderDelivery from '@/components/cartOrder/orderDelivery.hbs';
import orderSummary from '@/components/cartOrder/orderSummary.hbs';
import userStore from '@/modules/reducers/userStore';
import cartStore from '@/modules/reducers/cartStore';
import {BaseProfileView} from '@/views/profileViews/baseProfileView';
import {Modal} from 'hme-design-system/src/components/modal/modal';
import {Card} from 'hme-design-system/src/components/card/card';
import {Order} from 'hme-design-system/src/components/contentBlock/order/order';
import {CreateSnack} from '@/components/snackBar/snackBar';
import {paymentMethods} from '@/modules/consts';
import {OrderingController} from "@/controllers/orderingController";

/**
 * Profile view class
 */
export class OrderingView extends BaseProfileView {
  private confirmDiv: HTMLDivElement;
  private controller: OrderingController;
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
  }

  /**
   * Method that render login page in inner HTML of element
   * @param {Object} props objects relating for rendering view
   */
  render(props = {}) {
    super.render();
    EventBus.addEventListener(OrderingEvents.addressRefreshed, this.refresh);
    Navbar.render();

    let order = {};
    if (cartStore.getState().restaurant.id !== -1) {
      order = {
        historyOrder: false,
        ...cartStore.getState().restaurant,
        items: cartStore.getState().cart,
        dCost: cartStore.getState().cost.dCost,
        sumCost: cartStore.getState().cost.sumCost,
      };
    }

    this.parent.innerHTML += baseProfilePage({
      pageTitle: 'Оформление заказа',
      content: orderDelivery({
        restaurant: cartStore.getState().restaurant.id !== -1 ? cartStore.getState().restaurant : '',
        address: userStore.getState().address.fullAddress,
      }) + Order(order),
      rightMenu: orderSummary({
        sumCost: cartStore.getState().cost ? cartStore.getState().cost.sumCost : '',
      })});
    this.parent.querySelector('.cart-order-summary__pay-button').addEventListener('click', this.showConfirm);
  }

  refresh = () => {
    this.remove();
    this.render();
  }

  showConfirm = () => {
    if (cartStore.getState().restaurant.id !== -1) {
      if (this.parent.querySelector<HTMLInputElement>('.card').checked) {
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
      methodPay: this.parent.querySelector<HTMLInputElement>('.card').checked ? paymentMethods.card : paymentMethods.cash,
      porch: Number((<HTMLInputElement>document.getElementById('porch')).value),
      floor: Number((<HTMLInputElement>document.getElementById('floor')).value),
      flat: (<HTMLInputElement>document.getElementById('flat')).value,
      intercom: (<HTMLInputElement>document.getElementById('intercom')).value,
      comment: (<HTMLInputElement>document.getElementById('comment')).value,
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
    super.remove();
    Navbar.remove();

    this.removeConfirm();
    this.parent.innerHTML = '';
  }
}
