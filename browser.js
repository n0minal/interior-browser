const interiors = require('./interiors.json');

const browser = undefined;

mp.events.addCommand('interiors', () => {
    if(browser === undefined) {
        browser = mp.browsers.new('package://interiors-browser/browser.html');
    }
    else{
        browser.destroy();
    }
});

mp.events.add('enterInterior', (package, index) => {

});

mp.events.add('getInteriors', () => {
    browser.call('loadInteriors', (JSON.stringify(interiors)));
});