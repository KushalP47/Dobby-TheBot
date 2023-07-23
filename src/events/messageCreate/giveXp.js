const { Client, Message } = require('discord.js');
const calculateLevelXp = require('../../utils/calculateLevelUpXp');
const saveErrorToDatabase = require('../../utils/saveErrorToDatabase');
const Level = require('../../models/Level');
const cooldowns = new Set();
// const roleDistribution = require('../../utils/roleDistribution');

function getRandomXp(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function getRole(message) {
    const authorRoles = message.member.roles.cache;
    let roleArr = [];
    authorRoles.forEach((role) => {
      roleArr.push(role.name);
    });
    // console.log(roleArr[0]);
    return roleArr[0];
}

/**
 *
 * @param {Client} client
 * @param {Message} message
 */

module.exports = async(client, message) => {
    if (!message.inGuild() || message.author.bot || cooldowns.has(message.author.id)) return;

    const xpToGive = getRandomXp(1, 15);

    const query = {
        username: message.author.username,
        role: getRole(message),
    };
    

    try {
        const level = await Level.findOne(query);
        if (level) {
            level.xp += xpToGive;
            // message.channel.send(`${message.member} you have xp up to **level ${level.xp}**.`);
            if (level.xp > calculateLevelXp(level.level)) {
              level.xp = 0;
              level.level += 1;
              const statusChannelID = process.env.STATUS_CHANNEL_ID;
              const statusChannel = client.channels.cache.get(statusChannelID);
              statusChannel.send(`${message.member} you have leveled up to **level ${level.level}**.`);
            }
      
            await level.save().catch((e) => {
              console.log(`Error saving updated level ${e}`);
              return;
            });
            cooldowns.add(message.author.id);
            setTimeout(() => {
              cooldowns.delete(message.author.id);
            }, 60000);
          }
        else{
            message.channel.send(`${message.author} you haven't registered in the db`);
        }
    } catch (error) {
      saveErrorToDatabase(error);
    }

};