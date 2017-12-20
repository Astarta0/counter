class Wallaby extends wallaby{
    cunstructor(){}

    init(wallaby){
        return {
            name: 'Counter project',

            files: [
                '*.js'
            ],

            tests: [
                'unit-testing/test/*.js'
            ],

            testFramework: 'mocha',
            delays: {
                run: 500
            },
            debug: true,
            reportConsoleErrorAsError: true
        };
    }
}
