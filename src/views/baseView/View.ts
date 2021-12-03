/**
 * Base View class
 */
export class View {
  private parent: HTMLElement;
  private readonly routeTo: Function;
  private readonly controller: Object;
  /**
   * View constructor
   * @param {Object} parent HTMLElement for rendering View
   * @param {Object} routeTo Function for routing from View
   * @param {Object} controller Object for controlling View
   * */
  constructor({
    parent = document.body,
    routeTo = () => {},
    controller,
  }) {
    this.parent = parent;
    this.routeTo = routeTo;
    this.controller = controller;
  }

  /**
   * Base render method
   * @param {Object} props needed for rendering view
   */
  render(props = {}) {}

  /**
   * Method for setting up before rendering elements
   */
  settingUp() {}

  /**
   * Method for removing setted up listeners and other data
   */
  remove() {}
}
