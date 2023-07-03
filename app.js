const fs = require("fs");
const countries = JSON.parse(fs.readFileSync("countries.json", "utf-8"));

const app = (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const searchedCountry = url.searchParams.get("searchedCountry");

  switch (url.pathname) {
    case "/searchForCountry":
      if (!searchedCountry) {
        res.end("Bad request");
      } else {
        const similarCountries = countries.filter((country) =>
          country.toLowerCase().includes(searchedCountry.toLowerCase())
        );

        res.end(JSON.stringify(similarCountries));
      }
      break;
    default:
      res.end("No url founded.");
  }
};

module.exports = app;
