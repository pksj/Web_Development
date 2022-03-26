const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/bmi.html");
});

app.post("/", function (req, res) {
  var weight = Number(req.body.weight);
  var height = Number(req.body.height);
  var bmi = weight / (height * height);
  
  res.send("Your BMI is " + String(bmi));
});

app.listen(3000, function () {
  console.log("listening on port 3000");
});
