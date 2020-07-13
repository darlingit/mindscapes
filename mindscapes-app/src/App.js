import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GalleryPage from "./pages/GalleryPage"
import UploadPage from "./pages/UploadPage"
import Sidebar from "./components/Sidebar";

function App() {
    return (
        <Router>
            <Container fluid>
                <Row>
                    <Col md={3} lg={2} className="d-md-block d-none">
                        <Sidebar/>
                    </Col>
                    <Col md={9} lg={10} id="page-content-wrapper">
                        <main role="main" className="ml-sm-auto p-6">
                            <Route path="/" component={GalleryPage} exact/>
                            <Route path="/upload" component={UploadPage}/>
                            {/*<Route path="/articles-list" component={ExplorePage} />*/}
                        </main>
                    </Col>
                </Row>
            </Container>
        </Router>

    );
}

export default App;
