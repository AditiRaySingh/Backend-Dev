const os = require('os');
const fs = require('fs');

setInterval(function () {

    let data = "Platform: " + os.platform() + "\n";
    data += "CPU: " + os.cpus().length + "\n";
    data += "Free Memory: " + os.freemem() + "\n";

    fs.appendFile('system.txt', data, function (err) {
        if (err) {
            console.log("Errorrrrrr");
        } else {
            console.log("Saved it good good");
        }
    });

}, 5000);