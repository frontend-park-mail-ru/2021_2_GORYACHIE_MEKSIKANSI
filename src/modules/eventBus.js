/**
 * Class event bus, observer pattern
 */
class EventBus {
  /**
   * Constructor for event bus
   */
  constructor() {
    this.eventTopics = {};
  }

  /**
     * add new event to listen
     * @param {string} eventName
     * @param {Function} listener
     */
  addEventListener(eventName, listener) {
    if (!this.eventTopics[eventName] ||
        this.eventTopics[eventName].length < 1) {
      this.eventTopics[eventName] = [];
    }

    this.eventTopics[eventName].push(listener);
  }

  /**
   * delete listener from event bus
   * @param {string} eventName
   * @param {Function} listener
   * @return {Object}
   */
  unsubscribe(eventName) {
    if (!this.eventTopics[eventName] ||
        this.eventTopics[eventName].length < 1) {
      return undefined;
    }

    delete this.eventTopics[eventName];
  }

  /**
   * Get listener for event
   * @param {string} eventName
   * @return {*}
   */
  getListener(eventName) {
    return this.eventTopics[eventName];
  }


  /**
     * Trigger event listener of event
     * @param {string} eventName
     * @param {Object} params
     */
  emitEventListener(eventName, params) {
    if (!this.eventTopics[eventName] ||
        this.eventTopics[eventName].length < 1) {
      return;
    }
    this.eventTopics[eventName].forEach(function(listener) {
      listener(params ? params : {});
    });
  }
}

export default new EventBus();
