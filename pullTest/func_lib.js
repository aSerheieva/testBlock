//main variable
let isResault = 'not Found';
let isEdned = false;
let isTimeout = false;

//help function for mwWait
function timerMy(counter) {
    if (!isEdned && (counter > 0)) {
        setTimeout(function () { timerMy(counter - 1) }, 1000);
    } else {
        isTimeout = true;
        if (!(counter > 0)) {
        //     console.log('resault: ' + isResault);
        // } else {
            throw new Error("timeOut_MY")
        }

    }
}
//fuction myWait analogue  browser.wait (but worse)
 function myWait(element, time, start=false) {
    if (!start){
        isResault = 'not Found';
        isEdned = false;
        isTimeout = false;
        timerMy(time);
    }
    element.isEnabled().then(
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
                    throw new Error(`${error} - error`);
                }
            }
        )

}

function clickFun(locator){
    let elemLoc = element(locator);
    myWait(elemLoc, 30000);
    elemLoc.click();
}

function sendKeysFun(locator, text) {

    let elemLoc = element(locator);
    myWait(elemLoc, 30000);
    elemLoc.clear().sendKeys(text);

    browser.sleep(1000).then(function() {
        console.log('waited 1 seconds');
    });
}

module.exports = {
    functionPause: (time) => {
        browser.sleep(time*1000).then(function() {
            console.log(`waited ${time} seconds`);
        });
    },

    goToUrl: (url) => {
        browser.get(url);
    },

    compareText: (locator, expextText) => {

        let elemLoc = element(locator);
        myWait(elemLoc, 30000);
        return elemLoc.getText().then((txt) => {
            return (txt === expextText);
        }).catch(()=>{
            return false;
        });

    },

    logInFun: ()=>{
        sendKeysFun(by.css('.domik3 form input[name="login"]'), 'AutotestUser' );
        sendKeysFun(by.css('.domik3 form input[type="password"]'), 'AutotestUser123' );
        clickFun(by.css('.domik3 form button[type ="submit"]'));
        browser.sleep(5000).then(() =>{ console.log('login')});
    },

    logOutFun: ()=>{
        clickFun(by.css('div.mail-User'));
        clickFun(by.css('.ui-dialog .b-mail-dropdown__item:last-child a'));
        browser.sleep(2000).then(() =>{ console.log('logout')});
    },

    logOutBeforeFun: ()=>{
        browser.sleep(3000).then(() =>{ console.log('compareUrl')});
        element(by.css('a.home-link.desk-notif-card__usermenu-switcher.home-link_black_yes')).isPresent().then(
            (res)=>{
                if (res){
                    element(by.css('a.home-link.desk-notif-card__usermenu-switcher.home-link_black_yes')).click();
                    element(by.css('a[data-statlog="mail.login.usermenu.exit"]')).click();
                    browser.sleep(1000).then(() =>{ console.log('logout')});
                }
            }
        );
    },

    compareUrl: (expectUrl)=>{
        browser.sleep(1000).then(() =>{ console.log('compareUrl')});
        return browser.getCurrentUrl().then(function(actualUrl) {
                return expectUrl === actualUrl;
            });
    },

    invalidPass: ()=>{
        sendKeysFun(by.css('.domik3 form input[name="login"]'), 'AutotestUser' );
        sendKeysFun(by.css('.domik3 form input[type="password"]'), 'NoAutotestUser123' );
        clickFun(by.css('.domik3 form button[type ="submit"]'));
        browser.sleep(5000).then(() =>{ console.log('login')});
    }


};


/*
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
 */







