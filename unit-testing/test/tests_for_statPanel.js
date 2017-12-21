describe('STAT PANEL', function () {
    this.timeout(99999999);

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
        assert.equal(this.statPanel.commonMin, counter.currentNumber, "");
        assert.equal(this.statPanel.commonMax, counter.currentNumber, "");
        assert.equal(this.statPanel.commonSUM, counter.currentNumber, "");
        assert.equal(this.statPanel.commonAVG, counter.currentNumber, "");
    });

    it('can update statistic if new counters was added', function (done){
        //arrange
        for (let i=0; i<3; i++){
            let counter = new Counter(controlPanel);
            counter.currentNumber = counter.min + (i*2);
            this.countersArray.push(counter);
        }
        this.countersArray[2].counter.currentNumber = 10;
        debugger;
        console.log(this.statPanel);
        //act
        this.statPanel.updateAllStatistic();
        //assert
        //commonMin==0
        // assert.equal(this.statPanel.commonMin, 10, "");
        // assert.equal(this.statPanel.commonMax, 12, "");
        // assert.equal(this.statPanel.commonSUM, 33, "");
        // assert.equal(this.statPanel.commonAVG, 11, "");
    });

});