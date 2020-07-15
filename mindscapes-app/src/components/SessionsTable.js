import React from "react";
import SessionItem from "./SessionItem";

const SessionsTable = () => {
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
            <SessionItem sessionName={"Session 634"} dateUploaded={"12 June 2020"} parentFolder={"/Folder B"}/>
            <SessionItem sessionName={"Session 633"} dateUploaded={"10 June 2020"} parentFolder={"/Folder B"}/>
            <SessionItem sessionName={"Session 632"} dateUploaded={"06 June 2020"} parentFolder={"/Folder B"}/>
            </tbody>
        </table>
    );
}

export default SessionsTable;