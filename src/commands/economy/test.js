const reply = require("../../utils/reply");
const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const saveErrorToDatabase = require('../../utils/saveErrorToDatabase');
module.exports = {
    name: 'test',
    description: 'testing new features',
    devOnly: false,
    testOnly: false,
    options: [{
        name: 'updates',
        description: 'progress made',
        type: ApplicationCommandOptionType.String,
        required: true,
    }],
    deleted: false,
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async(client, interaction) => {
        try {
            
    
            await interaction.deferReply();
            if(interaction.channelId !== '1134034886240518205'){
                interaction.editReply("Can't use the command here");
                return;
            }
            if(interaction.user.id !== '508258668312002574'){
                interaction.editReply("Only server admin can run command");
                return;
            }
            const message = await reply(interaction.options.get('updates').value, interaction.user.id, 25);
            interaction.editReply(message);
            return;
        } catch (error) {
            console.log(error);
            saveErrorToDatabase(error);
        }
    }
}