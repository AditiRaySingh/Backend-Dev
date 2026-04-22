
const fs = require("fs");


const command = process.argv[2];
const file1 = process.argv[3];
const file2 = process.argv[4];
const data = process.argv[4];


if (command === "read") {
    fs.readFile(file1, "utf8", (err, res) => {
        if (err) {
            console.log("errro reading in file my file check it");
        } else {
            console.log(res);
        }
    });
}

else if (command === "write") {
    fs.writeFile(file1, data, (err) => {
        if (err) {
            console.log("eror in writting file ");
        } else {
            console.log("written fille goodddddddd");
        }
    });
}


else if (command === "copy") {
    fs.copyFile(file1, file2, (err) => {
        if (err) {
            console.log("error in copying file");
        } else {
            console.log("good copied file ...");
        }
    });
}


else if (command === "delete") {
    fs.unlink(file1, (err) => {
        if (err) {
            console.log("error in deleting file");
        } else {
            console.log("file deleteddddddddd");
        }
    });
}


else if (command === "list") {
    fs.readdir("./", (err, files) => {
        if (err) {
            console.log("error in reading file");
        } else {
            console.log("Files:");
            files.forEach(f => console.log(f));
        }
    });
}


else {
    console.log("Invalid command");
}