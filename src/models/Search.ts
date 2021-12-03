import eventBus from '@/modules/eventBus';
import {SearchEvents} from '@/events/Search';
import {ResponseEvents} from '@/events/Responses';
import {search} from '@/modules/api';

/**
 * Class Search Model
 */
class SearchModel {
  /**
   * getting restaurants with the search name
   * @param {string} searchText
   */
  getRestaurantsSearch(searchText) {
    search(searchText)
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            eventBus.emitEventListener(SearchEvents.searchSuccess, {
              title: searchText,
              restaurants: response.body.restaurants,
            });
          } else {
            eventBus.emitEventListener(SearchEvents.searchSuccess, {
              title: searchText,
              restaurants: [],
            });
          }
        })
        .catch(() => {
          eventBus.emitEventListener(SearchEvents.searchSuccess, {
            title: searchText,
            restaurants: [],
          });
        });
  }
}

export default new SearchModel();
