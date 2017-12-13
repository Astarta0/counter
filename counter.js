class Counter extends EventEmitter2{
    constructor(min, max, millisecondsToWait, counterTemplate) {
        super();
        this.min = min;
        this.max = max;
        this.millisecondsToWait = millisecondsToWait;
        this.pressedClass = "pressed";

        this.counterTemplate = counterTemplate;
        this.randomNumber = this.getRandomInRange(this.min, this.max);
        this.randomString = writtenNumber(this.randomNumber);
        this.renderInitialData();
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
            self.resetData(self.$reset);
        });

        this.$dec.click(function() {
            self.decrementData(self.$dec);
        });

        this.$inc.click(function() {
            self.incrementData(self.$inc);
        });

        this.$random.click(function () {
            self.setRandomData(self.$random);
        });
    }

    getRandomInRange(min, max) {
        return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    }

    resetData(btn) {
        addStyleForClickedButtons(btn);
        this.randomNumber = this.min;
        this.setValue(this.randomNumber);
    }

    decrementData(btn){
        addStyleForClickedButtons(btn);
        if(this.randomNumber > this.min){
            this.setValue(--this.randomNumber);
        }
    }

    incrementData(btn){
        addStyleForClickedButtons(btn);
        if(this.randomNumber < this.max){
            this.setValue(++this.randomNumber);
        }
    }

    setRandomData(btn){
        addStyleForClickedButtons(btn);
        this.randomNumber = this.getRandomInRange(this.min, this.max);
        this.setValue(this.randomNumber);
    }

    setValue(number) {
        this.$inputNumberArea.text(writtenNumber(number));
    }

}