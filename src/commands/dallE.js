const { default: axios } = require("axios");
const { SlashCommandBuilder  } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName('dall-e')
  .setDescription('this is DALL.E. to generate your mind')
  .addStringOption((option) =>
		option.setName('prompt')
			.setDescription('write your imagination here.')
      .setRequired(true)
      .setMaxLength(2000)),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: false });
    try {
      const prompt = await interaction.options.getString('prompt');
      // const user = userMention(interaction.user.id);
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt,
          n: 1,                                //define the number of images
          size: '1024x1024',                     //define the resolution of image
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
      const {data} = response;
      const image = data.data[0].url;
      return await interaction.editReply(image);
    } catch (err) {
      await interaction.editReply('An error occurred while processing the command.');
      console.log({ err });
    }
  }
}