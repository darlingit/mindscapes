import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from "./components/Sidebar";

function App() {
  return (
      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="d-md-block d-none">

            {/*</Col>*/}

            {/*<Col md={3} lg={2} id="sidebar-wrapper" className="d-none d-md-block">*/}
            <Sidebar />
          </Col>
          <Col md={9} lg={10} id="page-content-wrapper">
            <main role="main" className="ml-sm-auto p-6">
              test
            </main>
          </Col>
        </Row>

      </Container>
  );
}

export default App;
