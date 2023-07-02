module.exports = async (client, guildID) => {

    // applicationCommands will be an array containing all the existing commands in the bot's server/application.
    let applicationCommands;

    if(guildID){
        // If server exists then we will fetch all the commands which are there in the server already.
        const guild = await client.guilds.fetch(guildID);
        applicationCommands = guild.commands;
    }
    else{
        // Else we will take all the commands which are made in the application of the bot.
        applicationCommands = client.application.commands;
    }

    await applicationCommands.fetch();
    return applicationCommands;

};