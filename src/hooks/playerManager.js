const { joinVoiceChannel, VoiceConnectionStatus, createAudioResource } = require("@discordjs/voice");
const musicPlayer = require("./musicPlayer")

async function playerManager(interaction, url) {
  let player = musicPlayer.player;

  if (musicPlayer.player === null) player = musicPlayer.init();

  const guild = interaction.guild;

  let voiceChannel = guild.channels.cache.find(
    (channel) => channel.type === 2 && channel.name === "botplayer"
  );
  if (!voiceChannel) voiceChannel = await guild.channels.create({
    name: "botplayer",
    type: 2
  });

  const music = createAudioResource(url);
  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
  })

  connection.on(VoiceConnectionStatus.Ready, () => {
    console.log("[+] Channel connected");
    connection.subscribe(player);
    musicPlayer.on("error", (err) => console.log(err));
    player.play(music);
  })

}
module.exports = {
  playerManager
}