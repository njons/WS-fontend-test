const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const request = require("request");
const jwt = require("jsonwebtoken");
const key = "apple";
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
          const apiToken = body.token;
          const encryptToken = jwt.sign({ token: apiToken }, key);
          console.log("this is the token from the api:", apiToken);
          console.log("this is the encrypted token:", encryptToken);
          console.log(
            "the apiToken and encryptedToken are the same:",
            encryptToken === body.token
          );
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(JSON.stringify(encryptToken));
        }
      }
    );
  });
};

const apiPortfolioRoute = (req, res) => {
  const apiUrl = "https://beta.stockzoom.com/api/v1/me/portfolios/";

  let data = "";
  req.on("data", chunk => {
    data += chunk;
  });
  req.on("end", () => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, key);
    const verifiedToken = decodedToken.token;
    request.get(
      {
        url: apiUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${verifiedToken}`
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
