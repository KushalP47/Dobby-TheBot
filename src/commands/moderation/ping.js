const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {

    name: 'ping',
    description: 'pong',
    devOnly: false,
    testOnly: false,
    // options: [{    }],
    deleted: true,

    callback: (client, interaction) => {
        interaction.reply('pong');
        return;
    },
};