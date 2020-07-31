import React from "react";
import {Col, Form, Row} from "react-bootstrap";

class SvgOptions extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Form className="options ml-5 mt-5" onSubmit={this.props.updateDesign}>
                <Row>
                    <Col sm={4}>
                        {this.props.checkBoxes}
                    </Col>
                    <Col sm={6}>
                        <Form.Group as={Row} controlId="stroke-width">
                            <Form.Label column sm={3} className="pr-0">
                                Stroke width
                            </Form.Label>
                            <Col sm={6}>
                                <Form.Control type="number" defaultValue={this.props.strokeWidth} min="1" onChange={this.props.changeStrokeWidth}/>
                                <span style={{fontSize: "0.8rem", display: "inline-block"}}>px</span>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="d-flex">
                    <div id="generate-buttons" className="ml-auto mt-2">
                        <a id="imgLink" href="" style={{display: "none"}} download="svg_snapshot">link</a>
                        <button className="btn btn-upload mr-3" onClick={this.props.generateDownloadLink}>
                            Generate svg file
                        </button>
                        <button type="submit" className="btn btn-main ml-auto">
                            Save changes
                        </button>
                    </div>

                </Row>
            </Form>
        )
    }
}

export default SvgOptions;