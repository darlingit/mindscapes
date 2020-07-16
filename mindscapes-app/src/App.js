import React from 'react';
import {Route, withRouter, Switch} from 'react-router-dom';
import {Container, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GalleryPage from "./pages/GalleryPage"
import UploadPage from "./pages/UploadPage"
import Sidebar from "./components/Sidebar";
import FolderPage from "./pages/FolderPage";
import SessionPage from "./pages/SessionPage";

class App extends React.Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col md={3} lg={2} className="d-md-block d-none">
                        <Sidebar />
                    </Col>
                    <Col md={9} lg={10} id="page-content-wrapper">
                        <main role="main" className="ml-sm-auto p-6">
                            <Switch>
                                <Route path="/gallery" component={GalleryPage} exact/>
                                <Route path="/upload" component={UploadPage}/>
                                <Route path="/gallery/folder/:folderName" component={FolderPage}/>
                                <Route path="/gallery/session/:sessionName" component={SessionPage}/>
                                {/*<Route path="/articles-list" component={ExplorePage} />*/}
                            </Switch>
                        </main>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(App);
