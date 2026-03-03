"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function racable() {
    return Promise.race([
        new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve("First promise resolved");
            }, 0);
        }),
        new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new Error("Second promise resolved"));
            }, 500);
        })
    ]);
}
racable().then(console.log).catch(console.error);
function verify(value) {
    if (value > 0) {
        return Promise.resolve(value);
    }
    return Promise.reject(new Error("Value must be greater than 0"));
}
verify(parseInt(process.argv[2], 10))
    .then(function (value) {
    return value;
}, function (error) {
    console.error("Error: ".concat(error.message));
    return 0; // Return a default value on error
}).then(function (value) {
    console.log("Value: ".concat(value));
}).catch(function (error) {
    console.error("Caught error: ".concat(error.message));
}).finally(function () {
    console.log("Execution completed");
});
// function execTimeout() {
//   const timer = 500;
//   if (count == 0) {
//     console.log("execution completed");
//     return;
//   }
//   setTimeout(() => {
//     console.log("setTimeout executed");
//     count--;
//     execTimeout();
//   }, timer);
// }
// execTimeout()
// const keyword = new RegExp(process.argv[2]);
// const textSearch = new TextSearch(keyword);
// textSearch
//   .addFile('./assets/documents/a.txt')
//   .addFile('./assets/documents/b.txt')
//   .search()
//   .on(EVENT.FILE_READ, file => console.log(`Reading ${file}`))
//   .on(EVENT.FOUND, (file, match) => {
//     if (match) {
//       console.log(`Match found in ${file}: ${match}`);
//     } else {
//       console.log(`No match found in ${file}`);
//     }
//   })
//   .on(EVENT.FOUND, (file, match) => {
//     if (match) {
//       console.log(`Match2 found in ${file}: ${match}`);
//     } else {
//       console.log(`No match2 found in ${file}`);
//     }
//   })
//   .on(EVENT.ERROR, err => console.error(err));
