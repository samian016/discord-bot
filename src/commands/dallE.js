const { default: axios } = require("axios");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName('dall-e').setDescription('this is DALL.E. to generate your mind'),
  async execute(interaction) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt: 'A beautiful sunset over a serene lake',
          n: 1,                                //define the number of images
          size: '1024x1024',                     //define the resolution of image
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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',
          },
        }
      );

    } catch (err) {
      console.log({ err })
    }
    return await interaction.reply('image');
  }
}