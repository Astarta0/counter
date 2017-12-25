describe('EVENT EMITTER', function () {

    this.timeout(9999999);

    it("base", function(done) {
        let eventEmitter = new EventEmitter2();

        eventEmitter.on("event1", function(){
            done();
        });

        eventEmitter.emit("event1");
    });

    it("2 listeners for 1 event", function(done) {
        let eventEmitter = new EventEmitter2();

        eventEmitter.on("event1", handler1);
        eventEmitter.on("event1", handler2);


        eventEmitter.emit("event1");

        function handler1(){
            console.log("handler1");
        }

        function handler2(){
            console.log("handler2");
            done();
        }
    });

    it("remove listener", function(done) {
        let eventEmitter = new EventEmitter2();

        eventEmitter.on("event1", handler1);
        eventEmitter.on("event1", handler2);

        eventEmitter.removeListener("event1", handler1);

        eventEmitter.emit("event1");

        function handler1(){
            console.log("handler1");
        }

        function handler2(){
            console.log("handler2");
            done();
        }
    });

    it("passing arguments to handler", function(done) {
        let eventEmitter = new EventEmitter2();

        let error = "Incorrect report data to handler!";
        let arg1 = "name";
        let arg2 = "kate";
        let paramet1 = 123456;

        eventEmitter.on("event1", handler1);
        eventEmitter.on("event2", function(parameter1){
            assert.equal(parameter1, paramet1, error);
            done();
        });

        eventEmitter.emit("event1", arg1, arg2);
        eventEmitter.emit("event2", paramet1);

        function handler1(param1, param2){
            assert.equal(param1, arg1, error);
            assert.equal(param2, arg2, error);
        }
    });
});


//2 обработчика на 1 событие. 1н эмит - выполнятся 2 ф-ции
// удаление обработчиков (removeListener)
// массив для хранения позиций обработчиков
// передача аргументов в emit  дальше в обработчик
