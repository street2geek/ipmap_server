"use strict";
const { MongoClient } = require("mongodb");

module.exports = {
  name: "db",
  register: async (server, options) => {
    const db = await MongoClient.connect("mongodb://localhost:27017/honeypot");
  }
};
