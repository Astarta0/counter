class StatPanel extends EventEmitter2 {
    constructor(countersArray){
        super();
        this.countersArray = countersArray;
        this.currentNumbersArray = [];
        this.on("newCounterWasAdded", this.addCountersHandler);
        this.$summaryValue = $(".summary-stat-value");
        this.$averageValue = $(".average-stat-value");
        this.$minValue = $(".min-stat-value");
        this.$maxValue = $(".max-stat-value");
        this.commonMin = 0;
        this.commonMax = 0;
        this.commonAVG = 0;
        this.commonSUM = 0;
    }

    addCountersHandler(){
        this.countersArray[this.countersArray.length-1].on("Counter was changed", this.updateStatisticAfterCountWasChanged.bind(this));
        this.updateAllStatistic();
    }

    updateStatisticAfterCountWasChanged(){
        this.getMaxFromCurrentNumbersOfCounters();
        this.getMinFromCurrentNumbersOfCounters();
        this.getSUMFromCurrentNumbersOfCounters();
        this.getAVGFromCurrentNumbersOfCounters();
        this.setValues();
    }

    updateAllStatistic(){
        this.countersArray.forEach((counter) => this.getCommonMinimum(counter));
        this.countersArray.forEach(this.getCommonMaximum, this);
        this.commonSUM = 0;
        this.countersArray.forEach(this.getCommonSummary, this);
        this.getAVGFromCurrentNumbersOfCounters();
        this.setValues();
    }

    getSUMFromCurrentNumbersOfCounters(){
        this.commonSUM = 0;
        this.countersArray.forEach((counter) => {
            this.commonSUM = this.commonSUM + counter.currentNumber;
        });
    }

    getAVGFromCurrentNumbersOfCounters(){
       this.commonAVG = parseFloat((this.commonSUM /  this.countersArray.length).toFixed());
    }

    getMaxFromCurrentNumbersOfCounters(){
        this.countersArray.forEach((counter) => {
            this.currentNumbersArray.push(counter.currentNumber);
        });

        this.commonMax = Math.max.apply( Math, this.currentNumbersArray );
        this.currentNumbersArray = [];
    }

    getMinFromCurrentNumbersOfCounters(){
        this.countersArray.forEach((counter) => {
            this.currentNumbersArray.push(counter.currentNumber);
        });

        this.commonMin = Math.min.apply( Math, this.currentNumbersArray );
        this.currentNumbersArray = [];
    }

    getCommonMinimum(counter){
        if ((counter.currentNumber < this.commonMin) || this.commonMin === 0){
            this.commonMin = counter.currentNumber;
        }
    }

    getCommonMaximum(counter){
        if ((counter.currentNumber > this.commonMax) || this.commonMax === 0){
            this.commonMax = counter.currentNumber;
        }
    }

    getCommonSummary(arrElement){
        this.commonSUM = this.commonSUM + arrElement.currentNumber;
    }

    setValues(){
        this.$summaryValue.text(this.commonSUM);
        this.$averageValue.text(this.commonAVG);
        this.$minValue.text(this.commonMin);
        this.$maxValue.text(this.commonMax);
    }
}