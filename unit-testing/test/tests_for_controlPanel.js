describe('CONTROL PANEL', function () {

    var countersArray = [];
    var controlPanel = new ControlPanel();

    before(function() {
        // create counters
        for (let i=0; i<3; i++){
            countersArray.push(new Counter(controlPanel));
        }
    });

    it('can reset all counters values to min', function (){
        //arrange
        countersArray.forEach((counter) => {
            counter.currentNumber = counter.max;
        });
        //act
        controlPanel.emitResetAllCounts();

    });

});