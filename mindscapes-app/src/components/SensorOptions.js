import React from "react";
import {Form, Row} from "react-bootstrap";
import reactCSS from 'reactcss';
import {ChromePicker} from 'react-color'

class SensorOptions extends React.Component {
    constructor(props) {
        super(props);
        let rx = /\(.*?\)/;
        const color = rx.exec(props.color)[0].replace(/[()]/g, "").split(",");
        this.state = {
            sensor: this.props.sensor,
            displayColorPicker: false,
            color: {
                r: color[0],
                g: color[1],
                b: color[2],
                a: color[3]
            }
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    handleClick() {
        this.setState({displayColorPicker: !this.state.displayColorPicker})
    };

    handleClose() {
        this.setState({displayColorPicker: false})
    };

    handleColorChange(color) {
        this.setState({color: color.rgb});
        this.props.changeColor(this.state.sensor, color.rgb);
    }

    render() {
        const styles = reactCSS({
            'default': {
                colorPicker: {
                    width: '30px',
                    height: '14px',
                    background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
            },
        });
        return (
            <Form.Group as={Row} controlId={this.state.sensor} className="ml-2">
                <Form.Check
                    inline
                    defaultChecked
                    custom
                    onClick={e => this.props.showSensor(e.target)}
                    type={"checkbox"}
                    id={`${this.state.sensor}`}
                    label={`Sensor ${this.state.sensor.slice(-1)}`}
                />
                <div className="swatch" onClick={this.handleClick}>
                    <div style={styles.colorPicker}/>
                </div>
                {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div className="cover" onClick={this.handleClose}/>
                    <ChromePicker color={this.state.color} onChange={this.handleColorChange}/>
                </div> : null}
            </Form.Group>
        );
    }
}

export default SensorOptions;