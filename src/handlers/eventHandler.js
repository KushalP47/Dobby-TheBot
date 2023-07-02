const path = require('path');
const getAllFiles = require('../utils/getAllFiles');

// This is a very important function as whenever any event happens 
// we will call all the events from the events folder and run it 
module.exports = (client) => {

    // we will get all the folders from the events folder
    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

    for(const eventFolder of eventFolders){

        const eventFiles = getAllFiles(eventFolder, false);
 
        //sorting the files so that we can run important files first
        eventFiles.sort((a, b) => a > b);

        // eventName is very important so that we can tell client to which type of event is taking place
        const eventName = eventFolder.split('/').pop();
        
        client.on(eventName, async(args) => {

            for(const eventFile of eventFiles){

                //getting the function from the file
                const eventFunction = require(eventFile);

                //executing the function
                eventFunction(client, args);
            };

        });

    };
};