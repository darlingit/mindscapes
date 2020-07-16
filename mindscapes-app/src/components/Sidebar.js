import React from "react";
import {Link, withRouter } from 'react-router-dom';
import {Nav} from "react-bootstrap";

class Sidebar extends React.Component {
    render() {
        return (
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 sidebar">
                <div className="sidebar-sticky">
                    <h3>Mindscapes</h3>
                    <Nav className="nav flex-column" activeKey={this.props.location.pathname}>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/gallery" eventKey={"/gallery"}>
                                <i className="far fa-images fa-lg feather"/>
                                Gallery
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/upload" eventKey={"/upload"}>
                                <i className="far fa-caret-square-up fa-lg feather"/>
                                Upload
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/explore" eventKey={"/explore"}>
                                <i className="fas fa-atom fa-lg feather"/>
                                Data exploration
                            </Nav.Link>
                        </Nav.Item>


                    </Nav>
                </div>
            </nav>
        );
    }
}

export default withRouter(Sidebar);