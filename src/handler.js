const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const request = require("request");

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

const apiLoginRoute = (req, response, url) => {
  console.log("this is the url:", req.url);
  const apiUrl = "https://beta.stockzoom.com/api-token-auth/";

  let data = "";
  req.on("data", chunk => {
    data += chunk;
  });
  req.on("end", () => {
    const parsedData = JSON.parse(data);
    const email = parsedData.email;
    const password = parsedData.password;
    request.post(
      { url: apiUrl, json: { email, password } },
      (err, httpResponse, body) => {
        if (err) {
          response.writeHead(500, { "Content-Type": "text/html" });
          response.end("<h1>Something went wrong 500</h1>");
        } else {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.end(JSON.stringify(body));
        }
      }
    );
  });

  // request(apiUrl, (error, response, body) => {
  //   // console.log('Error: ', error);
  //   const parsedData = JSON.parse(body);
  //   // console.log("this is the parsed data:", parsedData);
  //   // if (url.indexOf("guardian") !== -1) {
  //   //   article = {
  //   //     Guardian: {
  //   //       article: parsedData.response.results[1].fields.bodyText
  //   //     }
  //   //   };
  //   //   responseArr.push(article);
  // });
};

module.exports = { reactRoutes, apiLoginRoute };
