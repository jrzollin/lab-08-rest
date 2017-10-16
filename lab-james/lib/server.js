'use strict';

const http = require('http');
const router = require('./router.js');
const note = require('../route/note.js');

let isRunning = false;

const app = http.createServer(router.route);

module.exports = {
  start: () => {
    return new Promise((resolve, reject) => {
      if(!isRunning){

        app.listen(3000, (err) => {
          if(err){
            reject(err);
          } else {
            isRunning = true;
            resolve(console.log('Server up'));
          }
        });

      } else {

        reject(console.log('Server is already running'));

      }
    });
  },
  stop: () => {
    return new Promise( (resolve, reject) => {
      if(!isRunning){
        reject(console.log('Server is not up'));
      } else {
        app.close(err => {
          if(err){
            reject(err);
          } else {
            isRunning = false;
            resolve(console.log('Server off'));
          }
        });
      }
    });
  },
};
