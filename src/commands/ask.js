const { default: axios } = require("axios");
const { SlashCommandBuilder, AttachmentBuilder, userMention } = require("discord.js");
const { req } = require("../utils/fetchApi");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('this is chatGPT to answer you')
    .addStringOption((option) =>
      option.setName('question')
        .setDescription('write your question here.')
        .setRequired(true)
        .setMaxLength(6000)),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: false });
    try {
      const question = await interaction.options.getString('question');
      const response = await req({
        base: 'openAi',
        uri: 'v1/chat/completions',
        method: 'POST',
        withCredentials: false,
        data: {
          model: "gpt-3.5-turbo",
          messages: [{
            "role": "system", "content": `${question}`
          }],
        }
      });
      const { data } = response;
      const reply = data.choices[0].message.content;
      const user = userMention(interaction.user.id);
      return await interaction.editReply({
        content: `${user} Prompt: "${question}"\n Answer: \t ${reply}\n`,
      });
    } catch (err) {
      await interaction.editReply('An error occurred while processing the command.');
      console.log({ err });
    }
  }
}