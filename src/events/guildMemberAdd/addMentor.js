const { Client, GuildMember, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Level = require('../../models/Level');
const saveErrorToDatabase = require('../../utils/saveErrorToDatabase');
/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 */

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
        }
        return;
        
    } catch (error) {
        saveErrorToDatabase(error);
    }
};