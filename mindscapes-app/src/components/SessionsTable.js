import React from "react";
import SessionItem from "./SessionItem";
import {getAllSessions} from "../api/api-sessions";

class SessionsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            items: [],
        }

        this.getData = this.getData.bind(this);
    }

    async componentDidMount() {
        await this.getData();
    }

    async getData() {
        try {
            const sessions = await getAllSessions();
            this.setState({
                items: sessions,
                isLoading: false,
            })


        } catch (error) {
            console.log(error);
        }
    }

    handleItems(items) {
        let components = [];
        if (!this.state.isLoading) {
            items.map((element, index) =>
                components.push(
                    <SessionItem
                        key={index}
                        session={element}
                    />
                )
            );
        }
        return components;
    }


    render() {
        return (
            <table className="table sessions mt-4">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Date Uploaded</th>
                    <th scope="col"/>
                    <th scope="col"/>
                </tr>
                </thead>
                <tbody>
                {this.handleItems(this.state.items)}
                </tbody>
            </table>
        );
    }
}

export default SessionsTable;