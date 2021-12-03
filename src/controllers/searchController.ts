import eventBus from '@/modules/eventBus';
import {urls} from '@/modules/urls';
import {SearchEvents} from '@/events/Search';
import SearchModel from '@/models/Search';
import {SearchView} from '@/views/searchView/searchView';

/**
 * Search page controller
 */
export class SearchController {
  private readonly routeTo: Function;
  private parent: HTMLElement;
  private readonly searchView: SearchView;
  /**
   * Constructor for controller
   * @param {HTMLElement} parent parent html element
   * @param {Function} routeTo router function for routing
   */
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {},
  }) {
    this.routeTo = routeTo;
    this.parent = parent;
    this.searchView = new SearchView({
      parent: parent,
      routeTo: this.routeTo,
      controller: this});


    eventBus.addEventListener(SearchEvents.searchSuccess, this.saveResultAndRoute);
    eventBus.addEventListener(SearchEvents.searchRequest, this.makeSearchRequest);
  }

  /**
   * function that save result of searching and route
   * on this page and render this result in view,
   * see function render
   * @param {string} result
   */
  saveResultAndRoute = (result) => {
    this.searchResult = result;
    this.routeTo(urls.search);
  }

  /**
   * Function that catch search request event
   * and make request to the server by model
   * @param {string} searchText
   */
  makeSearchRequest = (searchText) => {
    SearchModel.getRestaurantsSearch(searchText.trim());
  }

  /**
   * Rendering search page with restaurants
   * by saved result by event
   */
  render() {
    this.searchView.render(this.searchResult);
  }

  /**
   * Removing listeners from home page
   */
  remove() {
    this.searchView.remove();
  }
}
