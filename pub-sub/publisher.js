const zeromq = require("zeromq");

// Soket türü
const socket = new zeromq.Publisher();

runPublisher();

async function runPublisher() {
  await socket.bind("tcp://127.0.0.1:9000");
  console.log("## Publisher bağlandı..");
  console.log("## Mesaj Formatı : 'kanalAdı:Mesaj'");
  process.stdin.on("data", (data) => {
    const userMessage = data.toString().replace("\n", "");
    if (userMessage === "q") {
      process.exit(0);
    }

    if (userMessage.includes(":") && userMessage.split(":").length === 2) {
      const channel_message = userMessage.split(":");
      socket.send([channel_message[0], channel_message[1]]);
    } else {
      console.log("Yanlış Format!\nMesaj Formatı : 'kanalAdı:Mesaj'");
    }
  });
}
