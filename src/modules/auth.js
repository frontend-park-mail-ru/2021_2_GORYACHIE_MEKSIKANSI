class EventBus {
    constructor() {
        this.eventTopics = {};
    }

    addEventListener(eventName, listener) {
        if (!this.eventTopics[eventName] || this.eventTopics[eventName].length < 1) {
            this.eventTopics[eventName] = [];
        }

        this.eventTopics[eventName].push(listener);
    };

    unsubscribe(eventName, listener) {
        if (!this.eventTopics[eventName] || this.eventTopics[eventName].length < 1)
            return;

        delete this.eventTopics[eventName];
    };

    getListener(eventName) {
        return this.eventTopics[eventName];
    }

    emitEventListener(eventName, params) {
        if (!this.eventTopics[eventName] || this.eventTopics[eventName].length < 1)
            return;
        this.eventTopics[eventName].forEach(function(listener) {
            listener(!!params ? params : {});
        });
    }
}

export default new EventBus()