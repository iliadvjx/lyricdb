const bodyParser = require("body-parser");
const express = require("express");
const app = express();
require("dotenv").config();
require("./db/mongoose");
const morgan = require("morgan");
const LyricsModel = require("./models/lyricsModel");

const LyricsRouters = require("./routers/LyricsRouters");

const port = process.env.PORT || 3000;
app.use(morgan("combined"));
app.use(express.static("public"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/lyric", LyricsRouters);

app.get("/", async (req, res) => {
  try {
    let allLyrics = await LyricsModel.find({}).sort({_id: -1});
    res.render("home", { lyrics: allLyrics });
  } catch (error) {
    console.log(error);
  }
});

app.all("/*", (req, res) => {
  return res.render("404");
});


app.listen(port, () => console.log(`API Server is run on :${port}`));
