describe('Test yandex.by|', function() {

    let EC = protractor.ExpectedConditions;

    function changeCity(city){

        let elem = element(by.css('.link.geolink[data-statlog="head.region.setup"]'));
        browser.wait(EC.elementToBeClickable(elem), 5000);
        elem.click();

        let inputCity = element(by.id('city__front-input'));
        browser.wait(EC.elementToBeClickable(inputCity), 5000);
        inputCity.clear().sendKeys(city);

        browser.sleep(500).then(function() {
            console.log('waited 0.5 seconds');
        });

        browser.wait(EC.elementToBeClickable(element(by.css('.popup.popup_animate_no.input__popup_type_geo.popup_visibility_visible')), 5000));
        element(by.css('.b-autocomplete-item.b-autocomplete-item_type_geo:first-child')).click();
   }


   function getInfoBlock(){

       let moreElem = element(by.css('a.home-link.home-tabs__more-switcher'));
       browser.wait(EC.elementToBeClickable(moreElem), 5000);
       moreElem.click();

       let moreElem1 = element(by.css('.popup__content .home-tabs__more')).getAttribute("outerHTML").then((txt) => {
           return txt;
       }).catch(()=>{
           return false;
       });

   }

    beforeAll(() => {
        browser.get('https://yandex.by/');
    });

    afterAll(() => {
        browser.sleep(10000).then(function() {
            console.log('waited 10 seconds');
        });
    });

    it('equals text block', function() {

        changeCity('Лондон ');
        let londonMore = getInfoBlock();

        browser.sleep(1000).then(function() {
            console.log('waited 1 seconds');
        });

        changeCity('Париж ');
        let parigMore = getInfoBlock();
        // let parigMore = false;

        expect(londonMore).toEqual(parigMore);
    });

});

