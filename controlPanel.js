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
        addStyleForClickedButtons(this.$resetAllBtn);
        this.emit("clickResetAll");
    }
    emitDecrementAllCounts(){
        addStyleForClickedButtons(this.$decrementAllBtn);
        this.emit("clickDecrementAll");
    }
    emitIncrementAllCounts(){
        addStyleForClickedButtons(this.$incrementAllBtn);
        this.emit("clickIncrementAll");
    }
    emitRandomAllCounts(){
        addStyleForClickedButtons(this.$randomAllBtn);
        this.emit("clickRandomAll");
    }
}