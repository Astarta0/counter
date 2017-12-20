describe('COUNTER', function () {

    before(function() {
        this.counter = new Counter(min, max, counterTemplate, controlPanel);
    });

    it('can reset current value to min', function (){
        //arrange
        this.counter.currentNumber = 20;
        //act
        this.counter.resetData();
        //assert
        assert.equal(this.counter.currentNumber, min, "Counter doesn\'t reset value to min!");
    });

    it('can increment value', function(){
        //arrange
        this.counter.currentNumber = 20;
        var expectCurrentNumber = this.counter.currentNumber + 1;
        //act
        this.counter.incrementData();
        //assert
        assert.equal(this.counter.currentNumber, expectCurrentNumber, "Counter doesn\'t increment value!");
    });

    it('can decrement value', function(){
        //arrange
        this.counter.currentNumber = 20;
        var expectCurrentNumber = this.counter.currentNumber - 1;
        //act
        this.counter.decrementData();
        //assert
        assert.equal(this.counter.currentNumber, expectCurrentNumber, "Counter doesn\'t decrement value!");
    });

    it('can\'t decrement data if current value is min', function(){
        //arrange
        this.counter.currentNumber = min;
        //act
        this.counter.decrementData();
        //assert
        assert.equal(this.counter.currentNumber, min, "Counter decrements value less than the minimum!");
    });

    it('can\'t increment data if current value is max', function() {
        //arrange
        this.counter.currentNumber = max;
        //act
        this.counter.incrementData();
        //assert
        assert.equal(this.counter.currentNumber, max, "Counter decrements value more than the minimum!");
    });
    
    it('can set random value', function() {
        //arrange
        var randomNumber = this.counter.currentNumber;
        //act
        this.counter.setRandomData();
        //assert
        assert.notEqual(this.counter.currentNumber, randomNumber, "Counter doesn\'t set random value!");
    });

    const min = 10;
    const max = 50;
    var controlPanel = new ControlPanel();
    var counterTemplate = `
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
        </div>`;
});