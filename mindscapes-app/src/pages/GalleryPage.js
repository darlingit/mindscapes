import React from 'react';
import Folder from "../components/Folder";
import SessionsTable from "../components/SessionsTable";

class GalleryPage extends React.Component {
    constructor(props) {
        super(props);
        this.displayNotifications = this.displayNotifications.bind(this);
    }

    displayNotifications() {
        if (this.props.location.state) {
            console.log(this.props.location.state.session);
            return (
                <div className="notification">
                    <p>Session uploaded successfully!</p>
                </div>

            )
        }
    }

    render() {
        return (
            <>
                <div className="pt-2 pb-2 mb-3">
                    <h2>Uploaded sessions</h2>
                </div>
                <div className="content p-3">
                    {this.displayNotifications()}
                    {/*<h3 className="mt-3">Folders</h3>*/}
                    {/*<div className="folders d-flex mt-4">*/}
                    {/*    <Folder folderName={"Folder A"} info={"234 files"} />*/}
                    {/*    <Folder folderName={"Folder B"} info={"2 files"} />*/}
                    {/*    <Folder folderName={"Folder C"} info={"10 files"} />*/}
                    {/*    <Folder folderName={"Folder D"} info={"15 files"} />*/}
                    {/*    <Folder folderName={"Folder E"} info={"2 files"} />*/}
                    {/*</div>*/}

                    <h3 className="mt-6">Sessions</h3>
                    <SessionsTable />
                </div>
            </>
        );
    }
}

export default GalleryPage;
