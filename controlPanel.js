class ControlPanel extends EventEmitter2{
    constructor(){
        super();
        this.$resetAllBtn = $(".main-control-panel .reset");
        this.$decrementAllBtn = $(".main-control-panel .dec");
        this.$incrementAllBtn = $(".main-control-panel .inc");
        this.$randomAllBtn = $(".main-control-panel .random");
    }

    emitEventFromControlPanel(event){
        this.emit(event.data.eventName, event.data.eventName);
    }
}