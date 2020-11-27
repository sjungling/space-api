// Update with your config settings.

import { join } from "path";

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: join(__dirname, "src", "apollo.sqlite3"),
    },
    useNullAsDefault: false,
  },
  production: {
    client: "sqlite3",
    connection: {
      filename: join(__dirname, "dist", "apollo.sqlite3"),
    },
    useNullAsDefault: false,
  },
};
