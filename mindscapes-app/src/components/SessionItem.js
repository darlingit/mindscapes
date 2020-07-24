import React from "react";
import {Link} from "react-router-dom";
import {DropdownButton, Dropdown} from "react-bootstrap";
import {deleteSession} from "../api/api-sessions";

class SessionItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            session: props.session,
        }
        this.handleDelete = this.handleDelete.bind(this);

    }

    async handleDelete() {
        try {
            console.log(this.state.session);
            await deleteSession(this.state.session._id);
            this.props.handleSessionDelete(this.state.session);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const dateUploaded = new Date(this.state.session.uploaded);
        return (
            <tr>
                <td>
                    <Link to={
                        {
                            pathname: "/gallery/session/" + this.state.session.name,
                            customProps: this.state.session,
                        }}>
                        {this.state.session.name}
                    </Link>
                </td>
                <td>{dateUploaded.toLocaleDateString()}</td>
                {/*<td>/{item.parent}</td>*/}
                <td className="option-button">
                <DropdownButton alignRight title={<i className="fas fa-ellipsis-v fa-md"/>}>
                    <Dropdown.Item onClick={this.handleDelete}>Delete</Dropdown.Item>
                </DropdownButton>
                </td>
            </tr>
        );
    }
}

export default SessionItem;