const { devs, testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');


module.exports = async (client, interaction) => {
    if(!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        
        const commandObject = localCommands.find((cmd)=> cmd.name === interaction.commandName);

        if(!commandObject) return;

        if(commandObject.devOnly){
            if(!devs.includes(interaction.member.id)){
                interaction.reply({
                    content: "This command can be used by Devs only",
                    ephemeral: true,
                });
                return;
            }
        }


        if(commandObject.testOnly){
            if(testServer != interaction.guild.id){
                interaction.reply({
                    content: "This command cannot be run here",
                    ephemeral: true,
                });
                return;
            }
        }

        if(commandObject.permissionsRequired?.length){
            for( const permission of commandObject.permissionsRequired){
                if(!interaction.member.permissions.has(permission)){
                    interaction.reply({
                        content: "Not enough permissions",
                        ephemeral: true,
                    });
                    return;
                }
            }
        }

        if(commandObject.botPermissions?.length){
            for( const permission of commandObject.botPermissions){
                const bot = interaction.guild.members.me;

                if(!bot.permissions.has(permission)){
                    interaction.reply({
                        content: " I don't have enough permissions",
                        ephemeral: true,
                    });
                    return;
                }
            }
        }

        await commandObject.callback(client, interaction);
        

    } catch (error) {
        console.log(`There was error running this command: ${error}`);
    }

};