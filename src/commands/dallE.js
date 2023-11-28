const { SlashCommandBuilder, AttachmentBuilder, userMention } = require("discord.js");
const { req } = require("../utils/fetchApi");

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
      const response = await req({
        base: 'openAi',
        uri: 'v1/images/generations',
        method: 'POST',
        withCredentials: false,
        data: {
          model: "dall-e-3",
          response_format: "b64_json",
          quality: "hd",
          prompt,
          n: 1,                                //define the number of images
          size: '1024x1024',                     //define the resolution of image
        },
      });
      const { data } = response;
      const image = Buffer.from(data.data[0].b64_json, 'base64');
      const attacment = new AttachmentBuilder(image, { name: 'image.png' });
      const user = userMention(interaction.user.id);
      return await interaction.editReply({
        content: `${user} Prompt: "${prompt}"`,
        files: [attacment],
      });
    } catch (err) {
      await interaction.editReply('An error occurred while processing the command.');
      console.log({ err });
    }
  }
}