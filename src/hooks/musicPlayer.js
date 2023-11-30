const { createAudioPlayer } = require("@discordjs/voice");

class MusicPlayer {
  constructor() {
    this.player = null;
    this.state = false;
  }

  init() {
    return (this.player = createAudioPlayer());
  }

  play() {
    return console.log("player");
  }

  pause() {
    return console.log("player");
  }

  kill() {
    return console.log("player");
  }
}

const musicPlayer = new MusicPlayer();

module.exports = musicPlayer;