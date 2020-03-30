const unirest = require("unirest");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  req = unirest(
    "GET",
    "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats"
  );

  req.query({
    country: "Philippines"
  });

  req.headers({
    "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
    "x-rapidapi-key": "4abdada55emsh1abb2a297e1cf04p1afdf4jsn0fa111ea8092"
  });

  req.end(function(response) {
    if (response.error) throw new Error(response.error);

    var statsstring = JSON.stringify(response.body.data.covid19Stats);
    var stats = JSON.parse(statsstring);
    var confirmed = stats[0].confirmed;
    var deaths = stats[0].deaths;
    var recovered = stats[0].recovered;
    var lastUpdate = stats[0].lastUpdate;
    console.log(stats, confirmed, deaths, recovered, lastUpdate);
    res.render("index", {
      confirmed: confirmed,
      deaths: deaths,
      recovered: recovered,
      lastUpdate: lastUpdate
    });
  });
});

app.listen(port, function() {
  console.log("COVIDPh Simple Stats server is running.");
});
