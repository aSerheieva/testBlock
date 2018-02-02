const libHelp = require('./func_lib');

describe('Test yandex.by|', function() {
    // steps from all test
    beforeAll(() => {
        libHelp.goToUrl('https://yandex.by/');
    });

    afterAll(() => {
        libHelp.functionPausa(5);
    });

    // block test
    it('equals text block', function() {

        libHelp.changeCity('Лондон ');
        libHelp.functionPausa(1);
        let londonMore = libHelp.getInfoMorePopup();

        libHelp.functionPausa(1);

        libHelp.changeCity('Париж ');
        libHelp.functionPausa(1);
        let parisMore = libHelp.getInfoMorePopup();
        // let parisMore = false;

        expect(londonMore).toEqual(parisMore);
    });

});

