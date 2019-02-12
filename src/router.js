const { reactRoutes } = require("./handler");
const router = (request, response) => {
  const url = request.url;
  console.log("Request:", url);

  if (url === "/api-login") {
    // apiLoginRoute(request, response);
  } else if (url === "/api-portfolios") {
    // apiPortfolioRoute(request, response);
  } else {
    reactRoutes(request, response, url);
  }
};

module.exports = router;
