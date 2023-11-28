const { SlashCommandBuilder, AttachmentBuilder, userMention } = require("discord.js");
const { req } = require("../utils/fetchApi");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('request-id')
    .setDescription('this is Stable diffusion to generate your mind')
    .addStringOption((option) =>
      option.setName('request-id')
        .setDescription('write your request id here.')
        .setRequired(true)
        .setMaxLength(2000))
  ,
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: false });
    try {
      const id = await interaction.options.getString('request-id');
      const user = userMention(interaction.user.id);
      const response = await req({
        base: 'stableDiff',
        uri: 'api/v4/dreambooth/fetch',
        method: 'POST',
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          "key": "wBJ30FC6yyUnMlpe5O3ZQFGiqPXbhLJ8bMscXUrV8auxz0Nt8gY6mmVXb2jl",
          "request_id": id
        }
      })
      const { data: { output } } = response;

      if (response.data.status === 'success') {
        if (output[0].endsWith('.base64')) {
          const raw = await req({
            fullUrl: output[0],
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            },
          })
          const { data: base } = raw;
          const image = Buffer.from(base, 'base64');
          const attacment = new AttachmentBuilder(image, { name: 'image.png' });
          return await interaction.editReply({
            content: `${user}\n Result of request ${id}`,
            files: [attacment],
          });
        }
        else return await interaction.editReply({
          content: `${user}\n Result of request ${id}`,
          files: [output[0]],
        });
      }
      else if (response.data.status === 'processing') {
        return await interaction.editReply({
          content: `${user}\n Result: ${id} request still pending`,
        });
      }
      else if (response.data.status === 'failed') {
        return await interaction.editReply({
          content: `${user}\n Issue: ${id} ${response.data.messege}`,
        });
      }
      console.log(response)
      return await interaction.editReply({
        content: `Result: Bot is confused!`
      });
    } catch (err) {
      await interaction.editReply('An error occurred while processing the command.');
      console.log({ err });
    }
  }
}

// 56969165 ,, 56988582  ,,  56988277