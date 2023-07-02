const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    AttachmentBuilder,
  } = require('discord.js');
  const canvacord = require('canvacord');
  const calculateLevelXp = require('../../utils/calculateLevelUpXp');
  const Level = require('../../models/Level');

function getRole(targetUser) {
    const authorRoles = targetUser.roles.cache;
    let roleArr = [];
    authorRoles.forEach((role) => {
      roleArr.push(role.name);
    });
    // console.log(roleArr[0]);
    return roleArr[0];
}
module.exports = {
    /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
    callback: async(client, interaction) => {
        await interaction.deferReply();
        if(interaction.channelId != process.env.STATUS_CHANNEL_ID){
            interaction.editReply("You can only run this command in the status channel");
            return;
        }
     
        const targetUser = interaction.member;
        const targetUserObj = await interaction.guild.members.fetch(targetUser.user.id);

        const fetchedLevel = await Level.findOne({
            username: targetUser.user.username,
            role: getRole(targetUser),
        });

        // console.log(fetchedLevel.username, fetchedLevel.role);


        let allLevels = await Level.find().select(
            '-_id username level xp'
          );

        allLevels.sort((a, b) => {
            if (a.level === b.level) {
              return b.xp - a.xp;
            } else {
              return b.level - a.level;
            }
        });

        let currentRank = allLevels.findIndex((lvl) => lvl.username === fetchedLevel.username) + 1;

        const rank = new canvacord.Rank()
            .setAvatar(targetUserObj.user.displayAvatarURL({ size: 256 }))
            .setRank(currentRank)
            .setLevel(fetchedLevel.level)
            .setCurrentXP(fetchedLevel.xp)
            .setRequiredXP(calculateLevelXp(fetchedLevel.level))
            .setStatus(targetUserObj.presence.status)
            .setProgressBar('#FFC300', 'COLOR')
            .setUsername(fetchedLevel.username)
            .setDiscriminator(targetUserObj.user.discriminator);

        const data = await rank.build();
        const attachment = new AttachmentBuilder(data);
        interaction.editReply({ files: [attachment] });
    },

    name: 'level',
    description: "Shows XP your level.",

};