"use strict";
global.__basedir = __dirname;
const Hapi = require("hapi");
const Nes = require("nes");

const server = Hapi.server({
  host: "45.77.90.193",
  port: 80
});

const init = async () => {
  await server.register([
    Nes,
    //require("./plugins/db"),
    require("./plugins/ws")
  ]);

  server.subscription("/");

  await server.start();
  return server;
};

init()
  .then(server => {
    console.log("Server running at:", server.info.uri);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
