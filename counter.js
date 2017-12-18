class Counter extends EventEmitter2{
    constructor(min, max, millisecondsToWait, counterTemplate, controlPanel) {
        super();
        this.min = min;
        this.max = max;
        this.millisecondsToWait = millisecondsToWait;
        this.pressedClass = "pressed";
        this.controlPanel = controlPanel;

        this.counterTemplate = counterTemplate;
        this.currentNumber = this.getRandomInRange(this.min, this.max);
        this.randomString = writtenNumber(this.currentNumber);
        this.renderInitialData();

        this.controlPanel.on("clickResetAll", this.resetData.bind(this, controlPanel.$resetAllBtn));
        this.controlPanel.on("clickDecrementAll", this.decrementData.bind(this, controlPanel.$decrementAllBtn));
        this.controlPanel.on("clickIncrementAll", this.incrementData.bind(this, controlPanel.$incrementAllBtn));
        this.controlPanel.on("clickRandomAll", this.setRandomData.bind(this, controlPanel.$randomAllBtn));
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
            self.emit("Counter was changed");
        });

        this.$dec.click(function() {
            console.log("Counter: decrement click");
            addStyleForClickedButtons(self.$dec);
            self.decrementData(self.$dec);
            self.emit("Counter was changed");
        });

        this.$inc.click(function() {
            console.log("Counter: increment click");
            addStyleForClickedButtons(self.$inc);
            self.incrementData(self.$inc);
            self.emit("Counter was changed");
        });

        this.$random.click(function () {
            console.log("Counter: random click");
            addStyleForClickedButtons(self.$random);
            self.setRandomData(self.$random);
            self.emit("Counter was changed");
        });
    }

    getRandomInRange(min, max) {
        return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    }

    resetData(btn) {
        debugger;
        this.currentNumber = this.min;
        this.setValue(this.currentNumber);
    }

    decrementData(btn){
        if(this.currentNumber > this.min){
            this.setValue(this.currentNumber = --this.currentNumber);
        }
    }

    incrementData(btn){
        if(this.currentNumber < this.max){
            this.setValue(this.currentNumber = ++this.currentNumber);
        }
    }

    setRandomData(btn){
        this.currentNumber = this.getRandomInRange(this.min, this.max);
        this.setValue(this.currentNumber);
    }

    setValue(number) {
        this.$inputNumberArea.text(writtenNumber(number));
    }
}