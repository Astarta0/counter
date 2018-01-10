class Counter extends EventEmitter2 {
    constructor(controlPanel, indexOfCounters) {
        super();
        this.counterNumber = indexOfCounters;
        this.min = 10;
        this.max = 50;
        this.controlPanel = controlPanel;

        this.counterTemplate = `
        <div class="counter">
            <div class="counter-wrapper">
                <div class="view">
                    <div class="min-wrapper">
                        <div class="container">
                            <div class="title">MIN</div>
                            <div class="min-value"></div>
                        </div>
                    </div>
                    <div class="value-wrapper">
                        <div class="input-value"></div>
                    </div>
                    <div class="max-wrapper">
                            <div class="container">
                                <div class="title">MAX</div>
                                <div class="max-value"></div>
                            </div>
                    </div>
                </div>
                <div class="management-panel">
                    <div class="reset btn-wrp">
                        <div class="button">RESET</div>
                    </div>
                    <div class="dec btn-wrp">
                        <div class="button">DEC</div>
                    </div>
                    <div class="inc btn-wrp">
                        <div class="button">INC</div>
                    </div>
                    <div class="random btn-wrp">
                        <div class="button">RANDOM</div>
                    </div>
                </div>
            </div>
            <div class="delete-counter">&#128939;</div>
        </div>`;

        this.currentNumber = this.getRandomInRange();
        this.getRandomString();

        this.renderInitialData();

        this.controlPanel.on("clickResetAll", this.resetData.bind(this));
        this.controlPanel.on("clickDecrementAll", this.decrementData.bind(this));
        this.controlPanel.on("clickIncrementAll", this.incrementData.bind(this));
        this.controlPanel.on("clickRandomAll", this.setRandomData.bind(this));

    }

    //methods
    getRandomString(){
        this.randomString = writtenNumber(this.currentNumber);
    }

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

        this.$deleteCounter = this.counter.find(".delete-counter");

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

        this.$random.click(function() {
            console.log("Counter: random click");
            addStyleForClickedButtons(self.$random);
            self.setRandomData(self.$random);
        });

        this.$deleteCounter.click(function() {
            console.log("Counter: delete click");
            self.deleteCounter(this.counterNumber);
        });
    }

    getRandomInRange() {
        return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    }
    deleteCounter(){
        this.counter.remove();
        this.emit("Counter was deleted", this.counterNumber);
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
        this.getRandomString();
        this.$inputNumberArea.text(this.randomString);
    }
}