import React from "react";

class UploadButton extends React.Component {
    render() {
        const multiple = this.props.multiple;

        const inputElement = () => {
            if (multiple) {
                return (<input type="file" className="form-control-file hidden" id={this.props.id}
                               accept={this.props.fileTypes} multiple/>)
            } else {
                return (<input type="file" className="form-control-file hidden" id={this.props.id}
                               accept={this.props.fileTypes}/>)
            }
        }
        return (
            <div className="form-group">
                <label className="upload">{this.props.labelName}</label>
                <label htmlFor={this.props.id} className="btn btn-upload">
                    <i className="far fa-caret-square-up fa-lg"/> {this.props.buttonText}
                </label>
                {inputElement()}
            </div>
        );
    }
}

export default UploadButton;