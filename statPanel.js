class StatPanel extends EventEmitter2{
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
        console.log(this);
        debugger;
        this.getMaxFromCurrentNumbersOfCounters.apply(this);
        this.getMinFromCurrentNumbersOfCounters.apply(this);
        this.getSUMFromCurrentNumbersOfCounters.apply(this);
        this.getAVGFromCurrentNumbersOfCounters.apply(this);

        this.setValues();
    }

    updateAllStatistic(){
        debugger;
        this.countersArray.forEach(this.getCommonMinimum, this);
        this.countersArray.forEach(this.getCommonMaximum, this);
        this.commonSUM = 0;
        this.countersArray.forEach(this.getCommonSummary, this);
        this.commonAVG = parseFloat((this.commonSUM /  this.countersArray.length).toFixed());

        this.setValues();
    }

    getSUMFromCurrentNumbersOfCounters(){
        this.commonSUM = 0;
        for (var i=0; i <= (this.countersArray.length)-1; i++){
            this.commonSUM = this.commonSUM + this.countersArray[i].currentNumber;
        }
    }

    getAVGFromCurrentNumbersOfCounters(){
        for (var i=0; i <= (this.countersArray.length)-1; i++){
            this.commonAVG = parseFloat((this.commonSUM /  this.countersArray.length).toFixed());
        }
    }

    getMaxFromCurrentNumbersOfCounters(){
        for (var i=0; i <= (this.countersArray.length)-1; i++){
            this.currentNumbersArray.push(this.countersArray[i].currentNumber);
        }
        this.commonMax = Math.max.apply( Math, this.currentNumbersArray );
        this.currentNumbersArray = [];
    }

    getMinFromCurrentNumbersOfCounters(){
        for (var i=0; i <= (this.countersArray.length)-1; i++){
            this.currentNumbersArray.push(this.countersArray[i].currentNumber);
        }
        this.commonMin = Math.min.apply( Math, this.currentNumbersArray );
        this.currentNumbersArray = [];
    }

    getCommonMinimum(arrElement, index, array){
        if ((arrElement.currentNumber < this.commonMin) || this.commonMin === 0){
            this.commonMin = arrElement.currentNumber;
        }
    }

    getCommonMaximum(arrElement, index, array){
        if ((arrElement.currentNumber > this.commonMax) || this.commonMax === 0){
            this.commonMax = arrElement.currentNumber;
        }
    }

    getCommonSummary(arrElement, index, array){
        this.commonSUM = this.commonSUM + arrElement.currentNumber;
    }

    setValues(){
        this.$summaryValue.text(this.commonSUM);
        this.$averageValue.text(this.commonAVG);
        this.$minValue.text(this.commonMin);
        this.$maxValue.text(this.commonMax);
    }
}