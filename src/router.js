const { reactRoutes, apiLoginRoute, apiRequestRoute } = require("./handler");
const router = (req, res) => {
  const url = req.url;
  console.log("Request:", url);

  if (url === "/api-login") {
    apiLoginRoute(req, res);
  } else if (url === "/api-portfolios") {
    const apiUrl = "https://beta.stockzoom.com/api/v1/me/portfolios/";
    apiRequestRoute(req, res, apiUrl);
  } else if (url.indexOf("/api-portfolio-details/") === 0) {
    const portfolioId = url.split("/")[2];
    const apiUrl = `https://beta.stockzoom.com/api/v1/me/portfolios/${portfolioId}/`;
    apiRequestRoute(req, res, apiUrl);
  } else if (url.includes("/api-instrument-details/")) {
    const instumentId = url.split("/")[2];
    const apiUrl = `https://beta.stockzoom.com/api/v1/instruments/${instumentId}/`;
    const portfolioId = url.split("/")[2];
    apiRequestRoute(req, res, apiUrl);
  } else {
    reactRoutes(req, res, url);
  }
};

module.exports = router;
