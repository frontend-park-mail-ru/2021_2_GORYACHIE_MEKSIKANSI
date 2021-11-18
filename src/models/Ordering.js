import {postPay} from '../modules/api';
import eventBus from '../modules/eventBus';
import {OrderingEvents} from '../events/Ordering';
import {urls} from '../modules/urls';
import {CreateSnack, SnackBar} from '../components/snackBar/snackBar';
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
            CreateSnack({
              title: 'Ошибка оплаты!',
              status: 'red',
            });
          }
        })
        .catch(() => {
          CreateSnack({
            title: 'Сервер не отвечает!',
            status: 'red',
          });
        });
  }
}

export default new OrderingModel();
