module.exports = (req, res) => {
  res.writeHeader(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({}));
};
