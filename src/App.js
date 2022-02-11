import './App.css';
import './CSS/MarketWatch.css';
import MarketWatch from './components/UI/class/MarketWatch';
import { Col, Row } from 'react-bootstrap';
import BottomPanle from './components/UI/class/BottomPanle';

function App() {
  return (
    <div className="App scrollbar scrollbar-primary">
      <Row>
        <Col xs lg="12">
          <MarketWatch />

        </Col>
      </Row>
      <Row>
        <Col xs lg="12">
          <BottomPanle />
        </Col>
      </Row>
    </div>
  );
}

export default App;
