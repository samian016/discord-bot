const { SlashCommandBuilder } = require("discord.js");
const { fetchApi } = require("../utils/fetchApi");

module.exports = {
  data: new SlashCommandBuilder().setName('ping').setDescription('the ping pong!'),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: false });
    const raw = JSON.stringify({
      model: "dall-e-3",
      response_format: "b64_json",
      quality: "hd",
      prompt: "an image",
      n: 1,                                //define the number of images
      size: '1024x1024',                     //define the resolution of image
    })
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: raw,
    }).then((res) => res.json());
    console.log(res)
    await interaction.editReply('Pong!!!');
  }
}