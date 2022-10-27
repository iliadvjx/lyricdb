const mongoose = require("mongoose");

const mongoDB = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lyricsdb";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true },(e)=>{

    console.log(e || 'mongodb connected')
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
