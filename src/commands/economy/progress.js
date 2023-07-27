const User = require('../../models/User')
const saveErrorToDatabase = require('../../utils/saveErrorToDatabase')
const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const reply = require("../../utils/reply");


module.exports = {
    name: 'progress',
    description: 'update your daily progress',
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
        // interaction.deferReply({ephemeral: true});
        if(interaction.channelId !== process.env.DAILYPROGRESS_CHANNEL_ID){
            interaction.reply({
                content: `The command ${interaction.commandName} can only be used in ${interaction.guild.channels.cache.get(process.env.DAILYPROGRESS_CHANNEL_ID)} channel`,
                ephemeral: true,
            })
            return;
        }

        try {
            
            const query = {
                userId: interaction.member.id,
                guildId: interaction.guild.id,
            }

            let user = await User.findOne(query);
            
            if(user){
                const lastDailyDate = user.lastDaily.toDateString();
                const currentDate = new Date().toDateString();
                const newData = user.data;
                if(lastDailyDate === currentDate){
                    interaction.reply({
                        content: `${interaction.member.user} you have already updated your progress, please come tommorrow to update your progress`,
                        // ephemeral: true
                    });
                    return;
                }
                newData.push(interaction.options.get('updates').value);
                user.data = newData;
                user.lastDaily = new Date();
            }
                else{
                    const newData = [];
                    newData.push(interaction.options.get('updates').value);
                    user = new User({
                        ...query,
                        lastDaily: new Date(),
                        data: newData,
                    });
            }

            
            user.points += 25;
            interaction.deferReply()
            const message = await reply(interaction.options.get('updates').value, interaction.user.id, user.points);
            if(message === "BhagulobsDobby"){
                interaction.editReply({
                    content: `Good progress ${interaction.member.user}, daily reward of 25 points is added to your account. Now your balance is ${user.points}`,
                    // ephemeral: true,
                });
            }else{
                interaction.editReply({
                    content: message,
                    // ephemeral: true,
                });
            }
            await user.save();
            return;
            
        } catch (error) {
            saveErrorToDatabase(error);
        }
    }
}