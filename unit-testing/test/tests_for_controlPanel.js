describe('CONTROL PANEL', function () {

    var countersArray = [];

    beforeEach(function() {
        this.controlPanel = new ControlPanel();
        // create counters
        for (let i=0; i<3; i++){
            countersArray.push(new Counter(this.controlPanel));
        }
    });
    afterEach(function(){
            delete this.controlPanel;
        }
    );

    it('can reset all counters values to min', function (done){
        //arrange
        this.controlPanel.on("clickResetAll", function (){
            done();
        });
        countersArray.forEach((counter) => {
            counter.currentNumber = counter.max;
        });
        //act
        this.controlPanel.emitResetAllCounts();
        //assert
        countersArray.forEach(function (counter){
                assert.equal(counter.currentNumber, counter.min, "Doesn\'t reset all counters!");
        });
    });

    it('can decrement all counters values', function (done){
        //arrange
        this.controlPanel.on("clickDecrementAll", function (){
            done();
        });
        countersArray.forEach((counter) => {
            counter.currentNumber = counter.max;
        });
        //act
        this.controlPanel.emitDecrementAllCounts();
        //assert
        countersArray.forEach(function (counter){
            assert.equal(counter.currentNumber, (counter.max - 1), "Doesn\'t decrement all counters!");
        });
    });

    it('can increment all counters values', function (done){
        //arrange
        this.controlPanel.on("clickIncrementAll", function (){
            done();
        });
        countersArray.forEach((counter) => {
            counter.currentNumber = counter.min;
        });
        //act
        this.controlPanel.emitIncrementAllCounts();
        //assert
        countersArray.forEach(function (counter){
            assert.equal(counter.currentNumber, (counter.min + 1), "Doesn\'t increment all counters!");
        });
    });

    it('can\'t decrement all counters values if current values are min', function (done){
        //arrange
        this.controlPanel.on("clickDecrementAll", function (){
            done();
        });
        countersArray.forEach((counter) => {
            counter.currentNumber = counter.min;
        });
        //act
        this.controlPanel.emitDecrementAllCounts();
        //assert
        countersArray.forEach(function (counter){
            assert.equal(counter.currentNumber, counter.min, "Decrement all counters values less than the minimum!!");
        });
    });

    it('can\'t increment all counters values if current values are max', function (done){
        //arrange
        this.controlPanel.on("clickIncrementAll", function (){
            done();
        });
        countersArray.forEach((counter) => {
            counter.currentNumber = counter.max;
        });
        //act
        this.controlPanel.emitIncrementAllCounts();
        //assert
        countersArray.forEach(function (counter){
            assert.equal(counter.currentNumber, counter.min, "Increment all counters values more than the maximum!!");
        });
    });

    it('can set random values for all counters', function (done){
        //arrange
        this.controlPanel.on("clickRandomAll", function (){
            done();
        });
        countersArray.forEach((counter) => {
            counter.currentNumber = counter.min;
        });
        //act
        this.controlPanel.emitRandomAllCounts();
        //assert
        countersArray.forEach(function (counter){
            assert.notEqual(counter.currentNumber, counter.min, "Doesn\'t set random value for all counters!");
        });
    });

});