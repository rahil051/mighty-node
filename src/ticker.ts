import { EventEmitter } from "node:events";

/**
 * @description A function that emits a tick event every 50ms and stops after the given timer of ticks is reached.
 * @param {Number} timer
 * @param {CallableFunction} cb
 * @returns {EventEmitter}
 */
const ticker = (timer, cb) => {
  const INTERVAL = 50;
  const tick = new EventEmitter();

  let ticks = 0;
  const startTime = Date.now();

  const emitTick = () => {
    ticks += 1;
    tick.emit("tick", Date.now() - startTime);
  };

  const tickTock = () => {
    if (Date.now() - startTime >= timer) {
      return cb(null, ticks);
    }

    setTimeout(() => {
      emitTick();
      return tickTock();
    }, INTERVAL);
  };

  tickTock();
  return tick;
};

//* Example usage: node index.js 500 (to fire 500 tick events) */
(() => {
  const input = parseInt(process.argv[2]);

  if (isNaN(input)) {
    console.log("Please provide a number as an argument");
    return;
  }

  const tick = ticker(input, (_, data) => {
    console.log(`Exactly ${data} tick events fired`);
  });

  tick
    .on("tick", (time) => console.log(`Tick after ${time}ms`))
    .on("error", console.error);
})();