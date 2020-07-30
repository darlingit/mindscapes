import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import {ChromePicker} from 'react-color';

class SensorOptions extends React.Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        this.props.changeColors(e.target.id, e.target.value);
    }

    render() {
        const s = this.props.sensor;
        return (
            <Form.Group as={Row} controlId={s}>
                <Form.Check
                    inline
                    defaultChecked
                    custom
                    onClick={e => this.props.showSensor(e.target)}
                    type={"checkbox"}
                    id={`${s}`}
                    label={`Sensor ${s.slice(-1)}`}
                />
                <Form.Control type="color" className="form-color" defaultValue={this.props.color}
                              onChange={this.handleChange}/>

            </Form.Group>
        );
    }
}

export default SensorOptions;