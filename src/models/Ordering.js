import {postPay} from '../modules/api';
import eventBus from '../modules/eventBus';
import {OrderingEvents} from '../events/Ordering';
import {urls} from '../modules/urls';
import {SnackBar} from '../components/snackBar/snackBar';
import {ResponseEvents} from 'Events/Responses.js';

/**
 * Ordering model class
 */
class OrderingModel {
/**
 * Reauest for pay on backend
 */
  requestPay() {
    postPay()
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            eventBus.emitEventListener(OrderingEvents.paymentSuccess, urls.order.url);
          } else {
            const snack = new SnackBar({
              message: 'Ошибка оплаты!',
              status: 'red',
              position: 'tr',
              width: '500px',
              fixed: true,
            });
            snack.settingUp();
            snack.Open();
          }
        })
        .catch(() => {
          const snack = new SnackBar({
            message: 'Сервер не отвечает!',
            status: 'red',
            position: 'tr',
            width: '500px',
            fixed: true,
          });
          snack.settingUp();
          snack.Open();
        });
  }
}

export default new OrderingModel();
