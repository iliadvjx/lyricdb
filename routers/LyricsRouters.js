const { Router } = require("express");
const LyricsModel = require("../models/lyricsModel");
const { uid } = require("uid");
const { body, validationResult } = require("express-validator");
const router = Router();
const LyricValidator = require("../helper/lyricValidator");
router.get("/new", (req, res) => {
  res.render("newLyric");
});

router.post("/new", LyricValidator, async (req, res) => {
  const errors = validationResult(req).errors;
  if (errors.length) {
   return res.render("newLyric", { multiError: errors.map((e) => e.msg) });
  }
  console.log(validationResult(req));
  let { songName, artist, lyric, genre, year } = req.body;
  try {
    let searchForDuplicate = await LyricsModel.findOne({ songName, artist });
    if (!searchForDuplicate) {
      const lyricId = uid(5);
      let lyricField = new LyricsModel({
        songName,
        artist,
        lyric,
        genre,
        year,
        lyricId: lyricId,
        createAt: new Date(),
      });
      await lyricField.save();

      res.redirect(`/lyric/${lyricId}`);
    } else {
      res.render("newLyric", { error: "This song is already in database" });
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/edit/:lyricid", async (req, res) => {
  try {
    let lyric = await LyricsModel.findOne({ lyricId: req.params.lyricid });
    res.render("editLyric", { lyric });
  } catch (error) {
    console.log(error);
  }
});
router.post("/edit", async (req, res) => {
  let { songName, artist, lyric, genre, year, lyricId } = req.body;
  try {
    let updateResult = await LyricsModel.findOneAndUpdate(
      { lyricId },
      {
        $set: {
          songName,
          artist,
          lyric,
          genre,
          year,
        },
      }
    );

    res.redirect(`/lyric/${updateResult.lyricId}`);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/remove/:id", async (req, res) => {
  try {
    await LyricsModel.findOneAndDelete({ lyricId: req.params.id });
    res.send({ ok: true, msg: "The lyric was successfully deleted" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:lyricid", async (req, res) => {
  try {
    let lyric = await LyricsModel.findOne({ lyricId: req.params.lyricid });
    if (!lyric) return res.render("404");
    res.render("lyric", { lyric });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
