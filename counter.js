class Counter extends EventEmitter2 {
    constructor(min, max, counterTemplate, controlPanel) {
        super();
        this.min = min;
        this.max = max;
        this.controlPanel = controlPanel;

        this.counterTemplate = counterTemplate;
        this.currentNumber = this.getRandomInRange();
        this.randomString = writtenNumber(this.currentNumber);
        this.renderInitialData();

        this.controlPanel.on("clickResetAll", this.resetData.bind(this));
        this.controlPanel.on("clickDecrementAll", this.decrementData.bind(this));
        this.controlPanel.on("clickIncrementAll", this.incrementData.bind(this));
        this.controlPanel.on("clickRandomAll", this.setRandomData.bind(this));
    }

    //methods
    renderInitialData() {
        this.$inputCountersArea = $(".counters-container");
        this.counter = $(this.counterTemplate);
        this.$inputCountersArea.append(this.counter);

        this.$inputNumberArea = this.counter.find(".input-value");
        this.$inputMinArea = this.counter.find(".min-value");
        this.$inputMaxArea = this.counter.find(".max-value");

        this.$inputNumberArea.text(this.randomString);
        this.$inputMinArea.text(this.min);
        this.$inputMaxArea.text(this.max);

        this.$reset = this.counter.find( ".reset" );
        this.$dec = this.counter.find( ".dec" );
        this.$inc = this.counter.find( ".inc" );
        this.$random = this.counter.find( ".random" );

        const self = this;
        //handlers definition
        this.$reset.click(function() {
            console.log("Counter: reset click");
            addStyleForClickedButtons(self.$reset);
            self.resetData(self.$reset);
        });

        this.$dec.click(function() {
            console.log("Counter: decrement click");
            addStyleForClickedButtons(self.$dec);
            self.decrementData(self.$dec);
        });

        this.$inc.click(function() {
            console.log("Counter: increment click");
            addStyleForClickedButtons(self.$inc);
            self.incrementData(self.$inc);
        });

        this.$random.click(function () {
            console.log("Counter: random click");
            addStyleForClickedButtons(self.$random);
            self.setRandomData(self.$random);
        });
    }

    getRandomInRange() {
        return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    }

    resetData() {
        this.currentNumber = this.min;
        this.setValue();
        this.emit("Counter was changed");
    }

    decrementData(){
        if(this.currentNumber > this.min){
            --this.currentNumber;
            this.setValue();
        }
        this.emit("Counter was changed");
    }

    incrementData(){
        if(this.currentNumber < this.max){
            ++this.currentNumber;
            this.setValue();
        }
        this.emit("Counter was changed");
    }

    setRandomData(){
        this.currentNumber = this.getRandomInRange();
        this.setValue();
        this.emit("Counter was changed");
    }

    setValue() {
        this.$inputNumberArea.text(writtenNumber(this.currentNumber));
    }
}