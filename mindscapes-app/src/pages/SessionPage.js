import React from "react";
import {Card} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import SurveyData from "../components/SurveyData";
import Visualization from "../components/Visualization";

class SessionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayOn: false,
        }

        this.toggleOptions = this.toggleOptions.bind(this);
        this.displayNotifications = this.displayNotifications.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    toggleOptions() {
        this.setState(prevState => ({
            displayOn: !prevState.displayOn,
        }))
    }

    handleUpdate(notification) {
        this.setState({
            notification,
        });
    }

    displayNotifications() {
        if (this.state.notification === "success") {
            return (
                <div className="notification">
                    <p>Changes saved!</p>
                </div>
            )
        }
    }

    renderRedirect = () => {
        if (!this.props.location.customProps) {
            return <Redirect to='/gallery'/>
        } else {
            const item = this.props.location.customProps;
            return (
                <>
                    <div className="pt-2 pb-2 mb-3">
                        <h2 className="folder">Uploaded sessions {item.parent ? "> " + item.parent : ""} </h2>
                    </div>
                    <div className="content p-3">
                        {this.displayNotifications()}
                        <div className="folder d-flex">
                            <div className="mr-auto d-flex mt-3 my-auto">
                                <h3 className="my-auto">{item.name}</h3>
                            </div>
                            <div className="option-button my-auto">
                                <i className="fas fa-ellipsis-v fa-md"/>
                            </div>
                        </div>
                        <div className="mt-5 w-95">
                            <Card>
                                <Card.Title className="d-flex">
                                    <div className="mr-auto my-auto p-3 pl-4">EEG Data</div>
                                    <div className="btn-edit" onClick={this.toggleOptions}>
                                        <i className="far fa-edit fa-md"/>
                                    </div>
                                </Card.Title>
                                <Card.Body>
                                    <Visualization handleUpdate={this.handleUpdate} sessionName={item.name}
                                                   data={item.eeg} design={item.design}
                                                   displayOptions={this.state.displayOn}/>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Title className="d-flex">
                                    <div className="mr-auto my-auto p-3 pl-4">Survey Data</div>
                                    {/*<div className="btn-edit">*/}
                                    {/*    <i className="far fa-edit fa-md"/>*/}
                                    {/*</div>*/}
                                </Card.Title>
                                <Card.Body>
                                    <SurveyData survey={item.survey}/>
                                </Card.Body>
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