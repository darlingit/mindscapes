import React from 'react';
import UploadButton from "../components/UploadButton";
import {postSession} from "../api/api-sessions";
import {Redirect} from "react-router-dom";

class UploadPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            buttonDisabled: true,
            form: {
                sessionName: "",
            },
        };

        this.checkCompleted = this.checkCompleted.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateState = this.updateState.bind(this);
        this.displayNotifications = this.displayNotifications.bind(this);

    }

    handleChange(event) {
        this.updateState(event.target.id, event.target.value)
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const res = await postSession(this.state.form);
            const sessionPosted = res.body;
            console.log(res);
            if (res.response.status === 200) {
                this.setState({
                    sessionPosted: sessionPosted,
                    isLoading: false,
                })
            } else {
                this.setState({
                    error: res.response.statusText,
                    isLoading: false,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    checkCompleted(form) {
        if (form.sessionName !== "" && form.eegUpload && form.surveyUpload) {
            this.setState({
                buttonDisabled: false
            })
        }
    }

    updateState(name, value) {
        let json = {
            form: {
                ...this.state.form,
                [name]: value,
            },
        };

        this.setState(json);
        this.checkCompleted(json.form);
    }

    displayNotifications() {
        if (this.state.error) {
            window.scrollTo(0, 0);
            return (
                <div className="notification">
                    <p>Error: {this.state.error}</p>
                </div>
            );
        }
    }

    render() {
        if (this.state.sessionPosted && !this.state.error) {
            return (<Redirect
                to={{pathname: '/gallery', state: {notification: "success", session: this.state.sessionPosted}}}/>)
        } else {
            return (
                <>
                    <div className="pt-2 pb-2 mb-3">
                        <h2>Upload new session</h2>
                    </div>
                    {this.displayNotifications()}
                    <div className="content p-3">
                        <form className="mt-5" onSubmit={this.handleSubmit}>
                            <div className="form-group mt-5">
                                <label htmlFor="sessionName">Session name*</label>
                                <input type="text" className="form-control" id="sessionName"
                                       value={this.state.form.sessionName} onChange={this.handleChange}/>
                            </div>
                            <UploadButton labelName={"EEG file (csv/json)*"} buttonText={"Upload file"} id={"eegUpload"}
                                          fileTypes={".csv,.json"} multiple={false} handleUpload={this.updateState}/>
                            <UploadButton labelName={"Survey Data*"} buttonText={"Upload survey"} id={"surveyUpload"}
                                          fileTypes={".csv,.json"} multiple={false} handleUpload={this.updateState}/>
                            {/*<UploadButton labelName={"Images"} buttonText={"Upload images"} id={"imgUpload"} fileTypes={".png, .jpeg"} multiple={true} />*/}

                            {/*<div className="row justify-content-center mt-6">*/}
                            <button type="submit" className="btn btn-main mt-5"
                                    disabled={this.state.buttonDisabled}>Submit
                            </button>
                            {/*</div>*/}
                        </form>
                    </div>
                </>
            );
        }
    }
}

export default UploadPage;