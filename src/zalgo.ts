import { readFile } from 'fs';
import { NodeCache } from '@cacheable/node-cache';

const _cache = new NodeCache()

function inconsistentRead(filename, cb) {
  if (_cache.has(filename)) {
    // invoked synchronously
    cb({
      data: _cache.get(filename),
      from: 'cache'
    })
  } else {
    // asynchronous function
    readFile(filename, 'utf8', (err, data) => {
      if (err) {
        cb(err)
      }
      console.log(filename)
      _cache.set(filename, data)
      cb({
        data,
        from: 'disk'
      })
    })
  }
}

inconsistentRead('./src/data.txt', (data) => {
  console.log(data)
})