$( document ).ready(function() {

   console.log("start");

    const pressedClass = "pressed";
    const millisecondsToWait = 500;

    var reset = $( ".reset" );
    var dec = $( ".dec" );
    var inc = $( ".inc" );
    var random = $( ".random" );


    reset.click(function () {
        console.log("reset");
        console.log("this:" + this);
        addStyleForClickedButtons(reset);

    });

    dec.click(function () {
        addStyleForClickedButtons(dec);
    });

    inc.click(function () {
        addStyleForClickedButtons(inc);

    });

    random.click(function () {
        addStyleForClickedButtons(random);
    });



    function addStyleForClickedButtons(queryLocator) {
        queryLocator.addClass(pressedClass);

        setTimeout(function () {
            queryLocator.removeClass(pressedClass);
        }, millisecondsToWait);
    }
});



