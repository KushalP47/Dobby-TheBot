const { Client, GuildMember, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Level = require('../../models/Level');
/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 */

// function getRoleID(role, client) {
//     const authorRoles = 
//     let roleArr = [];
//     authorRoles.forEach((role) => {
//       roleArr.push(role.name);
//     });
//     // console.log(roleArr[0]);
//     return roleArr[0];
// }

module.exports = async (client, member) => {
    const registrationChannel = client.channels.cache.get(process.env.REGISTRATION_CHANNEL_ID);
    try {

        const memberUsername = member.user.username;
        const query = {
            username: memberUsername,
            role: "wmc-mentor",
        }

        const level = await Level.findOne(query);
        if(level){
            await member.roles.add(process.env.MENTOR_ROLE_ID);
            const role = reaction.message.guild.roles.cache.find((r) => r.name === query.role);
            await registrationChannel.send({
                content: `Aaaiye ${member.user} jiiii padharye jiii aap hi kaa intezarrr tha humko.....
                ${role} ki jimmedaari diye hai toh responsibilitiiijjj k saath kaaam ki jiyega jara`,
                ephemeral: true,
            });
            process.exit();
        }

        const queryMember = {
            username: memberUsername,
            role: "member",
        }

        const level1 = await Level.findOne(queryMember);
        if(level1){
            const statement1 = new ButtonBuilder()
                .setCustomId('magic-encyclopedia')
                .setLabel('Magical Encyclopedia')
                .setStyle(ButtonStyle.Secondary);

            const statement2 = new ButtonBuilder()
                .setCustomId('quidditch-sports')
                .setLabel('Quidditch Sports Event')
                .setStyle(ButtonStyle.Primary);

            const statement3 = new ButtonBuilder()
                .setCustomId('travel-agency')
                .setLabel('Travel Agency')
                .setStyle(ButtonStyle.Success);

            const statement4 = new ButtonBuilder()
                .setCustomId('hogwarts-portal')
                .setLabel('Hogwarts School Portal')
                .setStyle(ButtonStyle.Danger);

            const row1 = new ActionRowBuilder()
                .addComponents(statement1, statement2);
            
            const row2 = new ActionRowBuilder()
                .addComponents(statement3, statement4);

            await registrationChannel.send({
                content: `Welcome ${member.user} to this magical Developer's Dungeon where I, Dobby - The Manager, will provide you everykind of assistance so that you can solve the modern problems of wizarding world with your might.
                Now I do know that you are very powerful wizard and you are capable of solving all our problems but for now you must select only one problem to solve. Below given are the 4 problem statements for this challenge kindly select one.....`,
                components: [row1, row2],
                ephemeral: true,
            })
            process.exit();
        }
        
        await registrationChannel.send({
            content: `${member.user} Wot is thiss behaviourr?? heh?? Participate krna hai nai aur sirf panchaat krne ana hai tumko. Get lostttt don't waste my master's time`,
            ephemeral: true,
        });
        process.exit();

        
        
    } catch (error) {
        console.log(`Error generated while configuring the role: ${error}`);
    }
};