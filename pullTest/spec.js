const libHelp = require('./func_lib');

describe('Test yandex.by|', function() {
    // steps from all test
    beforeEach(() => {
        libHelp.goToUrl('https://yandex.by/');
    });

    afterEach(() => {
        libHelp.functionPause(2);
    });

    // block test
    it('login ya mail', function() {

        libHelp.logInFun();
        let logIn = libHelp.compareText(by.css('.mail-User .mail-User-Name'), 'AutotestUser');

        expect(logIn).toEqual(true);
        libHelp.logOutFun();
    });

    it('logout ya mail', function() {

        libHelp.logInFun();
        let logIn = libHelp.compareUrl('https://mail.yandex.by/?uid=590288369&login=autotestuser#inbox');
        expect(logIn).toEqual(true);

       libHelp.logOutFun();
       let logOut = libHelp.compareUrl('https://yandex.by/');

       expect(logOut).toEqual(true);
    });

});

