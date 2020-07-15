import React from "react";

class SessionItem extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.sessionName}</td>
                <td>{this.props.dateUploaded}</td>
                <td>{this.props.parentFolder}</td>
                <td className="option-button"><i className="fas fa-ellipsis-v fa-md"/></td>
            </tr>
        );
    }
}

export default SessionItem;