const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'welcome',
    description: 'to greet',
    devOnly: false,
    testOnly: false,
    options: [{
        name: 'targeted-user',
        description: 'who you wants to greet',
        type: ApplicationCommandOptionType.User,
        required: true,
    }],
    deleted: true,

    callback: (client, interaction) => {
        const target = interaction.options.get('targeted-user');
        // console.log(target);
        interaction.reply(`Welcome ${target.user} to this magical Developers' Dungeon`);
    },
};