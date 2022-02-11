import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash ,faTimes} from "@fortawesome/free-solid-svg-icons";
export class Marketcard extends Component {
    componentWillUnmount(){
        console.log("componentWillUnmount child*******");
    }

    render() {
        return (
            <React.Fragment>
                {this.props.data.map((data, index) => (
                    <div key={data.id} className="card p-1 m-1 binsymcard" tabIndex="0">
                        <div className="p-1 d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                                <h5 className="symbol mb-0 mt-0">
                                    <FontAwesomeIcon
                                        className="icons"
                                        icon={faTimes}
                                        onClick={() => this.props.RemoveCard(data.id)}
                                    />{" "}
                                    {data.symbol.toUpperCase()}
                                </h5>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                                <span className="normal">
                                    {new Date(data.timestamp).toLocaleString()}
                                </span>
                                <span className="username">PERP</span>
                            </div>
                        </div>
                        <div className="p-1 bg-primary d-flex justify-content-between align-items-center rounded text-white stats">
                            <div className="d-flex flex-column">
                                <span className="bid">B.Qty</span>
                                <span className="number1">{data.bidqty}</span>
                            </div>
                            <div className="d-flex flex-column">
                                <span className="bid">BID</span>
                                <span className="number1">{data.bid}</span>
                            </div>
                            <div className="d-flex flex-column">
                                <span className="ask">ASK</span>
                                <span className="number1">{data.ask}</span>
                            </div>
                            <div className="d-flex flex-column">
                                <span className="ask">A.Qty</span>
                                <span className="number1">{data.askqty}</span>
                            </div>
                            <div className="d-flex flex-column">
                                <span className="tqty">T.Qty</span>
                                <input className="custominput number1" type="number" value={data.tqty} />
                            </div>
                            <div className="d-flex flex-column">
                                <span className="normalbuybtn">
                                    <FontAwesomeIcon icon={faPlus} /> BUY
                                </span>
                                <span className="normalsellbtn">
                                    <FontAwesomeIcon icon={faMinus} /> SELL
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </React.Fragment>
        );
    }
}
