const { SlashCommandBuilder } = require("discord.js");
const musicPlayer = require('../hooks/musicPlayer');
const { videoToMP3 } = require("../utils/videoToMP3");
const { playerManager } = require("../hooks/playerManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('the ping pong!')
    .addStringOption(option =>
      option.setName('youtubelink')
        .setDescription('The youtube link to play music from.')
        .setRequired(true)),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const inputedData = await interaction.options.getString('youtubelink');
    if (musicPlayer.state) return interaction.editReply({ content: 'There is already a song playing. Please stop the music first using "/controlmusic:stop" command.', ephemeral: true });
    const youtubeLinkRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/;
    const youtubeLinkMatch = inputedData.match(youtubeLinkRegex);
    if (!youtubeLinkMatch) return interaction.editReply({ content: 'Invalid youtube link.', ephemeral: true });
    return videoToMP3(inputedData)
      .then((response) => {
        playerManager(interaction, response.url);
        interaction.editReply({ content: `Playing ${youtubeLinkMatch[0]}...` });
      })
      .catch((er) => {
        console.log(er)
      });
  }
}