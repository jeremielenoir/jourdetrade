import * as restify from 'restify';
import Orders from './ressources/orders/orders.js';

let server = restify.createServer();

let order = new Orders(server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});