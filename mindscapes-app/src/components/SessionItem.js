import React from "react";
import {Link} from "react-router-dom";

class SessionItem extends React.Component {
    render() {
        const item = this.props.session;
        const dateUploaded = new Date(item.uploaded);
        return (
            <tr>
                <td>
                    <Link to={
                        {
                            pathname: "/gallery/session/" + item.name,
                            customProps: item,
                        }}>
                        {item.name}
                    </Link>
                </td>
                <td>{dateUploaded.toLocaleDateString()}</td>
                {/*<td>/{item.parent}</td>*/}
                <td className="option-button"><i className="fas fa-ellipsis-v fa-md"/></td>
            </tr>
        );
    }
}

export default SessionItem;