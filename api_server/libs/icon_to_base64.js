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
        if (err) reject(err);
        let base64 = "";
        if (iconLink.endsWith(".svg")) {
          base64 = svg64(body);
        } else {
          base64 = "data:image/png;base64," + new Buffer.from(body, "binary").toString("base64");
        }
        resolve(base64);
      }
    );
  });
}

module.exports = iconToBase64;
