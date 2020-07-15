import React from "react";

const UploadButton = (props) => {
    const multiple = props.multiple;

    const inputElement = () => {
        if (multiple) {
            return (<input type="file" className="form-control-file hidden" id={props.id} accept={props.fileTypes} multiple />)
        } else {
            return (<input type="file" className="form-control-file hidden" id={props.id} accept={props.fileTypes} />)
        }
    }
    return (
        <div className="form-group">
            <label className="upload">{props.labelName}</label>
            <label htmlFor={props.id} className="btn btn-upload">
                <i className="far fa-caret-square-up fa-lg"/> {props.buttonText}
            </label>
            {inputElement()}
        </div>
    );
}

export default UploadButton;