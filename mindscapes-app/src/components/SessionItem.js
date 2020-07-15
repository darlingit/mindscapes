import React from "react";

const SessionItem = (props) => {
    return (
        <tr>
            <td>{props.sessionName}</td>
            <td>{props.dateUploaded}</td>
            <td>{props.parentFolder}</td>
            <td className="option-button"><i className="fas fa-ellipsis-v fa-md"/></td>
        </tr>
    )
}

export default SessionItem;