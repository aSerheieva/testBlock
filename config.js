exports.config = {
    framework: 'jasmine',

    capabilities: {
        browserName: 'chrome'
    },

    specs: ['spec.js'],

    onPrepare: () => {
        browser.ignoreSynchronization = true;

    }
}
