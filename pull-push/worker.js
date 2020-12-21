const zeromq = require("zeromq");

// Soket Türü
const socket = new zeromq.Pull();

runWorker();

async function runWorker() {
  await socket.connect("tcp://127.0.0.1:9000");
  console.log("Producer'a bağlanıldı...");

  for await (const message of socket) {
    console.log(`Gelen Mesaj ${message}`);
  }
}
