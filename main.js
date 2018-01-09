/**
 * @param {jQuery} queryLocator
 **/
function addStyleForClickedButtons(queryLocator) {
    const pressedClass = "pressed";
    const millisecondsToWait = 500;
    queryLocator.addClass(pressedClass);
    setTimeout(function () {
        queryLocator.removeClass(pressedClass);
    }, millisecondsToWait);
}

$(function() {
    var countersArray = [];

    var controlPanel = new ControlPanel();
    var statPanel = new StatPanel(countersArray);
    // buttons
    var $addCounter = $(".add-counter");
    var $sortCounters = $(".sort-counters");

    var self = this;

    // handlers
    $sortCounters.click(function () {
        console.log(countersArray);
        sortAllCounters();
    });

    $addCounter.click(function() {
        var counter = new Counter(controlPanel);
        countersArray.push(counter);
        if (countersArray.length > 0){
            $sortCounters.removeClass("btn-is-disabled");
        }
        statPanel.addCountersHandler();
    });


    function sortAllCounters() {
        debugger;
        console.log(countersArray);
        countersArray.sort(function (a, b) {
             return a.currentNumber - b.currentNumber;
        });
        console.log(countersArray);
    }

});



