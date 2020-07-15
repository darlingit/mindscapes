import React from 'react';

const Folder = (props) => {
    return (
        <div className="folder-item d-flex">
            <div className="icon p-3 d-flex"><i className="far fa-folder fa-2x my-auto"/></div>
            <div className="mx-3 my-auto p-4">
                <h6>{props.name}</h6>
                <span className="info">{props.info}</span>
            </div>
        </div>
    );
}

export default Folder;