const { Client, Interaction, PermissionFlagsBits } = require('discord.js');
const Level = require('../../models/Level');
const saveErrorToDatabase = require('../../utils/saveErrorToDatabase');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    name: 'roleassignment',
    description: "Will assign roles to members",
    devOnly: false,
    testOnly: false,
    // options: [{}],
    deleted: false,
    botPermissions: [PermissionFlagsBits.ManageRoles],

    callback: async (client, interaction) => {

        try {

            // start interaction
            await interaction.deferReply({ ephemeral: true });

            // got the role which participant selected
            const role = interaction.guild.roles.cache.get(interaction.customId);

            // check if role exist or not
            if (!role) {
                interaction.editReply({
                content: "I couldn't find that role",
                });
                return;
            }


            // will check if user is registered participant or not
            const query = {
                username: interaction.user.username,
                role: "member",
            }

            const level = await Level.findOne(query);
            // console.log(level);
            if(level){
                await interaction.member.roles.add(role);
                level.role = role.name; // changing the role in database

                // saving the changes in database
                await level.save().catch((e) => {
                    console.log(`Error saving updated level ${e}`);
                    return;
                });

                interaction.editReply({
                    content: `You got the role of ${role.name} succesfully`,
                })
                return;
            }

            interaction.editReply({
                content: `You are not eligible for the role of ${role.name}`,
            })
            return;

            
        } catch (error) {
            saveErrorToDatabase(error);
        }
        
    },
};