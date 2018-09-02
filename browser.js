const browser = undefined;

const previousPosition = undefined;

mp.events.addCommand('interiors', () => {
    if(browser === undefined) {
        previousPosition = mp.players.local.position;
        browser = mp.browsers.new('package://interiors-browser/browser.html');
    }
    else{
        browser.destroy();
        browser = undefined;
    }
});

mp.events.add('enterInterior', (interior) => {
    let player = mp.players.local;
    mp.gui.chat.push(`~y~================ ~w~JOINING INTERIOR~y~ ================`);
    mp.gui.chat.push(`Loading interior: ${interior.name}`);
    mp.gui.chat.push(`Interior Position: new mp.Vector3(${interior.location.x}, ${interior.location.y}, ${interior.location.z});`);
    player.position = new mp.Vector3(interior.location.x, interior.location.y, interior.location.z);

    if(interior.ipl) {
        if(Array.isArray(interior.ipl)) {
            interior.ipl.map((ipl) => {
                mp.gui.chat.push(`Requiring IPL: ~g~${ipl}`);
                mp.game.invoke("0x41B4893843BBDB74",  interior.ipl);
            });
        }
        else {
            mp.gui.chat.push(`Requiring IPL: ~g~${interior.ipl}`);
            mp.game.invoke("0x41B4893843BBDB74", interior.ipl);
        }
    }
});

mp.events.addCommand('leave', () => {
    mp.gui.chat.push(`Leaving interior, good bye, or at least, cya later...`);
    mp.players.local.position = previousPosition;
});

