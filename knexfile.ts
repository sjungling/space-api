// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/apollo.sqlite3",
    },
    useNullAsDefault: false,
  },
  production: {
    client: "sqlite3",
    connection: {
      filename: "./dist/apollo.sqlite3",
    },
    useNullAsDefault: false,
  },
};
