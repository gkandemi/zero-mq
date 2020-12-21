const zeromq = require("zeromq");

// Soket Türü...
const socket = new zeromq.Push();

runProducer();
async function runProducer() {
  await socket.bind("tcp://127.0.0.1:9000");
  console.log("Producer veri gönderme işlemi için hazır...");

  process.stdin.once("data", async () => {
    for (let i = 0; i <= 10000; i++) {
      await socket.send(
        "Bu bilgi producer tarafindan gonderilmiştir job (#" + i + ")"
      );

      // 200 ms bekleme..
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  });
}
