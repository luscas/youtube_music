const express = require("express");
const app = express();

const youtubedl = require("youtube-dl");

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
});a

app.listen(process.env.PORT || 3000, () => {
  console.log("OK!!!");
});
