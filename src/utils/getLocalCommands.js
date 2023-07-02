const path = require('path');
const getAllFiles = require('./getAllFiles');

// This function will take all the local commands(commands that are newly created/updated) in an array
// and then return it.

module.exports = (exceptions = []) => {

    // Initializing the array which we will return after filling all the commands
    let localCommands = [];

    // commandCategories will get all the folders which are there in the src/commands folder category wise.
    const commandCategories = getAllFiles(path.join(__dirname, '..', 'commands'), true);

    for(const category of commandCategories){

        //commandFiles will get all the files each category;
        const commandFiles = getAllFiles(category, false);

        //we will iterate through all the files and push the command object
        for(const commandFile of commandFiles){

            // now our main command is stored in form of JSON in that commandFile and
            // we only need to push the object so first we will extract that object
            const commandObject = require(commandFile);

            if(exceptions.includes(commandObject.name)){
                // if the command is enlisted in the exceptions then we won't push it in our localCommands
                continue;
            }
            localCommands.push(commandObject);
        };

    };

    return localCommands;
};