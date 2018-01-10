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
    var indexOfCounters = 0;

    var controlPanel = new ControlPanel();
    var statPanel = new StatPanel(countersArray);
    // buttons
    var $addCounter = $(".add-counter");
    var $sortCounters = $(".sort-counters");
    var $inputCountersArea = $(".counters-container");

    // handlers
    $sortCounters.click(function () {
        sortAllCounters();
        renderingSortedCounters();
    });

    $addCounter.click(function() {
        indexOfCounters++;
        var counter = new Counter(controlPanel, indexOfCounters);
        countersArray.push(counter);
        if (countersArray.length > 0){
            $sortCounters.removeClass("btn-is-disabled");
        }
        statPanel.addCountersHandler();
    });

    function sortAllCounters() {
        countersArray.sort(function (a, b) {
             return a.currentNumber - b.currentNumber;
        });
    }

    function renderingSortedCounters() {
        $inputCountersArea.children().detach();
        countersArray.forEach((counter) => {
            counter.getRandomString();
            counter.renderInitialData();
        });
    }
});



