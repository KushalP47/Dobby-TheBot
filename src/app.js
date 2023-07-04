require('dotenv').config()
const { Client, IntentsBitField, EmbedBuilder, Embed, ActivityType,  } = require("discord.js");
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');
const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

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


