const unirest = require("unirest");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  req = unirest("GET", "https://covid-193.p.rapidapi.com/statistics");

  req.query({
    country: "Philippines"
  });

  req.headers({
    "x-rapidapi-host": "covid-193.p.rapidapi.com",
    "x-rapidapi-key": "4abdada55emsh1abb2a297e1cf04p1afdf4jsn0fa111ea8092"
  });

  req.end(function(response) {
    if (response.error) throw new Error(response.error);
    console.log(response.body);
    var casesString = JSON.stringify(response.body.response[0].cases);
    var deathsString = JSON.stringify(response.body.response[0].deaths);
    var casesJSON = JSON.parse(casesString);
    var deathsJSON = JSON.parse(deathsString);
    var activeCases = casesJSON.active;
    var recoveredCases = casesJSON.recovered;
    var totalCases = casesJSON.total;
    var deaths = deathsJSON.total;
    var newCases = casesJSON.new;
    var newDeaths = deathsJSON.new;
    var day = response.body.response[0].day;
    var lastUpdate = response.body.response[0].time;

    res.render("index", {
      activeCases,
      recoveredCases,
      totalCases,
      deaths,
      newCases,
      newDeaths,
      day,
      lastUpdate
    });
  });
});

app.listen(port, function() {
  console.log("COVIDPh Simple Stats server is running.");
});
