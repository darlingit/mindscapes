import React from "react";
import SessionsTable from "../components/SessionsTable";

class FolderPage extends React.Component {
    render() {
        return (
            <>
                <div className="pt-2 pb-2 mb-3">
                    <h2 className="folder">Uploaded sessions</h2>
                </div>

                <div className="content p-3">
                    <div className="folder d-flex">
                        <div className="mr-auto d-flex mt-3">
                            <div className="icon d-flex mr-2"><i className="far fa-folder fa-lg my-auto"/></div>
                            <h3 className="my-auto">Folder B</h3>
                        </div>
                        <div className="option-button my-auto">
                            <i className="fas fa-ellipsis-v fa-md"/>
                        </div>

                    </div>

                    <div className="p-3">
                        <SessionsTable />
                    </div>
                </div>
            </>
        );

    }
}

export default FolderPage;