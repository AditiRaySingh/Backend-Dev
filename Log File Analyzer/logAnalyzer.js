const fs = require("fs");

let file = process.argv[2];

let error = 0;
let warn = 0;
let info = 0;

let stream = fs.createReadStream(file, "utf8");

stream.on("data", function(data) {

    let lines = data.split("\n");

    for (let line of lines) {

        line = line.toUpperCase();

        if (line.includes("ERROR")) {
            error = error + 1;
        }
        else if (line.includes("WARN")) {
            warn = warn + 1;
        }
        else if (line.includes("INFO")) {
            info = info + 1;
        }

    }
});

stream.on("end", function() {
    console.log("report");
    console.log("error:", error);
    console.log("warning:", warn);
    console.log("info:", info);
});

stream.on("error", function() {
    console.log("file not found");
});