const fs = require("fs");
const https = require("https");
const app = require("./index");

const options = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
};

https.createServer(options, app).listen(5000, () => {
  console.log("HTTPS Server running");
});
