import React, { Component } from "react";
import { Col, Form, Row } from "react-bootstrap";
// import { Accordion, Col, Container, Row } from 'react-bootstrap';
import { v4 as uuid } from "uuid";
// import api from "../../models/API";
import { Marketcard } from "./marketcard";

export class MarketWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      newsymbol: "",
    };
  }

  future_coin_socket = () => {
    var feed = [];
    // var coinTicker = 'BTCUSD_PERP';
    var coinTickers = [];
    var DSTREAM_URL = "wss://dstream.binance.com/";
    this.wsd = new WebSocket(DSTREAM_URL + "ws/");

    for (let m = 0; m < this.state.data.length; m++) {
      if (
        !coinTickers.includes(
          this.state.data[m]["symbol"].toLowerCase() + "@bookTicker"
        )
      ) {
        coinTickers.push(
          this.state.data[m]["symbol"].toLowerCase() + "@bookTicker"
        );
      }
    }

    let bookTickermsg = {
      method: "SUBSCRIBE",
      params: coinTickers,
      id: 1,
    };

    this.wsd.onopen = () => {
      this.wsd.send(JSON.stringify(bookTickermsg));
    };

    this.wsd.onmessage = (msg) => {
      let marketfeed = JSON.parse(msg.data);
      feed = this.state.data;

      if (marketfeed["e"] === "bookTicker") {
        for (let i = 0; i < feed.length; i++) {
          if (feed[i]["symbol"] === marketfeed["s"]) {
            feed[i]["bid"] = marketfeed["b"];
            feed[i]["ask"] = marketfeed["a"];
            feed[i]["bidqty"] = marketfeed["B"];
            feed[i]["askqty"] = marketfeed["A"];
            feed[i]["timestamp"] = marketfeed["u"];
            this.setState({
              data: feed,
            });
          }
        }
      }
    };
    if (this.wsd.readyState === 1) {
      this.wsd.send(JSON.stringify(bookTickermsg));
    }
    this.wsd.onclose = function (msg) {
      console.log("future_coin_socket(coinTicker) connection closed");
    };
  };

  stopFeed = () => {
    if (this.wsd.readyState === 1) this.wsd.close();
  };

  // getdata = async () => {
  //     const response = await api.post('client/tempFetch', { data: 'COIN' });
  // }

  AddNewCard = (e) => {
    console.log(this.state.newsymbol);
    let temp = this.state.data;
    temp.push({
      id: uuid(),
      symbol: this.state.newsymbol.toUpperCase(),
      bid: 0,
      ask: 0,
      bidqty: 0,
      askqty: 0,
      tqty: parseInt(Math.random() * 10),
      timestamp: "350014002067",
    });
    e.preventDefault();
    this.setState({
      data: temp,
      newsymbol:''
    });
  };

  RemoveCard = (id) => {
    this.setState({
      data: this.state.data.filter((item) => {
        return item.id !== id;
      }),
    });
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs lg="4">
            <div>
              <Marketcard data={this.state.data} RemoveCard={this.RemoveCard} />
            </div>
          </Col>
          <Col xs lg="8">
            <Form className="form-inline" onSubmit={this.AddNewCard}>
              <div class="form-group mb-2">
                <label for="staticEmail2" class="sr-only">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.newsymbol}
                  name="symbolname"
                  id="symbolname"
                  required
                  onChange={(e) => this.setState({ newsymbol: e.target.value })}
                />
              </div>
              <div class="form-group mb-2">
              <input
                type="submit"
                className="btn btn-primary"
                name="ADD"
                value="ADD"
              />
              </div>
                </Form>
              <div class="form-group mb-2">
              <button
                className="btn btn-primary"
                onClick={this.future_coin_socket}
              >
                Start Feed
              </button>
              </div>
              <div class="form-group mb-2">
              <button className="btn btn-danger" onClick={this.stopFeed}>
                Stop Feed
              </button>
              </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default MarketWatch;
