const request = require("request");
const svg64 = require("svg64");

const HEADERS = {
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
};

function iconToBase64(iconLink) {
  return new Promise((resolve, reject) => {
    request(
      {
        method: "get",
        uri: iconLink,
        encoding: "binary"
      },
      function (err, res, body) {
        // console.log(res.headers["content-type"]);
        if (err) reject(err);
        let base64 = "";
        if (res.headers["content-type"] == "image/svg+xml") {
          base64 = svg64(body);
        } else {
          base64 = "data:image/png;base64," + new Buffer.from(body, "binary").toString("base64");
        }
        console.log(base64);
        resolve(base64);
      }
    );
  });
}

// const iconLink = "https://github.githubassets.com/favicons/favicon.svg";
// const iconLink = "https://pixel.plumbing/px/32x32/sharp-logo.svg"; // 这实际是一张png的图 image/png
// const iconLink = "https://www.bilibili.com/favicon.ico";
const iconLink = "https://cdn.segmentfault.com/v-5f0a9217/global/img/favicon.ico";

iconToBase64(iconLink);
