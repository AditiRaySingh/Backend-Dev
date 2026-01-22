const os = require("os");
const fs = require("fs");

setInterval(() => {
  const info =
    "Platform: " + os.platform() + "\n" +
    "Total Memory: " + os.totalmem() + "\n" +
    "CPU Cores: " + os.cpus().length + "\n" +
    "---------------------\n";

  fs.appendFile("systemInfo.log", info, () => {
    console.log("System info logged");
  });
}, 5000);
