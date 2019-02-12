const { reactRoutes, apiLoginRoute, apiPortfolioRoute } = require("./handler");
const router = (req, res) => {
  const url = req.url;
  console.log("Request:", url);

  if (url === "/api-login") {
    apiLoginRoute(req, res);
  } else if (url === "/api-portfolios") {
    console.log("youre in API-portfolio");
    apiPortfolioRoute(req, res);
  } else {
    reactRoutes(req, res, url);
  }
};

module.exports = router;
