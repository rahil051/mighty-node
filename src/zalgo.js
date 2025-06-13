"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var node_cache_1 = require("@cacheable/node-cache");
var cache = new Map();
var _cache = new node_cache_1.NodeCache();
function inconsistentRead(filename, cb) {
    if (_cache.has(filename)) {
        // invoked synchronously
        cb({
            data: _cache.get(filename),
            from: 'cache'
        });
    }
    else {
        // asynchronous function
        (0, fs_1.readFile)(filename, 'utf8', function (err, data) {
            if (err) {
                cb(err);
            }
            console.log(filename);
            _cache.set(filename, data);
            cb({
                data: data,
                from: 'disk'
            });
        });
    }
}
inconsistentRead('./src/data.txt', function (data) {
    console.log(data);
    inconsistentRead('./src/data.txt', function (data) {
        console.log(data);
    });
});
