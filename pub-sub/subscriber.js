const zeromq = require("zeromq");

// Soket türü
const socket = new zeromq.Subscriber();
const channelName = process.argv[2] || "kablosuzkedi";

runSubscriber();

async function runSubscriber() {
  await socket.connect("tcp://127.0.0.1:9000");
  console.log("## Subscriber bağlandı..");
  await socket.subscribe(channelName);
  console.log(`## Subscriber ${channelName} kanalına abone oldu`);

  for await (const [topic, message] of socket) {
    console.log(`TOPIC => ${topic}, MESSAGE => ${message}`);
  }
}
