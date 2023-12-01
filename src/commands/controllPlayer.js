const { SlashCommandBuilder, userMention } = require("discord.js");
const musicPlayer = require("../hooks/musicPlayer");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('music')
    .setDescription('this is music player to pokeed by you!')
    .addStringOption((option) =>
      option.setName('trigger')
        .setDescription('The gif category')
        .setRequired(true)
        .addChoices(
          { name: 'Pause', value: 'pause' },
          { name: 'Play', value: 'play' },
          { name: 'Stop', value: 'kill' },
        )
    ),
  async execute(interaction) {
    // await interaction.deferReply({ ephemeral: false });
    try {
      const action = await interaction.options.getString('trigger');
      const user = userMention(interaction.user.id);
      musicPlayer[action](interaction, user);
    } catch (err) {
      await interaction.reply({ content: 'An error occurred while processing the command.', ephemeral: true });
      console.log({ err });
    }
  }
}