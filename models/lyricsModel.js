const { Schema, model } = require("mongoose");

const LyricsSchema = new Schema({
  songName: { type: String, required: true },
  genre: String,
  lyric: { type: String, required: true },
  artist: String,
  year: Number,
  lyricId: String,
}, {timestamps:true});

LyricsSchema.virtual("path").get(function () {
  return `${this.artist.replace(" ", "_")}_${this.songName.replace(" ", "_")}`;
});

const LyricsModel = model("lyrics", LyricsSchema);

module.exports = LyricsModel;
