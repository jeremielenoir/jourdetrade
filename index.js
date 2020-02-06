import * as restify from 'restify';
import Orders from './ressources/orders/orders.js';
import * as CoinbasePro from 'coinbase-pro';

const publicClient = new CoinbasePro.PublicClient();

const websocket = new CoinbasePro.WebsocketClient(
    ['ZRX-EUR', 'ETC-EUR', 'BTC-EUR'],
    'wss://ws-feed.pro.coinbase.com',
    {
      key: '3b96ccbdfe1ed7c2acff9eedfba8b452',
      secret: 'CabrneiHuoAjRtnQrNjI7p1cB64uxMQDB3qIdsrWjvIgQd9hwzU4VZF248oH8xLwlL4wm9q/vwdoWXSSkTTGbA==',
      passphrase: '7b0wu35mqbx',
    },
    {channels : ['ticker']}
  );
  console.log('websocket', websocket.channels);


websocket.on('message', data => {
  /* work with data */
  if(data.type == 'ticker'){
    console.log('TICKER', data);
  }
  
});
websocket.on('error', err => {
  /* handle error */
});
websocket.on('open', () => {
  /* ... */
  //websocket.unsubscribe({ channels: [ 'full', 'heartbeat' ] });
  console.log('websocket', websocket.channels);
  //websocket.subscribe({ product_ids: ['ZRX-EUR'], channels: ['ticker', 'user'] });
});

publicClient.getProductTicker('ZRX-EUR').then(data => {
    // work with data
    //console.log(data);
  })
  .catch(error => {
    // handle the error
  });
let server = restify.createServer();

let order = new Orders(server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});