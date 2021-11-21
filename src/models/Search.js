import eventBus from 'Modules/eventBus.js';
import {SearchEvents} from "../events/Search";
import {ordersHistoryBodyMock, restaurantsBodyMock} from "../views/mocks";

/**
 * Class Search Model
 */
class SearchModel {
  /**
   * getting restaurants with the search name
   */
  getRestaurantsSearch(searchText) {
    eventBus.emitEventListener(SearchEvents.searchSuccess, {
      title: searchText,
      ...restaurantsBodyMock,
    });
  }
}

export default new SearchModel();