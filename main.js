$( document ).ready(function() {
    
    // 1) underscore.js instead of getRandomInRange
    class Counter{
        constructor(min, max, millisecondsToWait, counterTemplate) {
            this.min = min;
            this.max = max;
            this.millisecondsToWait = millisecondsToWait;
            this.pressedClass = "pressed";

            this.counterTemplate = counterTemplate;
            this.randomNumber = this.getRandomInRange(this.min, this.max);
            this.randomString = writtenNumber(this.randomNumber);
            this.renderInitialData();

        }


        //methods
        renderInitialData(){
            inputCountersArea.append(this.counterTemplate);
            var inputNumberArea = $(".input-value");
            var inputMinArea = $(".min-value");
            var inputMaxArea = $(".max-value");
            inputNumberArea.text(this.randomString);
            inputMinArea.text(this.min);
            inputMaxArea.text(this.max);
            debugger;
        }

        getRandomInRange(min, max) {
            return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
        }

        //handlers


    };


    const pressedClass = "pressed";
    const millisecondsToWait = 500;
    const min = 10;
    const max = 50;

    // var inputNumberArea = $(".input-value");
    // var inputMinArea = $(".min-value");
    // var inputMaxArea = $(".max-value");
    var inputCountersArea = $(".counters-container");
    // buttons
    var reset = $( ".reset" );
    var dec = $( ".dec" );
    var inc = $( ".inc" );
    var random = $( ".random" );
    var addCounter = $(".add-counter");

    var randomNumber = getRandomInRange(min, max);
    var randomString = writtenNumber(randomNumber);

    // inputNumberArea.text(randomString);
    // inputMinArea.text(min);
    // inputMaxArea.text(max);


    //handlers
    addCounter.click(function () {
        var counter = new Counter(min, max, millisecondsToWait, counterTemplate);
        console.log(counter);


    });

    reset.click(function () {
        addStyleForClickedButtons(reset);
        setValue(min);
    });

    dec.click(function () {
        addStyleForClickedButtons(dec);
        if(randomNumber > min){
            setValue(--randomNumber);
        }
    });

    inc.click(function () {
        addStyleForClickedButtons(inc);
        if(randomNumber < max){
            setValue(++randomNumber);
        }
    });

    random.click(function () {
        addStyleForClickedButtons(random);
        randomNumber = getRandomInRange(min, max);
        setValue(randomNumber);
    });

    function setValue(number) {
        inputNumberArea.text(writtenNumber(number));
    }

    function addStyleForClickedButtons(queryLocator) {
        queryLocator.addClass(pressedClass);
        setTimeout(function () {
            queryLocator.removeClass(pressedClass);
        }, millisecondsToWait);
    }

    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
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



