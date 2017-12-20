describe('CONTROL PANEL', function () {

    before(function() {
        this.controlPanel = new ControlPanel();

        // create counters
        for ( var i=0; i<=3; i++){
            countersArray.push(new Counter(min, max, counterTemplate, controlPanel));
        }
    });

    it('can reset all counters values to min', function (){
        //arrange
        countersArray.forEach((counter) => {
            counter.currentNumber = max;
        })
        //act
        debugger;
        this.controlPanel.emitResetAllCounts().bind(this.controlPanel);

    });

    var countersArray = [];
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