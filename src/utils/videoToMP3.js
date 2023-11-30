const ytdl = require("ytdl-core")

async function videoToMP3(url) {
  const info = await ytdl.getInfo(url);
  if (!info) return Error("Something went wrong!");
  const audio = info.formats.find((form) => form.mimeType === 'audio/mp4; codecs="mp4a.40.2"' && form.audioBitrate === 128);
  if (!audio) return Error("Something went wrong!");
  return audio;
}
module.exports = {
  videoToMP3
}