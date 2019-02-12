const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

const reactRoutes = (request, response, url) => {
  // set index.html to home
  const requestPath = request.url == "/" ? "/index.html" : request.url;

  const fileExt = url.split(".")[1];
  const mimeType = {
    ".html": "text/html",
    ".css": "text/css",
    ".ico": "image/x-icon",
    ".js": "application/javascript",
    ".json": "application/json",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".png": "image/png",
    ".svg": "image/svg+xml"
  };

  fs.readFile(path.join(__dirname, "../dist", requestPath), (error, file) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>Something went wrong 500</h1>");
    } else {
      response.writeHead(200, `Content-Type: ${mimeType[fileExt]}`);
      response.end(file);
    }
  });
};

module.exports = { reactRoutes };
