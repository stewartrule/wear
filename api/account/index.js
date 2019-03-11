const controllers = require("../../controllers");

module.exports = async (request, response) => {
  const result = await controllers.account();
  response.writeHeader(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(result));
};
