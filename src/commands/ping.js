const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName('ping').setDescription('the ping pong!'),
  async execute(interaction) {
    await interaction.reply('Pong!!!');
  }
}