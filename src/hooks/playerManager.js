const { joinVoiceChannel, VoiceConnectionStatus, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
const musicPlayer = require("./musicPlayer")

async function playerManager(interaction, url) {
  let player = musicPlayer.player;

  if (musicPlayer.player === null) player = musicPlayer.init();

  const guild = interaction.guild;

  let voiceChannel = guild.channels.cache.find(
    (channel) => channel.type === 2 && channel.name === "bot-player"
  );
  if (!voiceChannel) voiceChannel = await guild.channels.create({
    name: "bot-player",
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
    try {
      connection.subscribe(player);
      player.on("error", (err) => console.log(err));
      player.play(music);
    } catch (err) {
      console.log(err);
    }
  });

  connection.on(VoiceConnectionStatus.Connecting, () => {
    console.log("[+] Channel conncecting");
  });

  connection.on(VoiceConnectionStatus.Disconnected, () => {
    console.log('[+] Disconnected from voice channel.');
    try {
      connection.destroy();
      musicPlayer.state = false;
      player.stop();
    } catch (e) { console.error(e) }
  });

  player.on(AudioPlayerStatus.Playing, () => {
    console.log('[+] Music is playing in the player channel.');
    musicPlayer.state = true;
  });

  player.on(AudioPlayerStatus.Idle, () => {
    try {
      connection.destroy();
      musicPlayer.state = false;
    } catch (e) { console.error(e) }
  });
}
module.exports = {
  playerManager
}