class StatPanel extends EventEmitter2{
    constructor(){
        super();
        this.on("newCounterWasAdded", this.updateAllStatistic);

    }

    updateAllStatistic(){
        console.log("updateAllStatistic");
        debugger;
    }
}