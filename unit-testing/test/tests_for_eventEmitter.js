describe('EVENT EMITTER', function () {

    it("base", function(done) {
        let eventEmitter = new EventEmitter2();

        eventEmitter.on("event1", done);

        eventEmitter.emit("event1");
    });

});


//2 обработчика на 1 событие. 1н эмит - выполнятся 2 ф-ции
// удаление обработчиков (removeListener)
// массив для хранения позиций обработчиков
// передача аргументов в emit  дальше в обработчик
