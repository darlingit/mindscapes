import React from "react";

class UploadButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
        }
        this.fileInput = React.createRef();
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange() {
        const uploadedFiles = this.fileInput.current.files
        this.setState({
            files: uploadedFiles,
        })
        this.props.handleUpload(this.props.id, uploadedFiles);
    }

    render() {
        const multiple = this.props.multiple;

        const inputElement = () => {
            if (multiple) {
                return (<input type="file" className="form-control-file hidden" id={this.props.id}
                               accept={this.props.fileTypes} ref={this.fileInput} onChange={this.handleChange} multiple />)
            } else {
                return (<input type="file" className="form-control-file hidden" id={this.props.id}
                               accept={this.props.fileTypes} ref={this.fileInput} onChange={this.handleChange}/>)
            }
        }
        return (
            <div className="form-group">
                <label className="upload">{this.props.labelName}</label>
                <label htmlFor={this.props.id} className="btn btn-upload">
                    <i className="far fa-caret-square-up fa-lg"/> {this.props.buttonText}
                </label>
                {inputElement()}
                <label className="uploaded-info ml-3">{this.state.files[0] ? this.state.files[0].name : "File not chosen"}</label>
            </div>
        );
    }
}

export default UploadButton;