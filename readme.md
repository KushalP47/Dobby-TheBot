# Dobby - The Bot

Dobby is a Discord bot developed for the Website Making Challenge. It's designed to manage and facilitate the challenge, providing a range of features from welcoming new members to tracking user levels and progress.

## Features

- **Welcome Messages**: Dobby greets new members and provides them with essential information. See [`welcome.js`](src/commands/misc/welcome.js).
- **Role Assignment**: Dobby can assign roles to users based on their preferred problem statement. See [`roleAssignment.js`](src/commands/misc/roleAssignment.js).
- **Level Tracking**: Dobby tracks the XP and levels of users. See [`level.js`](src/commands/economy/level.js).
- **Progress Updates**: Dobby can receive and process updates on the progress of participants. See [`progress.js`](src/commands/economy/progress.js).

## Setup

1. Clone the repository.
2. Install the dependencies with `npm install`.
3. Create a `.env` file and set your environment variables as follows:
   - `TOKEN`: Your Discord bot token.
   - `apiURL`: The API URL for external requests.
   - `CLIENT_ID`: Your Discord bot's client ID.
   - `DAILYPROGRESS_CHANNEL_ID`: The channel ID for daily progress updates.
   - `GUILD_ID`: Your Discord server's guild ID.
   - `MENTOR_ROLE_ID`: The role ID for mentors in your server.
   - `MONGODB_URI`: Your MongoDB connection string.
   - `NODE_VERSION`: The version of Node.js you are using.
   - `REGISTRATION_CHANNEL_ID`: The channel ID for new registrations.
   - `STATUS_CHANNEL_ID`: The channel ID for bot status updates.
4. Run the bot with `node src/app.js`.

## Dependencies

- [axios](https://www.npmjs.com/package/axios)
- [canvacord](https://www.npmjs.com/package/canvacord)
- [discord.js](https://www.npmjs.com/package/discord.js)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [node-cron](https://www.npmjs.com/package/node-cron)

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## License

This project is licensed under the ISC License.
