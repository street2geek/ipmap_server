"use strict";
const WebSocket = require("ws");
const Rx = require("rxjs/Rx");

module.exports = {
  name: "webSocket",
  register: (server, options) => {
    function connect() {
      const ws = new WebSocket("ws://45.76.131.223:8080", {
        perMessageDeflate: false
      });

      ws.on("open", () => {
        console.log("Honeypot stream open");
      });

      const wsMessage$ = new Rx.Observable(observer => {
        ws.on("message", data => {
          if (false) {
            ws.close();
          } else {
            observer.next(JSON.parse(data));
          }
        });
      });

      wsMessage$.throttleTime(200).subscribe(
        data => {
          let clientData = {
            timestamp: data.timestamp,
            service: null /* map port to protocol */,
            src: {
              ...data.src_ip_geo,
              ip: data.src_ip,
              port: data.src_p
            },
            dst: {
              ...data.dst_ip_geo,
              ip: data.dst_ip,
              port: data.dst_p
            }
          };
          console.log(clientData);
          server.publish("/", clientData);
        },
        err => console.log(err)
      );

      ws.on("close", e => {
        console.log("Socket closed. Reconnect will be attempted in 1 second.");
        setTimeout(() => {
          connect();
        }, 1000);
      });
    }

    connect();
  }
};
