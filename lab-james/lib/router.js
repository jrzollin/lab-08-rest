'use strict';

const parser = require('./parse-request.js');
const routeHandlers = {};

const router = module.exports = {
  route: (req, res) => {
    parser(req)
              .then( (req) => {
                let handler = routeHandlers[req.method][req.url.pathname];
                if(handler){
                  handler(req, res);
                } else {
                  res.writeHead(404);
                  res.end();
                }
              })
              .catch( (err) => {
                res.writeHead(400);
                res.end();
              });
  },
};

let methods = ['get', 'put', 'post', 'patch', 'delete'];

methods.forEach(method => {
  routeHandlers[method.toUpperCase()] = {};
  router[method] = function(pathname, callback){
    routeHandlers[method.toUpperCase()][pathname] = callback;
  };
});

//
// router.fourOhFour = function(req, res){
//   res.writeHead(404, {'Content-Type': 'text/plain'});
//   res.write('Page not found.');
//   res.end();
// };
