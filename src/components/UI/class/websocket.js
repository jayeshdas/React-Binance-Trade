
var DSTREAM_URL = 'wss://dstream.binance.com/'
var wsd = new WebSocket(DSTREAM_URL + 'ws/')
var FSTREAM_URL = 'wss://fstream.binance.com/'
var wsf = new WebSocket(FSTREAM_URL + 'ws/')       
coinTickers = []
coinTickersMark = []
futTickers = []
futTickersMark = []
cointype='coin'
futtype='future'       
spottype='spot'       



var SSTREAM_URL = 'wss://stream.binance.com:9443/'
    
var tick_spot = [];
var tick_spotMark = [];
var ticke_position = []; 
var SpotStream = 'gasbtc@bookTicker'
var SpotMarkStream =  'gasbtc@ticker'
var wssMark = new WebSocket(SSTREAM_URL + 'stream?streams='+SpotMarkStream );
var wss = new WebSocket(SSTREAM_URL + 'stream?streams='+SpotStream);



        function future_coin_socket(coinTicker,cointype) {
        
            if(!coinTickers.includes(coinTicker.toLowerCase() + '@bookTicker'))
            {
                coinTickers.push(coinTicker.toLowerCase()+ '@bookTicker')
            }    
    
            if(!coinTickersMark.includes(coinTicker.toLowerCase()+'@markPrice'))
            {
                coinTickersMark.push(coinTicker.toLowerCase()+'@markPrice')
            }
        
            let bookTickermsg = {
                "method": "SUBSCRIBE",
                "params": coinTickers,
                "id": 1
            }
    
            let markMsg = {
                "method": "SUBSCRIBE",
                "params": coinTickersMark,
                "id": 2
            }
    
            wsd.onopen = function() {
                wsd.send(JSON.stringify(bookTickermsg))
                wsd.send(JSON.stringify(markMsg))
                // console.log('COIN SOCKET OPENED');
            }
            wsd.onmessage = function(msg) {
                data = JSON.parse(msg.data);
                // console.log("og",data)
                if(data['e']=="bookTicker")
                {
                    symbolCard(data,cointype,'binance',0,0)
          
                }
                if(data['e']=="markPriceUpdate")
                {     
                    
             
                }
            }
            if (wsd.readyState === 1) {
                wsd.send(JSON.stringify(bookTickermsg))
                wsd.send(JSON.stringify(markMsg))
            }
            wsd.onclose = function(msg){ 
                setTimeout(() => {
                    wsd = null
                    wsd = new WebSocket(DSTREAM_URL + 'ws/')
                    future_coin_socket(coinTicker,cointype) 
                }, 1000);
      
                console.log("future_coin_socket(coinTicker) connection closed"); 
              } 
    
        }

        function future_socket(futTicker,futtype) {
        
            if(!futTickers.includes(futTicker.toLowerCase() + '@bookTicker'))
            {
                futTickers.push(futTicker.toLowerCase()+ '@bookTicker')
            }    
    
            if(!futTickersMark.includes(futTicker.toLowerCase()+'@markPrice'))
            {
                futTickersMark.push(futTicker.toLowerCase()+'@markPrice')
            }
        
            let bookTickermsg = {
                "method": "SUBSCRIBE",
                "params": futTickers,
                "id": 1
            }
    
            let markMsg = {
                "method": "SUBSCRIBE",
                "params": futTickersMark,
                "id": 2
            }
    
            wsf.onopen = function() {
                wsf.send(JSON.stringify(bookTickermsg))
                wsf.send(JSON.stringify(markMsg))
                console.log('FUTURE SOCKET OPENED');
            }
            wsf.onmessage = function(msg) {
                data = JSON.parse(msg.data);
                
                if(data['e']=="bookTicker")
                {
                    symbolCard(data,futtype,'binance',0,0)
                    
                }
                if(data['e']=="markPriceUpdate")
                {      
                   
                    
                }
            }
            if (wsf.readyState === 1) {
                wsf.send(JSON.stringify(bookTickermsg))
                wsf.send(JSON.stringify(markMsg))
            }

            wsf.onclose = function(msg){ 
                setTimeout(() => {
                    wsf = null
                    wsf = new WebSocket(FSTREAM_URL + 'ws/')
                    future_socket(futTicker,futtype) 
                }, 1000);
      
                console.log("future_socket(futTicker) connection closed"); 
              } 
    
        }

        function spot_bookticker_socket(spot_ticker,spottype) {    
            let spotTicker = spot_ticker.toLowerCase() + '@bookTicker'
            
                // console.log(del_ticker_temp)
                if(!tick_spot.includes(spot_ticker))
                {
                    if (wss.readyState ==1)
                        wss.close()
                    tick_spot.push(spot_ticker)
                    for(i=0;i<tick_spot.length;i++)
                    {
                        SpotStream = SpotStream + '/' +  spotTicker
                    }
                    wss = new WebSocket(SSTREAM_URL + 'stream?streams='+SpotStream);
                    // console.log('SPOT STREAM : ',SpotStream);
                }
     
            wss.onmessage = function(msg) {
                data = JSON.parse(msg.data)['data'];
                symbolCard(data,spottype,'binance',0,0)

            }


            wss.onclose = function(msg){ 
                setTimeout(() => {
                  wss = null
                  wss = new WebSocket(SSTREAM_URL + 'stream?streams='+SpotStream)
                  spot_bookticker_socket(spot_ticker,spottype)
                }, 1000);
      
                console.log("connection closed"); 
              }
    
        }

        function Spot_markPrice(spot_ticker) {
            let spotTicker = spot_ticker.toLowerCase() + '@ticker'
            
            // console.log(del_ticker_temp)
            if(!tick_spotMark.includes(spot_ticker))
            {
                if (wssMark.readyState ==1)
                    wssMark.close()
                tick_spotMark.push(spot_ticker)
                for(i=0;i<tick_spotMark.length;i++)
                {
                    SpotMarkStream = SpotMarkStream + '/' +  spotTicker
                }
                wssMark = new WebSocket(SSTREAM_URL + 'stream?streams='+SpotMarkStream);
                // console.log('SPOT MARKET PRICE STREAM : ',SpotMarkStream);
            }
         
            wssMark.onopen = function(){
                // console.log('MARK OPENED');
            }

            wssMark.onmessage = function(msg) {
                data = JSON.parse(msg.data)['data'];
          
               
            } 
            wssMark.onclose = function(msg){ 
                setTimeout(() => {
                    wssMark = null
                    wssMark = new WebSocket(SSTREAM_URL + 'stream?streams='+SpotMarkStream);
                  Spot_markPrice(spot_ticker) 
                }, 1000);
      
                console.log("Spot_markPrice connection closed"); 
              }  
        }


        function closeWebsockets(wsd,wsf,wss,wssMark)
        {
            if(wsd.readyState==1)
                wsd.close()
            if(wsf.readyState==1)
                wsf.close()
            if(wss.readyState==1)
                wss.close()  
            if(wssMark.readyState==1)
                wssMark.close()           
        }

        spot_bookticker_socket("BTCUSDT")
        Spot_markPrice("BTCUSDT")
        future_coin_socket('BTCUSD_PERP')
        future_socket('BTCUSDT')
