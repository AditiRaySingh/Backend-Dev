const http = require('http');

let tasks = [];

const server = http.createServer(function (req, res) {

    
    if (req.url === '/tasks' && req.method === 'GET') {
        res.write(JSON.stringify(tasks));
        res.end();
    }

    else if (req.url === '/add' && req.method === 'GET') {
        tasks.push("my new ttask");
        res.write("good task add done good");
        res.end();
    }

    
    else if (req.url === '/delete' && req.method === 'GET') {
        tasks.pop();
        res.write("i dleted the tasks");
        res.end();
    }

    else {
        res.write("invalid request sorry");
        res.end();
    }

});

server.listen(3000, function () {
    console.log("Server running on port 3000");
});