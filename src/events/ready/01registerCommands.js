const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getLocalCommands = require("../../utils/getLocalCommands");
const saveErrorToDatabase = require("../../utils/saveErrorToDatabase");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const { testServer } = require("../../../config.json");

module.exports = async (client) => {

    try {

        // Retrieving local and application commands from utils
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, testServer);

        for(const localCommand of localCommands){

            // console.log(localCommand);
            // will get some data from localCommands to compare it with applicationsCommand
            const { name, description, options } = localCommand;

            // will check each of the local command exists in application or not
            const existingCommand = await applicationCommands.cache.find((cmd) => cmd.name === name);

            if(existingCommand){
                // if the command exists then we will see if the commands wants to be deleted or updated

                if(localCommand.deleted){
                    // to delete the command
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`Command ${name} deleted 🗑️`);
                    continue;
                }

                if(areCommandsDifferent(existingCommand, localCommand)){
                    // to update the command
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });
                    console.log(`Command ${name} edited 🔂`);
                }
            } else {
                if (localCommand.deleted) {
                    console.log(
                      `⏩ Skipping registering command "${name}" as it's set to delete.`
                    );
                    continue;
                  }
          
                  await applicationCommands.create({
                    name,
                    description,
                    options,
                  });
          
                  console.log(`👍 Registered command "${name}."`);
                }
            }
        }
        
     catch (error) {
        saveErrorToDatabase(error);
    }
};