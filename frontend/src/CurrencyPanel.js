import React from 'react';
import io from "socket.io-client";

  class CurrencyPanel extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        response: false,
        endpoint: "http://localhost:8080"
      };
      

    }

    componentDidMount() {
        const { endpoint } = this.state;
        const socket = io(endpoint);
        console.log(socket);
        socket.on('ticker', data => {
            console.log('data', data);
            this.setState({ response: data });
        });
    }

    render() {
        const { response } = this.state;
        return (
            <div style={{ textAlign: "center" }}>
              {response
                  ? <p>
                    The temperature in Florence is: {response.product_id} : {response.price}
                  </p>
                  : <p>Loading...</p>}
            </div>
        );
    }
  }

  export default CurrencyPanel;