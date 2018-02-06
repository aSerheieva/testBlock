var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
    framework: 'jasmine',

    capabilities: {
        browserName: 'chrome'
    },

    specs: ['spec.js'],

    onPrepare: () => {
        browser.ignoreSynchronization = true;

        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: './report'
            })
        );

        var AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));
        jasmine.getEnv().afterEach(function(done){
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });
    }
}
