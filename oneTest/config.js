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
    }
}
