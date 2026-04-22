console.log("Start");

setTimeout(function () {
    console.log("timeouttt");
}, 0);

setImmediate(function () {
    console.log("immedaitet");
});

process.nextTick(function () {
    console.log("next");
});

Promise.resolve().then(function () {
    console.log("promise...");
});

console.log("End");