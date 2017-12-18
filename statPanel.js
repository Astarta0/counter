class StatPanel extends EventEmitter2{
    constructor(countersArray){
        super();
        this.countersArray = countersArray;

        this.on("newCounterWasAdded", this.updateAllStatistic);
        this.$summaryValue = $(".summary-stat-value");
        this.$averageValue = $(".average-stat-value");
        this.$minValue = $(".min-stat-value");
        this.$maxValue = $(".max-stat-value");
        this.commonMin = 0;
        this.commonMax = 0;
        this.commonAVG = 0;
        this.commonSUM = 0;
    }

    updateAllStatistic(countersArray){
        countersArray.forEach(this.getCommonMinimum, this);
        countersArray.forEach(this.getCommonMaximum, this);
        countersArray.forEach(this.getCommonSummary, this);
        this.commonAVG = parseFloat((this.commonSUM / countersArray.length).toFixed());

        this.$summaryValue.text(this.commonSUM);
        this.$averageValue.text(this.commonAVG);
        this.$minValue.text(this.commonMin);
        this.$maxValue.text(this.commonMax);
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
}