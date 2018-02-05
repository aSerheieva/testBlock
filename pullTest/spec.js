const libHelp = require('./func_lib');

describe('Test yandex.by|', function() {
    // steps from all test
    beforeEach(() => {
        libHelp.goToUrl('https://yandex.by/');
        libHelp.logOutBeforeFun();
    });

    afterEach(() => {
        libHelp.functionPause(1);
    });

    // block test
    it('login ya mail', function() {

        libHelp.logInFun();
        let logIn = libHelp.compareText(by.css('.mail-User .mail-User-Name'), 'AutotestUser');

        expect(logIn).toEqual(true);
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

    it('invalidLogin ya mail', function() {

        libHelp.invalidLogin();
        let url = libHelp.compareUrl('https://passport.yandex.by/passport?mode=auth&retpath=https://mail.yandex.by&backpath=https%3A%2F%2Fyandex.by');
        expect(url).toEqual(true);
        let invalidLogPass = libHelp.compareText(by.css('.passport-Domik-Form-Error.passport-Domik-Form-Error_active'), 'Такого аккаунта нет');
        expect(invalidLogPass).toEqual(true);
    });

    describe('check link yandex.by|', ()=> {
        let link;

        it('link video', function() {
            libHelp.clickLink(by.css('.home-tabs a[data-id="video"]'));
            link = libHelp.compareUrl('https://yandex.by/video/');
            expect(link).toEqual(true);
        });

        it('link images', function() {
            libHelp.clickLink(by.css('.home-tabs a[data-id="images"]'));
            link = libHelp.compareUrl('https://yandex.by/images/');
            expect(link).toEqual(true);
        });

        it('link news', function() {
            libHelp.clickLink(by.css('.home-tabs a[data-id="news"]'));
            link = libHelp.compareUrl('https://news.yandex.by/');
            expect(link).toEqual(true);
        });

        it('link maps', function() {
            libHelp.clickLink(by.css('.home-tabs a[data-id="maps"]'));
            link = libHelp.compareUrl('https://yandex.by/maps/157/minsk/');
            expect(link).toEqual(true);
        });

        it('link market', function() {
            libHelp.clickLink(by.css('.home-tabs a[data-id="market"]'));
            link = libHelp.compareUrl('https://market.yandex.by/?clid=505&utm_source=face_abovesearch&utm_campaign=face_abovesearch');
            expect(link).toEqual(true);
        });

        it('link translate', function() {
            libHelp.clickLink(by.css('.home-tabs a[data-id="translate"]'));
            link = libHelp.compareUrl('https://translate.yandex.by/');
            expect(link).toEqual(true);
        });

        it('link music', function() {
            libHelp.clickLink(by.css('.home-tabs a[data-id="music"]'));
            link = libHelp.compareUrl('https://music.yandex.by/home');
            expect(link).toEqual(true);
        });
    });

    it('change language ya mail', function() {

       let expectBool = libHelp.changeLanguageEng();
        expect(expectBool).toEqual(true);
    });

});
