class ControlPanel extends EventEmitter2{
    constructor(){
        super();
        this.$resetAllBtn = $(".main-control-panel .reset");
        this.$decrementAllBtn = $(".main-control-panel .dec");
        this.$incrementAllBtn = $(".main-control-panel .inc");
        this.$randomAllBtn = $(".main-control-panel .random");
    }

    emitResetAllCounts(){
        this.emit("clickResetAll");
    }
    emitDecrementAllCounts(){
        this.emit("clickDecrementAll");
    }
    emitIncrementAllCounts(){
        this.emit("clickIncrementAll");
    }
    emitRandomAllCounts(){
        this.emit("clickRandomAll");
    }
}