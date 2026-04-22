const fs = require("fs");

let folder1 = process.argv[2];
let folder2 = process.argv[3];


fs.readdir(folder1, function(err, files1) {

    if (err) {
        console.log("error in folder1");
        return;
    }

  
    fs.readdir(folder2, function(err, files2) {

        if (err) {
            console.log("error in folder2");
            return;
        }

        files1.forEach(function(file) {

            if (files2.indexOf(file) === -1) {

                fs.copyFile(folder1 + "/" + file, folder2 + "/" + file, function(err) {
                    if (err) {
                        console.log("copy error");
                    } else {
                        console.log(file + " copied to folder2");
                    }
                });

            }

        });

    });

});