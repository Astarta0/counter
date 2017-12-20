describe('COUNTER', function () {

    const controlPanel = new ControlPanel();

    beforeEach(function() {
        this.counter = new Counter(controlPanel);
    });
    afterEach(function(){
        delete this.counter;
        }
    );

    it('can reset current value to min', function(done) {
        //arrange
        this.counter.on("Counter was changed", function() {
            done();
        });
        this.counter.currentNumber = 20;
        //act
        this.counter.resetData();
        //assert
        assert.equal(this.counter.currentNumber, this.counter.min, "Counter doesn\'t reset value to min!");
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
        this.counter.currentNumber = this.counter.min;
        //act
        this.counter.decrementData();
        //assert
        assert.equal(this.counter.currentNumber, this.counter.min, "Counter decrements value less than the minimum!");
    });

    it('can\'t increment data if current value is max', function() {
        //arrange
        this.counter.currentNumber = this.counter.max;
        //act
        this.counter.incrementData();
        //assert
        assert.equal(this.counter.currentNumber, this.counter.max, "Counter decrements value more than the minimum!");
    });
    
    it('can set random value', function() {
        //arrange
        var randomNumber = this.counter.currentNumber;
        //act
        this.counter.setRandomData();
        //assert
        assert.notEqual(this.counter.currentNumber, randomNumber, "Counter doesn\'t set random value!");
    });

});