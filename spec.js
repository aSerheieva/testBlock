const libHelp = require('./func_lib');

describe('Test yandex.by|', function() {
    // steps from all test
    beforeAll(() => {
        browser.get('https://yandex.by/');
    });

    afterAll(() => {
        browser.sleep(5000).then(function() {
            console.log('waited 5 seconds');
        });
    });

    // block test
    it('equals text block', function() {

        libHelp.changeCity('Лондон ');
        browser.sleep(1000).then(function() {
            console.log('waited 1 seconds');
        });
        let londonMore = libHelp.getInfoMorePopup();

        browser.sleep(1000).then(function() {
            console.log('waited 1 seconds');
        });

        libHelp.changeCity('Париж ');
        browser.sleep(1000).then(function() {
            console.log('waited 1 seconds');
        });
        let parisMore = libHelp.getInfoMorePopup();
        // let parisMore = false;

        expect(londonMore).toEqual(parisMore);
    });

});

