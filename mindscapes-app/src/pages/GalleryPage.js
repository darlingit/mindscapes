import React from 'react';
import Folder from "../components/Folder";
import SessionsTable from "../components/SessionsTable";

const GalleryPage = () => (
    <>
        <div className="pt-2 pb-2 mb-3">
            <h2>Uploaded sessions</h2>
        </div>
        <div className="content p-3">
            <h3 className="mt-3">Folders</h3>
            <div className="folders d-flex mt-4">
                <Folder name={"Folder A"} info={"234 files"} />
                <Folder name={"Folder B"} info={"2 files"} />
                <Folder name={"Folder C"} info={"10 files"} />
                <Folder name={"Folder D"} info={"15 files"} />
                <Folder name={"Folder E"} info={"2 files"} />
            </div>

            <h3 className="mt-6">Sessions</h3>
            <SessionsTable />
        </div>
    </>
);

export default GalleryPage;
