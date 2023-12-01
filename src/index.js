const { Client, GatewayIntentBits, Partials, PermissionsBitField } = require('discord.js');
const { loadCommands } = require('./utils/loadCommands');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ],
  permissions: [
    PermissionsBitField.Flags.ManageChannels,
    PermissionsBitField.Flags.ManageGuild,
  ],
  partials: [Partials.Message, Partials.Channel]
});


loadCommands(client);

client.on('ready', () => {
  console.log(`[+] Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  command.execute(interaction);
});

client.login(process.env.BOT_TOKEN);