const fs = require("fs");
const prompt = require("prompt");
const youtubedl = require("youtube-dl");

prompt.start();

prompt.get(["url"], (err, result) => {
  if (err) {
    return console.error(err);
  }

  if (result.url) {
    let music = youtubedl(result.url, ["-f", "bestaudio[ext=m4a]"], {
      cwd: __dirname
    });

    var size = 0;
    var pos = 0;

    music.on("info", function(info) {
      "use strict";

      size = info.size;
      music.pipe(
        fs.createWriteStream(
          `${__dirname}/downloads/${info.title} - ${info.creator}.mp3`
        )
      );
    });

    music.on("data", function data(chunk) {
      "use strict";
      pos += chunk.length;

      // `size` should not be 0 here.
      if (size) {
        var percent = ((pos / size) * 100).toFixed(2);
        process.stdout.cursorTo(0);
        process.stdout.clearLine(1);
        process.stdout.write(percent + "%");
      }
    });

    music.on("end", function end() {
      "use strict";
      console.log("\nDone");
    });

    // let url = result.url;

    // const music = youtubedl(
    //   url,
    //   // Optional arguments passed to youtube-dl.
    //   ["--format=18"],
    //   // Additional options can be given for calling `child_process.execFile()`.
    //   { cwd: __dirname }
    // );

    // // Will be called when the download starts.
    // music.on("info", function(info) {
    //     music.
    //   music.pipe(
    //     fs.createWriteStream(
    //       `${__dirname}/downloads/${info.title} - ${info.creator}.mp3`
    //     )
    //   );
    // });
  }

  //https://music.youtube.com/watch?v=eDLqWjATyyk
});
