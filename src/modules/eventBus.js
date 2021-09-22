class EventBus {
    constructor() {
        this.eventTopics = {};
    }

    /**
     * add new event to listen
     *
     * @param {string} eventName
     * @param {Function} listener
     * @return null
     *
     */
    addEventListener(eventName, listener) {
        if (!this.eventTopics[eventName] || this.eventTopics[eventName].length < 1) {
            this.eventTopics[eventName] = [];
        }

        this.eventTopics[eventName].push(listener);
    };

    /**
     * delete listener from event bus
     *
     * @param {string} eventName
     * @param {Function} listener
     * @return null
     *
     */
    unsubscribe(eventName, listener) {
        if (!this.eventTopics[eventName] || this.eventTopics[eventName].length < 1)
            return;

        delete this.eventTopics[eventName];
    };

    getListener(eventName) {
        return this.eventTopics[eventName];
    }


    /**
     * trigger event listener of event
     *
     * @param {string} eventName
     * @param {Object} params
     * @return null
     *
     */
    emitEventListener(eventName, params) {
        if (!this.eventTopics[eventName] || this.eventTopics[eventName].length < 1)
            return;
        this.eventTopics[eventName].forEach(function(listener) {
            listener(!!params ? params : {});
        });
    }
}

export default new EventBus()