const ORDERS_URI = '/orders/';
const ORDER_URI = '/orders/:id';

export default class Orders{
    constructor(server){
        this.server = server;
        server.head(ORDERS_URI, this.getOrders);
        server.get(ORDERS_URI, this.getOrders);
        server.get(ORDER_URI, this.getOrders);
    }

    getOrders(req, res, next){
        res.send({ response: "I am alive" }).status(200);
        next();
    }

}