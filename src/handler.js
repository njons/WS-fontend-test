const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const request = require("request");

const reactRoutes = (req, res, url) => {
  // set index.html to home
  const requestPath = req.url == "/" ? "/index.html" : req.url;

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
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>Something went wrong 500</h1>");
    } else {
      res.writeHead(200, `Content-Type: ${mimeType[fileExt]}`);
      res.end(file);
    }
  });
};

const apiLoginRoute = (req, res) => {
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
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("<h1>Something went wrong 500</h1>");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(JSON.stringify(body));
        }
      }
    );
  });
};

const apiPortfolioRoute = (req, res) => {
  console.log("this is the url:", req.url);
  const apiUrl = "https://beta.stockzoom.com/api/v1/me/portfolios/";

  let data = "";
  req.on("data", chunk => {
    data += chunk;
  });
  req.on("end", () => {
    const token = req.headers.authorization.split(" ")[1];
    request.get(
      {
        url: apiUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      },
      (err, httpResponse, body) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("<h1>Something went wrong 500</h1>");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(body);
        }
      }
    );
  });
};

module.exports = { reactRoutes, apiLoginRoute, apiPortfolioRoute };
