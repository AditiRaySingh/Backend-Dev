const fs = require('fs');

function logger(req, res, next) {
    const start = Date.now();

    res.on('finish', () => {
        const time = Date.now() - start;

        const log = `${new Date().toISOString()} | ${req.method} ${req.url} | ${res.statusCode} | ${time}ms\n`;

        fs.appendFileSync('log.txt', log);
    });

    next();
}

module.exports = logger;