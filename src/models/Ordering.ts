import {postPay} from '@/modules/api';
import eventBus from '@/modules/eventBus';
import {urls} from '@/modules/urls';
import {OrderingEvents} from '@/events/Ordering';
import {ResponseEvents} from '@/events/Responses';
import {CreateSnack} from '@/components/snackBar/snackBar';

/**
 * Ordering model class
 */
class OrderingModel {
/**
 * Request for pay on backend
 */
  requestPay() {
    postPay()
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            eventBus.emitEventListener(OrderingEvents.paymentSuccess, urls.order);
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
