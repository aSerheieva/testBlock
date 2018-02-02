//main variable
let isResault = 'not Found';
let isEdned = false;
let isTimeout = false;
//let EC = protractor.ExpectedConditions;

//help function for mwWait
function timerMy(counter) {
    if (!isEdned && (counter > 0)) {
        setTimeout(function () { timerMy(counter - 1) }, 1000);
    } else {
        isTimeout = true;
        if (counter > 0) {
            console.log('resault: ' + isResault);
        } else {
            throw new Error("timeOut_MY")
        }

    }
}

//fuction myWait analogue  browser.wait (but worse)
async function myWait(element, time, start=false) {
    if (!start){
        timerMy(time);
    }
    try {
        await element.isEnabled().then(
        function (val) {
            if (!isTimeout){
                isResault = val;
                isEdned = true;
                return isResault;
            }
        },
        function (error) {
                if (!isTimeout){
                    setTimeout( function () {
                        myWait(element, time, true);
                    }, 1000);
                }else {
                    throw new Error(`${error.name} - error`);
                }
            }
        )
    } catch (error) {
        if (!isTimeout){
            setTimeout( function () {
                myWait(element, time, true);
            }, 1000);
        }else {
            throw new Error(`${error.name} - error`);
        }
    }

}

module.exports = {
    changeCity: function (city){

        let linkCity = element(by.css('.link.geolink[data-statlog="head.region.setup"]'));
        myWait(linkCity, 30000);
        linkCity.click();

        let inputCity = element(by.id('city__front-input'));
        myWait(inputCity, 30000);
        inputCity.clear().sendKeys(city);

        browser.sleep(1000).then(function() {
            console.log('waited 1 seconds');
        });

        myWait(element(by.css('.popup.popup_animate_no.input__popup_type_geo.popup_visibility_visible')), 5000);
        element(by.css('.b-autocomplete-item.b-autocomplete-item_type_geo:first-child')).click();
    },

    getInfoMorePopup: function (){

        let moreLink = element(by.css('a.home-link.home-tabs__more-switcher'));
        myWait(moreLink, 30000);
        moreLink.click();

        element(by.css('.popup__content .home-tabs__more')).getText().then((txt) => {
            return txt;
        }).catch(()=>{
            return false;
        });

    },

    functionPause: function (time){
        browser.sleep(time*1000).then(function() {
            console.log(`waited ${time} seconds`);
        });
    },

    goToUrl: function (url){
        browser.get(url);
    }

};

//good version code
// module.exports = {
//     changeCity: function (city){
//
//         let linkCity = element(by.css('.link.geolink[data-statlog="head.region.setup"]'));
//         browser.wait(EC.elementToBeClickable(linkCity), 5000);
//         linkCity.click();
//
//         let inputCity = element(by.id('city__front-input'));
//         browser.wait(EC.elementToBeClickable(inputCity), 5000);
//         inputCity.clear().sendKeys(city);
//
//         browser.sleep(1000).then(function() {
//             console.log('waited 1 seconds');
//         });
//
//         browser.wait(EC.elementToBeClickable(element(by.css('.popup.popup_animate_no.input__popup_type_geo.popup_visibility_visible')), 5000));
//         element(by.css('.b-autocomplete-item.b-autocomplete-item_type_geo:first-child')).click();
//     },
//
//     getInfoMorePopup: function (){
//
//         let moreLink = element(by.css('a.home-link.home-tabs__more-switcher'));
//         browser.wait(EC.elementToBeClickable(moreLink), 5000);
//         moreLink.click();
//
//         element(by.css('.popup__content .home-tabs__more')).getText().then((txt) => {
//             return txt;
//         }).catch(()=>{
//             return false;
//         });
//
//     }
//
// };







