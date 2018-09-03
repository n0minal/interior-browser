let browser = undefined;
let previousPosition = undefined;


mp.events.add('playerCommand', (command) => {
    let args = command.split(/[ ]+/);
    let commandName = args.splice(0, 1)[0];
    
    if(commandName === "interior" || commandName === "i") 
    {
        if(browser === undefined) {
            if(!previousPosition) 
                previousPosition = mp.players.local.position;
            
            mp.gui.chat.push('Welcome to n0minal\'s Interior Browser Tool, choose an interior to visit!');            
            browser = mp.browsers.new('package://interior-browser/browser.html');
            
            //fix chat cursor hide override bug
            setTimeout(function() {
                mp.gui.cursor.show(true, true);
            }, 500);
        }
        else{
            browser.destroy();
            browser = undefined;
            mp.gui.cursor.show(false, false);
        }
    }

    if(commandName === "leave" || commandName === "l")
    {
        mp.gui.chat.push(`Good bye, or at least, cya later... )))`);
        mp.players.local.position = previousPosition;
    }
    
});

mp.events.add('enterInterior', (idata) => {
    let interior = JSON.parse(idata);
    let player = mp.players.local;
    mp.gui.chat.push(`================ JOINING INTERIOR ================`);
    mp.gui.chat.push(`Loading interior: ${interior.name}`);
    mp.gui.chat.push(`Interior Position: new mp.Vector3(${interior.location.x}, ${interior.location.y}, ${interior.location.z});`);
    player.position = new mp.Vector3(interior.location.x, interior.location.y, interior.location.z);

    if(interior.ipl) {
        if(Array.isArray(interior.ipl)) {
            interior.ipl.map((ipl) => {
                mp.gui.chat.push(`Requiring IPL: ${ipl}`);
                mp.game.invoke("0x41B4893843BBDB74",  interior.ipl);
            });
        }
        else {
            mp.gui.chat.push(`Requiring IPL: ${interior.ipl}`);
            mp.game.invoke("0x41B4893843BBDB74", interior.ipl);
        }
    }
});

mp.events.add('closeBrowser', () => {
    browser.destroy();
    browser = undefined;
    mp.gui.cursor.show(false, false);
});