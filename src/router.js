const { reactRoutes, apiLoginRoute } = require("./handler");
const router = (req, response) => {
  const url = req.url;
  console.log("Request:", url);

  if (url === "/api-login") {
    console.log("youre in API-login");
    apiLoginRoute(req, response);
  } else if (url === "/api-portfolios") {
    // apiPortfolioRoute(request, response);
  } else {
    reactRoutes(req, response, url);
  }
};

module.exports = router;
