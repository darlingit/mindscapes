import React from "react";
import {Card} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import SessionsTable from "../components/SessionsTable";

class SessionPage extends React.Component {
    renderRedirect = () => {
        if (!this.props.location.customProps) {
            return <Redirect to='/gallery'/>
        } else {
            return (
                <>
                    <div className="pt-2 pb-2 mb-3">
                        <h2 className="folder">Uploaded sessions > {this.props.location.customProps.parent}</h2>
                    </div>
                    <div className="content p-3">
                        <div className="folder d-flex">
                            <div className="mr-auto d-flex mt-3 my-auto">
                                <h3 className="my-auto">{this.props.location.customProps.name}</h3>
                            </div>
                            <div className="option-button my-auto">
                                <i className="fas fa-ellipsis-v fa-md"/>
                            </div>

                        </div>
                        <div className="mt-5 w-95">
                            <Card>
                                <Card.Title className="d-flex">
                                    <div className="mr-auto my-auto p-3">EEG Data</div>
                                    <div className="btn-edit">
                                        <i className="far fa-edit fa-md"/>
                                    </div>
                                </Card.Title>
                                <Card.Body>[eeg visualisation]</Card.Body>
                            </Card>
                            <Card>
                                <Card.Title className="d-flex">
                                    <div className="mr-auto my-auto p-3">Survey Data</div>
                                    <div className="btn-edit">
                                        <i className="far fa-edit fa-md"/>
                                    </div>
                                </Card.Title>
                                <Card.Body>survey</Card.Body>
                            </Card>
                        </div>
                    </div>
                </>
            );
        }
    }

    render() {
        return (
            this.renderRedirect()
        );

    }
}

export default SessionPage;