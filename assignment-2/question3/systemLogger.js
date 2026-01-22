const os = require("os");
const fs = require("fs");

// Function to get system info
function logSystemInfo() {
  const cpuInfo = os.cpus()[0].model;
  const totalMemory = (os.totalmem() / 1024 / 1024).toFixed(2); // MB
  const freeMemory = (os.freemem() / 1024 / 1024).toFixed(2);   // MB
  const platform = os.platform();
  const time = new Date().toLocaleString();

  const logData = `
Time: ${time}
CPU: ${cpuInfo}
Platform: ${platform}
Total Memory: ${totalMemory} MB
Free Memory: ${freeMemory} MB
-------------------------
`;

  fs.appendFile("systemInfo.log", logData, (err) => {
    if (err) {
      console.error("Error writing file");
    }
  });
}

// Run every 5 seconds
setInterval(logSystemInfo, 5000);
