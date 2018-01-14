class Counter extends EventEmitter2 {
    constructor(controlPanel, indexOfCounters) {
        super();
        this.counterName = "";
        this.counterNumber = indexOfCounters;
        this.min = 10;
        this.max = 50;
        this.controlPanel = controlPanel;

        this.counterTemplate = `
        <div class="counter">
            <div class="counter-wrapper">
                <div class="name-area"> 
                    <input class="counter-name-input" type="text" placeholder="Enter counters name...">
                </div>
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
            </div>
            <div class="delete-counter">&#128939;</div>
        </div>`;

        this.currentNumber = this.getRandomInRange();
        this.getRandomString();

        this.renderInitialData();

        this.controlPanel.on("clickResetAll", this.resetData.bind(this));
        this.controlPanel.on("clickDecrementAll", this.decrementData.bind(this));
        this.controlPanel.on("clickIncrementAll", this.incrementData.bind(this));
        this.controlPanel.on("clickRandomAll", this.setRandomData.bind(this));
    }

    //methods
    getRandomString(){
        this.randomString = writtenNumber(this.currentNumber);
    }

    renderInitialData() {
        this.$inputCountersArea = $(".counters-container");
        this.counter = $(this.counterTemplate);
        this.$inputCountersArea.append(this.counter);
        this.$nameInput = this.counter.find(".counter-name-input");
        if (this.counterName !== ""){
            debugger;
            this.$nameInput.val(this.counterName);
        }

        this.$inputNumberArea = this.counter.find(".input-value");
        this.$inputMinArea = this.counter.find(".min-value");
        this.$inputMaxArea = this.counter.find(".max-value");

        this.$inputNumberArea.text(this.randomString);
        this.$inputMinArea.text(this.min);
        this.$inputMaxArea.text(this.max);

        this.$reset = this.counter.find( ".reset" );
        this.$dec = this.counter.find( ".dec" );
        this.$inc = this.counter.find( ".inc" );
        this.$random = this.counter.find( ".random" );

        this.$deleteCounter = this.counter.find(".delete-counter");

        const self = this;
        //handlers definition
        this.$reset.click(function() {
            console.log("Counter: reset click");
            addStyleForClickedButtons(self.$reset);
            self.resetData(self.$reset);
        });

        this.$dec.click(function() {
            console.log("Counter: decrement click");
            addStyleForClickedButtons(self.$dec);
            self.decrementData(self.$dec);
        });

        this.$inc.click(function() {
            console.log("Counter: increment click");
            addStyleForClickedButtons(self.$inc);
            self.incrementData(self.$inc);
        });

        this.$random.click(function() {
            console.log("Counter: random click");
            addStyleForClickedButtons(self.$random);
            self.setRandomData(self.$random);
        });

        this.$deleteCounter.click(function() {
            console.log("Counter: delete click");
            self.deleteCounter(this.counterNumber);
        });

        this.$nameInput.keypress((event) => {
            if (event.which === 13) {
                this.counterName = this.$nameInput.val();
                var domElement = this.$nameInput.get(0);
                console.log(domElement);
                domElement.blur();
            }
        });

        this.counter.click(function(event) {
            console.log(`я туть`);
            console.log(this);
            var target = event.target;
            // клик на div - меняем на input
            if (target.className == "min-value") {
                self.changeDivToinput("min-value-input", target, self.min);
            }
            if (target.className == "max-value") {
                self.changeDivToinput("max-value-input", target, self.max);
            }
        });

        this.counter.focusout(function(event) {
            var target = event.target;
            if (!(target.classList.contains("min-value-input") || target.classList.contains("max-value-input"))) return;
            if (target.classList.contains("min-value-input")) {
                self.min = self.saveValueAndReplaceInput("min-value-input", target, "min-value", self.min);
                self.correctCurrentValueAccordingNewMinMax();
            }
            if (target.classList.contains("max-value-input")) {
                self.max = self.saveValueAndReplaceInput("max-value-input", target, "max-value", self.max);
                self.correctCurrentValueAccordingNewMinMax();
            }
        });

        this.counter.keypress(function(event) {
            var target = event.target;
            $(target).removeClass("invalid");
            if (!(target.classList.contains("min-value-input") || target.classList.contains("max-value-input"))) return;
            if (event.which === 13) target.blur();
        });
    }

    changeDivToinput(inputClass, target, prevValue){
        const $newInput = $(`<input class="${inputClass}" maxlength="3"></input>`);
        $(target).replaceWith($newInput);
        $newInput.val(prevValue);
        $newInput.select();
        $newInput.focus();
    }

    saveValueAndReplaceInput(inputClass, target, divClass, countersVariableForValue){
        var $Input = this.counter.find("." + inputClass);
        if ($Input.val() == "")
        {
            target.blur();
            $Input.replaceWith(`<div class="${divClass}"></div>`);
            this.counter.find("." + divClass).text(countersVariableForValue);
            return;
        }
        var oldValue = countersVariableForValue;
        countersVariableForValue = +$Input.val();
        var validity = this.validateInputValue(countersVariableForValue, inputClass, $Input);
        if (validity) {
            target.blur();
            $Input.replaceWith(`<div class="${divClass}"></div>`);
            this.counter.find("." + divClass).text(countersVariableForValue);
            return countersVariableForValue;
        } else {
            $Input.focus();
            return oldValue;
        }
    }

    validateInputValue(countersVariableForValue, inputClass, $Input){
        var InputDomElement = $Input.get(0);
        // вводили min
        if (inputClass == "min-value-input") {
            if (countersVariableForValue > this.max) {
                $Input.addClass("invalid");
                // InputDomElement.setCustomValidity("Your number is more than the max!");
                return false;
            }
        }
        // вводили max
        if (inputClass == "max-value-input") {
            if (countersVariableForValue < this.min) {
                $Input.addClass("invalid");
                return false;
            }
        }
        return true;
    }

    correctCurrentValueAccordingNewMinMax(){
        if(this.currentNumber < this.min){
            this.currentNumber = this.min;
            this.setValue();
            this.emit("Counter was changed");
        }
        if(this.currentNumber > this.max){
            this.currentNumber = this.max;
            this.setValue();
            this.emit("Counter was changed");
        }
    }

    getRandomInRange() {
        return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    }

    deleteCounter(){
        this.counter.remove();
        this.emit("Counter was deleted", this.counterNumber);
    }

    resetData() {
        this.currentNumber = this.min;
        this.setValue();
        this.emit("Counter was changed");
    }

    decrementData(){
        if(this.currentNumber > this.min){
            --this.currentNumber;
            this.setValue();
        }
        this.emit("Counter was changed");
    }

    incrementData(){
        if(this.currentNumber < this.max){
            ++this.currentNumber;
            this.setValue();
        }
        this.emit("Counter was changed");
    }

    setRandomData(){
        this.currentNumber = this.getRandomInRange();
        this.setValue();
        this.emit("Counter was changed");
    }

    setValue() {
        this.getRandomString();
        this.$inputNumberArea.text(this.randomString);
    }
}