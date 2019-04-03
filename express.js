const express = require("express");
const app = express();
const port = 3000;

const controllers = require("./controllers");

app.use(express.static("public"));

app.get("/clothing", async (request, response) => {
  const result = await controllers.clothing();
  response.json(result);
});
app.get("/footwear", async (request, response) => {
  const result = await controllers.footwear();
  response.json(result);
});
app.get("/settings", async (request, response) => {
  const result = await controllers.settings();
  response.json(result);
});
app.get("/account", async (request, response) => {
  const result = await controllers.account();
  response.json(result);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
