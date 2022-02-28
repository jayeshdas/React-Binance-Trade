import './App.css';
import './CSS/MarketWatch.css';
import MarketWatch from './components/UI/class/MarketWatch';
import { Col, Row } from 'react-bootstrap';
import { AppBar } from '@mui/material';
import BottomPanle from './components/UI/class/BottomPanle';
import ResponsiveAppBar from './components/UI/class/MUINavBar';
import { Routes,Route } from 'react-router';
import Chart from './components/UI/class/Chart';
import ToDo from './components/UI/TODO/ToDo';

function App() {
  return (


    <div className="App">

     <ResponsiveAppBar/>
     <Routes>
       <Route path='/' element={<MarketWatch />}></Route>
       <Route path='/settings' element={<BottomPanle />}></Route>
       <Route path='/chart' element={<Chart/>}></Route>

     </Routes>
      {/* <Row>
        <Col xs lg="12">
          <MarketWatch />
        </Col>
      </Row>
      <Row>
        <Col xs lg="12">
          <BottomPanle />
        </Col>
      </Row> */}

    </div>
  );
}

export default App;
