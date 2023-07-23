const { Client, Interaction } = require('discord.js');
const { devs, testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');
const saveErrorToDatabase = require('../../utils/saveErrorToDatabase');
/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */

module.exports = async (client, interaction) => {

    const localCommands = getLocalCommands();

    if(interaction.isChatInputCommand()){

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
        saveErrorToDatabase(error);
    }
} else if(interaction.isButton()){

    try {
        // checking if the reaction is on the welcome message
        if(interaction.channelId === process.env.REGISTRATION_CHANNEL_ID && interaction.message.author.bot){

            const commandObject = localCommands.find((cmd)=> cmd.name === 'roleassignment');
            await commandObject.callback(client, interaction);
        }

        return;
    } catch (error) {
        saveErrorToDatabase(error);
    }
    
}

};