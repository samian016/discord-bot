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
          "key": process.env.STABLE_DIFF_API_KEY,
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
            ephemeral: true
          });
        }
        else return await interaction.editReply({
          content: `${user}\n Result of request ${id}`,
          files: [output[0]],
          ephemeral: true
        });
      }
      else if (response.data.status === 'processing') {
        return await interaction.editReply({
          content: `${user}\n Result: ${id} request still pending`,
          ephemeral: true
        });
      }
      else if (response.data.status === 'failed') {
        return await interaction.editReply({
          content: `${user}\n Issue: ${id} ${response.data.messege}`,
          ephemeral: true
        });
      }
      return await interaction.editReply({
        content: `Result: Bot is confused!`,
        ephemeral: true
      });
    } catch (err) {
      await interaction.editReply({ content: 'An error occurred while processing the command.', ephemeral: true });
      console.log({ err });
    }
  }
}

// 56969165 ,, 56988582  ,,  56988277