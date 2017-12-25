class EventEmitter2 {
    constructor(){
        this.eventsHandlers = {};
    }

    // methods
    on(eventName, func){
        if (Array.isArray(this.eventsHandlers[eventName])) {
            this.eventsHandlers[eventName].push(func);
        } else {
            this.eventsHandlers[eventName] = [func];
        }
    }

    emit(eventName){
        let argumentsArray = [];
        // TODO: привести к массиву, shift и тд
        for (var i = 1; i < arguments.length; i++) {
            argumentsArray.push(arguments[i]);
        }
        if(Array.isArray(this.eventsHandlers[eventName])){
            this.eventsHandlers[eventName].forEach((handler) => {
                handler.apply(null, argumentsArray);
            });
        }
    }

    removeListener(eventName, func){
        if(Array.isArray(this.eventsHandlers[eventName])){
            this.eventsHandlers[eventName].forEach((handler, position, arr ) => {
                if (func === handler) {
                    arr.splice(position, 1);
                }
            });
        }
    }

}