import React from 'react';
import {Link} from "react-router-dom";

class Folder extends React.Component {
    render() {
        const item = {
            name: this.props.folderName,
            info: this.props.info,
        }
        return (
            <Link to={
                {
                    pathname: "/gallery/folder/" + item.name,
                    customProps: item,
                }} className="folder-item d-flex">
                <div className="icon p-3 d-flex"><i className="far fa-folder fa-2x my-auto"/></div>
                <div className="mx-3 my-auto p-4">
                    <h6>{item.name}</h6>
                    <span className="info">{item.info}</span>
                </div>
            </Link>
        );
    }
}

export default Folder;