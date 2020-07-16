import React from 'react';
import {Link} from "react-router-dom";

class Folder extends React.Component {
    render() {
        return (
            <Link to={"gallery/folder/" + this.props.name} className="folder-item d-flex">
                <div className="icon p-3 d-flex"><i className="far fa-folder fa-2x my-auto"/></div>
                <div className="mx-3 my-auto p-4">
                    <h6>{this.props.name}</h6>
                    <span className="info">{this.props.info}</span>
                </div>
            </Link>
        );
    }
}

export default Folder;