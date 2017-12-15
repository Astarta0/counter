$(function() {

    const pressedClass = "pressed";
    const millisecondsToWait = 500;
    const min = 10;
    const max = 50;

    var controlPanel = new ControlPanel();

    // buttons
    var $addCounter = $(".add-counter");

    controlPanel.$resetAllBtn.click(toEmitResetAllEvent);
    controlPanel.$decrementAllBtn.click(toEmitDecrementAllEvent);
    controlPanel.$incrementAllBtn.click(toEmitIncrementAllEvent);
    controlPanel.$randomAllBtn.click(toEmitRundomAllEvent);

    //handlers
    $addCounter.click(function () {
        var counter = new Counter(min, max, millisecondsToWait, counterTemplate, controlPanel);
    });

    function toEmitResetAllEvent(){
        controlPanel.emitResetAllCounts();
        }

    function toEmitDecrementAllEvent() {
        controlPanel.emitDecrementAllCounts();
    }

    function toEmitIncrementAllEvent() {
        controlPanel.emitIncrementAllCounts();
    }

    function toEmitRundomAllEvent() {
        controlPanel.emitRandomAllCounts();
    }


    /**
     * @param {jQuery} queryLocator
     */
    window.addStyleForClickedButtons = addStyleForClickedButtons;
    function addStyleForClickedButtons(queryLocator) {
        queryLocator.addClass(pressedClass);
        setTimeout(function () {
            queryLocator.removeClass(pressedClass);
        }, millisecondsToWait);
    }

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



