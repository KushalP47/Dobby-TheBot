require('dotenv').config()
const { Client, IntentsBitField, EmbedBuilder, Embed, ActivityType,  } = require("discord.js");
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

( async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI, { keepAlive: true});
    console.log("Connected to Database");

    eventHandler(client);

    client.login(process.env.TOKEN);

  } catch (error) {
    console.log(error);
  }
})();


