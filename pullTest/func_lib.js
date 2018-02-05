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
        browser.sleep(1000).then(() =>{ console.log('login')});
    },

    logOutFun: ()=>{
        clickFun(by.css('div.mail-User'));
        clickFun(by.css('.ui-dialog .b-mail-dropdown__item:last-child a'));
        browser.sleep(1000).then(() =>{ console.log('logout')});
    },

    logOutBeforeFun: ()=>{
        browser.sleep(3000).then(() =>{ console.log('compareUrlLogout')});
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
        browser.sleep(1000).then(() =>{ console.log('passwordInvalid')});
    },

    invalidLogin: ()=>{
        sendKeysFun(by.css('.domik3 form input[name="login"]'), 'NoAutotestUser' );
        sendKeysFun(by.css('.domik3 form input[type="password"]'), 'AutotestUser123' );
        clickFun(by.css('.domik3 form button[type ="submit"]'));
        browser.sleep(1000).then(() =>{ console.log('loginInvalis')});
    },

    clickLink(locator){
        let elemLoc = element(locator);
        myWait(elemLoc, 30000);
        elemLoc.click();
    },

    changeLanguageEng: async ()=>{
        let lanLink = element(by.css('.headline__bar-item:first-child a.link.link_black_yes.link_pseudo_yes'));
        myWait(lanLink, 30000);
        lanLink.click();

        let indexLink = 'last-child';

        await element.all(by.css(' .popup__content li a span.b-langs__text')).each(function(element, index) {
            element.getText().then(function (text) {
                console.log(index, text);
                if(text === 'Eng'){
                    indexLink = index;
                }
            });
        });

        if (indexLink === 'last-child'){
            element(by.css('.popup__content ul li:last-child a')).click();

            element(by.css(' button.button.select__button')).click();

            let indexLanPage = 'not find';
            await element.all(by.css(' .popup .popup__content .select__item')).each(function(element, index) {
                element.getText().then(function (text) {
                    console.log(index, text);
                    if(text === 'English'){
                        indexLanPage = index;
                    }
                });
            });

            let selector = ` .popup .popup__content .select__item:nth-child(${indexLanPage+1})`;
            element(by.css(selector)).click();
            browser.sleep(1000).then(() =>{ console.log('')});
            element(by.css('.form__controls button.button.form__save')).click();
            browser.sleep(2000).then(() =>{ console.log('')});
        }else{
            let selector = `.popup__content li:nth-child(${indexLink}) a`;
            element(by.css(selector)).click();
        }

        browser.get('https://yandex.by/');
        lanLink.click();
        element(by.css('.popup__content ul li:last-child a')).click();
        browser.sleep(2000).then(() =>{ console.log('')});
        return element(by.css('button.button.select__button span')).getText().then((txt) => {
            return (txt === 'English');
        }).catch(()=>{
            return false;
        });

    }
};







