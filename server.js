const express = require("express");
const app = express();

const youtubedl = require("youtube-dl");

app.use(bodyParser.json()); // support json encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
); // support encoded bodies

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/music", (req, res) => {
  let music = youtubedl(req.query.url, ["-f", "bestaudio[ext=m4a]"], {
    cwd: __dirname
  });

  music.on("info", function(info) {
    res.json({
      fulltitle: info.fulltitle,
      url: info.url,
      tags: info.tags,
      thumbnails: info.thumbnails
    });
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("OK!!!");
});
