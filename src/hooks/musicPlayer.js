const { createAudioPlayer } = require("@discordjs/voice");

class MusicPlayer {
  constructor() {
    this.player = null;
    this.state = false;
  }

  init() {
    return (this.player = createAudioPlayer());
  }

  play(interaction, user) {
    if (this.player === null) return interaction.reply({ content: `${user} No music playing!` });
    this.player.unpause();
    this.state = true;
    return interaction.reply({ content: `${user} unpaused the player.` });
  }

  pause(interaction, user) {
    if (this.player === null) return interaction.reply({ content: `${user} No music playing!` });
    this.player.pause();
    this.state = false;
    return interaction.reply({ content: `${user} pause the player.` });
  }

  kill(interaction, user) {
    if (this.player === null) return interaction.reply({ content: `${user} No player instance available` });
    this.player.stop();
    this.state = false;
    return interaction.reply({ content: `${user} pause the player.` });
  }
}

const musicPlayer = new MusicPlayer();

module.exports = musicPlayer;