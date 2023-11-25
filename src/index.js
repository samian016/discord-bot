const { Client, GatewayIntentBits } = require('discord.js');
const { loadCommands } = require('./utils/loadCommands');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


loadCommands(client);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate',  (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  command.execute(interaction);
});

client.login(process.env.BOT_TOKEN);