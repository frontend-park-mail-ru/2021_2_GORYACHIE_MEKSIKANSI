import {View} from '../baseView/View';

/**
 * Baase profile view class
 */
export class BaseProfileView extends View {
  /**
   * Constructor for base class
   * @param {HTMLElement} parent
   * @param {Function} routeTo
   * @param {Class} controller
   */
  constructor({
    parent = document.body,
    routeTo = () => {},
    controller,
  }) {
    super({
      parent, routeTo, controller,
    });
  }

  /**
   * Method that render login page in inner HTML of element
   * @param {Object} props objects relating for rendering view
   */
  render(props = {}) {
    super.render(props);
    document.getElementById('app').style.backgroundColor = '#f6f6f6';
    console.log('HERE');
  }

  /**
   * Method for setting up before rendering elements
   */
  settingUp() {}

  /**
   * Method for removing setted up listeners and other data
   */
  remove() {
    super.remove();
    document.getElementById('app').style.backgroundColor = '';
  }
}
