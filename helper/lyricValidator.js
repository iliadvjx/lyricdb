const { body, validationResult } = require("express-validator");
const validateArray = [
    body("songName", "Song Name is invalid or empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

    body("artist", "Artist is invalid or empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
    
    body("genre", "Genre is invalid or empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

    body("year", "Year is invalid or empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

    body("lyric", "Lyric is invalid or empty")
    .trim()
    .isLength({ min: 1 })
   ,
]
module.exports= validateArray