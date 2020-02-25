import * as restify from 'restify';
import Orders from './ressources/orders/orders.js';
import * as CoinbasePro from 'coinbase-pro';
import socketIo from 'socket.io';

const publicClient = new CoinbasePro.PublicClient();

const websocket = new CoinbasePro.WebsocketClient(
    ['ZRX-EUR', 'ETC-EUR', 'BTC-EUR'],
    'wss://ws-feed.pro.coinbase.com',
    {
      key: 'e76e42727b295fe98b2e460fa0f5cb99',
      secret: '1OmBIS95rsKghPVcOPl2a45UHeACiGI2iZH/7FE71U2+afskF5iy7h7VYGpxXSdL5+AHZXYgAZMeesb9egS6sA==',
      passphrase: 'marijuana',
    },
    {channels : ['ticker']}
  );
  console.log('websocket', websocket.channels);


websocket.on('message', data => {
  /* work with data */
  if(data.type == 'ticker'){
    //console.log('TICKER', data);
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

var app = server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

const io = socketIo(app);

io.on("connection", socket => {
  console.log("New client connected");

  websocket.on('message', data => {
    /* work with data */
    if(data.type == 'ticker'){
      console.log('TICKER', data);
      io.emit("ticker", data); 
    }
    
  });
  
  socket.on("disconnect", () => {});
});
