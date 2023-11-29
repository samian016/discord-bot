const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName('ping').setDescription('the ping pong!'),
  async execute(interaction) {
    const guild = interaction.guild;
    if (!guild) return await interaction.reply("You are not in any server.");
    const channlName = `${interaction.user.username}'s-playList`
    const voiceChannel = guild.channels.cache.find(
      (channel) => channel.type === 2 && channel.name === channlName
    );
    if (voiceChannel) {
      console.log(interaction.client.user.id)
      // const connection = await voiceChannel.join();
      // console.log(connection);
    } else {
      const channel = await guild.channels.create({
        name: channlName,
        type: 2,
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: [400, 10]
          },
          {
            id: interaction.client.user.id,
            allow: [400, 10]
          }
        ],
      });
      console.log('connection');
    }
    /* this is to create an channel
    */
    // voiceChannel.delete()
    await interaction.reply('Pong!!!');
  }
}