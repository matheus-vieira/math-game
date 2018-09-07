import React from "react";
import { Row, Col, Card } from 'react-materialize';

const Home = () => (
  <Row>
    <Col m={3} s={12}>
    </Col>
    <Col m={8} s={12}>
        <h5 className="subtitle">About</h5>
        <Card>
          <div>
            <p><b>Test</b></p>
            <p>Here we start the Math Game</p>
          </div>
        </Card>
    </Col>
  </Row>
);

export default Home;