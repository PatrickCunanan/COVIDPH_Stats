const unirest = require("unirest");
const express = require("express");
const app = express();

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

    const stats = response.body.data;
    res.render('index');
  });
});

app.listen(3000, function() {
  console.log("COVIDPh Simple Stats server is running.");
});
