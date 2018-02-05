const libHelp = require('./func_lib');

describe('Test yandex.by|', function() {
    // steps from all test
    beforeEach(() => {
        libHelp.goToUrl('https://yandex.by/');
        libHelp.logOutBeforeFun();
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

    it('invalidPassword ya mail', function() {

        libHelp.invalidPass();
        let url = libHelp.compareUrl('https://passport.yandex.by/passport?mode=auth&retpath=https://mail.yandex.by&backpath=https%3A%2F%2Fyandex.by');
        expect(url).toEqual(true);
        let invalidLogPass = libHelp.compareText(by.css('.passport-Domik-Form-Error.passport-Domik-Form-Error_active'), 'Неверный пароль');
        expect(invalidLogPass).toEqual(true);
    });

});

