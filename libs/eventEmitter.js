class EventEmitter2 {
    constructor(){
        this.eventsArray = [];
        this.argumentsArray = [];

    }

    // methods
    on(eventName, func){
        this.eventsArray.push(
            {[eventName]: func}
        );
    }

    emit(eventName){
        for (var i = 1; i < arguments.length; i++) {
            this.argumentsArray.push(arguments[i]);
        }
        console.log(this.argumentsArray);
        this.eventsArray.forEach((eventObj) => {
            if (eventName in eventObj){
                (eventObj[eventName]).apply(null, this.argumentsArray);
            }
        });
        this.argumentsArray = [];
    }

    removeListener(eventName, func){
        this.eventsArray.forEach((eventObj, position) => {
            if (eventName in eventObj){
                if (eventObj[eventName] === func){
                    this.eventsArray.splice(position, 1);
                    console.log(this.eventsArray);
                }
            }
        });
    }

}