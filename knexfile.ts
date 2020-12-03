// Update with your config settings.

module.exports = {

  development: {
    client: "sqlite3",
    connection: {
      filename: "./api/db/apollo.sqlite3"
    },
    useNullAsDefault: false
  },
};
