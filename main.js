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

    // handlers
    $addCounter.click(function () {
        var counter = new Counter(controlPanel);
        countersArray.push(counter);
        statPanel.addCountersHandler();
    });
});



