describe('STAT PANEL', function () {

    var controlPanel = new ControlPanel();

    beforeEach(function() {
        this.countersArray = [];
        this.statPanel = new StatPanel(this.countersArray);
    });
    afterEach(function(){
            delete this.statPanel;
            delete this.countersArray;
        }
    );

    it('can update statistic if the only new counter was added', function (){
        //arrange
        let counter = new Counter(controlPanel);
        this.countersArray.push(counter);
        //act
        this.statPanel.updateAllStatistic();
        //assert
        //commonMin==0
        assert.equal(this.statPanel.commonMin, counter.currentNumber, "Incorrect common min value");
        assert.equal(this.statPanel.commonMax, counter.currentNumber, "Incorrect common max value");
        assert.equal(this.statPanel.commonSUM, counter.currentNumber, "Incorrect common sum value");
        assert.equal(this.statPanel.commonAVG, counter.currentNumber, "Incorrect common avg value");
    });

    it('can update statistic if several counters were added', function (){
        //arrange
        for (let i=0; i<3; i++){
            let counter = new Counter(controlPanel);
            counter.currentNumber = counter.min + (i*2);
            this.countersArray.push(counter);
        }

        this.countersArray2 = this.countersArray.concat();
        this.countersArray2.reverse();
        this.statPanel2 = new StatPanel(this.countersArray2);

        //act
        this.statPanel.updateAllStatistic();
        this.statPanel2.updateAllStatistic();

        //assert
        assert.equal(this.statPanel.commonMin, 10, "Incorrect common minimum value!");
        assert.equal(this.statPanel.commonMax, 14, "Incorrect common maximum value!");
        assert.equal(this.statPanel.commonSUM, 36, "Incorrect common summary value!");
        assert.equal(this.statPanel.commonAVG, 12, "Incorrect common average value!");

        assert.equal(this.statPanel2.commonMin, 10, "Incorrect common minimum value!");
        assert.equal(this.statPanel2.commonMax, 14, "Incorrect common maximum value!");
        assert.equal(this.statPanel2.commonSUM, 36, "Incorrect common summary value!");
        assert.equal(this.statPanel2.commonAVG, 12, "Incorrect common average value!");
    });


    it('can update statistic if counter reset it\'s value', function (){
        //arrange
        let counter = new Counter(controlPanel);
        counter.currentNumber = counter.max;
        this.countersArray.push(counter);

        //act
        this.statPanel.addCountersHandler();
        counter.resetData();
        //assert
        assert.equal(this.statPanel.commonMin, counter.currentNumber, "Incorrect common min after counter reset it\'s value!");
        assert.equal(this.statPanel.commonMax, counter.currentNumber, "Incorrect common max after counter reset it's value!");
        assert.equal(this.statPanel.commonSUM, counter.currentNumber, "Incorrect common summary after counter reset it's value!");
        assert.equal(this.statPanel.commonAVG, counter.currentNumber, "Incorrect common average after counter reset it's value!");
    });

    it('can update statistic if counter increment it\'s value', function (){
        //arrange
        let counter = new Counter(controlPanel);
        counter.currentNumber = counter.min;
        this.countersArray.push(counter);

        //act
        this.statPanel.addCountersHandler();
        counter.incrementData();
        //assert
        assert.equal(this.statPanel.commonMin, counter.currentNumber, "Incorrect common min after counter incremented it\'s value!");
        assert.equal(this.statPanel.commonMax, counter.currentNumber, "Incorrect common max after counter incremented it's value!");
        assert.equal(this.statPanel.commonSUM, counter.currentNumber, "Incorrect common summary after counter incremented it's value!");
        assert.equal(this.statPanel.commonAVG, counter.currentNumber, "Incorrect common average after counter incremented it's value!");
    });

    it('can update statistic if counter decrement it\'s value', function (){
        //arrange
        let counter = new Counter(controlPanel);
        counter.currentNumber = counter.max;
        this.countersArray.push(counter);

        //act
        this.statPanel.addCountersHandler();
        counter.decrementData();
        //assert
        assert.equal(this.statPanel.commonMin, counter.currentNumber, "Incorrect common min after counter decremented it\'s value!");
        assert.equal(this.statPanel.commonMax, counter.currentNumber, "Incorrect common max after counter decremented it's value!");
        assert.equal(this.statPanel.commonSUM, counter.currentNumber, "Incorrect common summary after counter decremented it's value!");
        assert.equal(this.statPanel.commonAVG, counter.currentNumber, "Incorrect common average after counter decremented it's value!");
    });

    it('can update statistic if counter sets random value', function (){
        //arrange
        let counter = new Counter(controlPanel);
        counter.currentNumber = counter.max;
        this.countersArray.push(counter);

        //act
        this.statPanel.addCountersHandler();
        counter.setRandomData();
        //assert
        assert.equal(this.statPanel.commonMin, counter.currentNumber, "Incorrect common min after counter set random value!");
        assert.equal(this.statPanel.commonMax, counter.currentNumber, "Incorrect common max after counter set random value!");
        assert.equal(this.statPanel.commonSUM, counter.currentNumber, "Incorrect common summary after counter set random value!");
        assert.equal(this.statPanel.commonAVG, counter.currentNumber, "Incorrect common average after counter set random value!");
    });

    it('update statistic if several counters changed it\'s values', function (){
        //arrange
        for (let i=0; i<3; i++){
            let counter = new Counter(controlPanel);
            this.countersArray.push(counter);
        }
        this.countersArray[0].currentNumber = 20;
        this.countersArray[1].currentNumber = 30;
        this.countersArray[2].currentNumber = 46;

        //act1
        this.statPanel.addCountersHandler();
        //assert1
        assert.equal(this.statPanel.commonMin, 20, "Incorrect common min after adding counters!");
        assert.equal(this.statPanel.commonMax, 46, "Incorrect common max after adding counters!");
        assert.equal(this.statPanel.commonSUM, 96, "Incorrect common summary after adding counters!");
        assert.equal(this.statPanel.commonAVG, 32, "Incorrect common average after adding counters!");

        //act2:change counters values
        this.countersArray[0].resetData();
        this.countersArray[1].decrementData();
        this.countersArray[2].incrementData();
        //assert2
        assert.equal(this.statPanel.commonMin, 10, "Incorrect common min after counters changed values!");
        assert.equal(this.statPanel.commonMax, 47, "Incorrect common max after counters changed values!");
        assert.equal(this.statPanel.commonSUM, 86, "Incorrect common summary after counters changed values!");
        assert.equal(this.statPanel.commonAVG, 29, "Incorrect common average after counters changed values");
    });
});