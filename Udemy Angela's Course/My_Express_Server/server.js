const express = require("express");

const app = express();

app.get("/", function (req, res) {
  res.send("<h1>Hello</h1>");
});

app.get("/about", function (req, res) {
  res.send("<h1> i am software engineer</h1></h1>");
});

app.get("/contact", function (req, res) {
  res.send("<h1>reach out at pawankumar@gmail.com</h1>");
});

app.get("/hobbies", function (req, res) {
  res.send("<ul> <li>coding</li> <li>coding</li> <li>and coding</li></ul>");
});

app.listen(3000, function () {
  console.log("listening at port 3000");
});
