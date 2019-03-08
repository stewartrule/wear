const express = require("express");
const app = express();

app.get("*", (req, res) => {
  res.write("<h1>About</h1>");
  res.write('<h2>Go to <a href="/">/</a></h2>');
  res.end();
});

module.exports = app;
