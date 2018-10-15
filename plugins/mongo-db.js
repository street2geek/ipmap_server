"use strict";
const { MongoClient } = require("mongodb");

module.exports = {
  name: "db",
  register: async (server, options) => {
    const db = await MongoClient.connect("mongodb://localhost:27017/honeypot");
    //server.method("mongo.conn", () => db);
    server.method("mongo.insertOne", data => {
      db.collection("honeypot").insertOne(data => {
        db.close();
      });
    });
  }
};
