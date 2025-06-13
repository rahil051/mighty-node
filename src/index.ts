import { TextSearch, EVENT } from './event_emitter';

let count = 5;

function callbackTermination(range: number, cb: Function) {
  for (let i = 0; i < range; i++) {
    if (i == 2) {
      setTimeout(() => {
        cb("callback executed at index 2 " + range);
      }, 0);
    }

    console.log("main function executed at " + i);
  }
}

callbackTermination(5, (msg: string) => {
  console.log(msg);
})

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