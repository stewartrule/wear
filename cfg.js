const path = require("path");

const pg = {
  client: "pg",
  connection: process.env.DB_CONNECTION,
  pool: { min: 0, max: 3 }
};

module.exports = {
  ...pg,
  migrations: {
    directory: path.resolve(__dirname, "migrations")
  },
  seeds: {
    directory: path.resolve(__dirname, "seeds")
  }
};
