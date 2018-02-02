let EC = protractor.ExpectedConditions;
module.exports = {
    changeCity: function (city){

        let linkCity = element(by.css('.link.geolink[data-statlog="head.region.setup"]'));
        browser.wait(EC.elementToBeClickable(linkCity), 5000);
        linkCity.click();

        let inputCity = element(by.id('city__front-input'));
        browser.wait(EC.elementToBeClickable(inputCity), 5000);
        inputCity.clear().sendKeys(city);

        browser.sleep(1000).then(function() {
            console.log('waited 1 seconds');
        });

        browser.wait(EC.elementToBeClickable(element(by.css('.popup.popup_animate_no.input__popup_type_geo.popup_visibility_visible')), 5000));
        element(by.css('.b-autocomplete-item.b-autocomplete-item_type_geo:first-child')).click();
    },

    getInfoMorePopup: function (){

        let moreLink = element(by.css('a.home-link.home-tabs__more-switcher'));
        browser.wait(EC.elementToBeClickable(moreLink), 5000);
        moreLink.click();

        element(by.css('.popup__content .home-tabs__more')).getText().then((txt) => {
            return txt;
        }).catch(()=>{
            return false;
        });

    }

};







