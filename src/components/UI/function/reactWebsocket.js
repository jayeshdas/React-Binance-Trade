import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const WebSocketDemo = () => {
    //Public API that will echo messages sent to it back to the client
    const [socketUrl, setSocketUrl] = useState('wss://dstream.binance.com/ws/');
    const [messageHistory, setMessageHistory] = useState([]);

    const {
        sendMessage,
        lastMessage,
        readyState,
    } = useWebSocket(socketUrl);

    useEffect(() => {
        if (lastMessage !== null) {
            // setMessageHistory([])
            setMessageHistory(prev => prev.concat(lastMessage.data));
            // console.log(messageHistory);
        }
    }, [lastMessage, setMessageHistory]);

    const handleClickSendMessage = useCallback(() =>
        sendMessage(JSON.stringify({
            "method": "SUBSCRIBE",
            "params":
            [
            "btcusd_perp@bookTicker","ethusd_perp@bookTicker"
            ],
            "id": 1
            })),[]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <div>

            <button onClick={handleClickSendMessage} disabled={readyState !== ReadyState.OPEN}>
                send
            </button>
            <span>The WebSocket is currently {connectionStatus}</span>
            {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
            <ul>
                {messageHistory.map((message, idx) => <span key={idx}>{message.data ? message.data : null}</span>)}
            </ul>
        </div>
    );
};