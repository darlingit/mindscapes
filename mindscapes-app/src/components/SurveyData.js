import React from "react";
import {Form} from "react-bootstrap";

class SurveyData extends React.Component {
    constructor(props) {
        super(props);

        this.renderFields = this.renderFields.bind(this);

    }

    renderFields(surveyObject) {
        return Object.keys(surveyObject).map((key, index) => {
            return (
                <Form.Group controlId={index} key={index}>
                    <Form.Label>
                        {key}
                    </Form.Label>
                    <Form.Control plaintext readOnly defaultValue={surveyObject[key]}/>
                </Form.Group>
            );
        });

    }

    render() {
        const survey = this.props.survey;
        return (
            <Form className="px-5 survey">
                {this.renderFields(survey)}
            </Form>

        )
    }
}

export default SurveyData;