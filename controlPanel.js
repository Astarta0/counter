class ControlPanel extends EventEmitter2{
    constructor(){
        super();
        this.$resetAllBtn = $(".main-control-panel .reset");
        this.$decrementAllBtn = $(".main-control-panel .dec");
        this.$incrementAllBtn = $(".main-control-panel .inc");
        this.$randomAllBtn = $(".main-control-panel .random");

        this.$resetAllBtn.click(this.emitResetAllCounts.bind(this));
        this.$decrementAllBtn.click(this.emitDecrementAllCounts.bind(this));
        this.$incrementAllBtn.click(this.emitIncrementAllCounts.bind(this));
        this.$randomAllBtn.click(this.emitRandomAllCounts.bind(this));
    }

    emitResetAllCounts(){
        console.log("Control Panel: reset all click");
        addStyleForClickedButtons(this.$resetAllBtn);
        this.emit("clickResetAll");
    }
    emitDecrementAllCounts(){
        console.log("Control Panel: decrement all click");
        addStyleForClickedButtons(this.$decrementAllBtn);
        this.emit("clickDecrementAll");
    }
    emitIncrementAllCounts(){
        console.log("Control Panel: increment all click");
        addStyleForClickedButtons(this.$incrementAllBtn);
        this.emit("clickIncrementAll");
    }
    emitRandomAllCounts(){
        console.log("Control Panel: random all click");
        addStyleForClickedButtons(this.$randomAllBtn);
        this.emit("clickRandomAll");
    }
}