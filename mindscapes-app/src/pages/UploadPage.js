import React from 'react';
import UploadButton from "../components/UploadButton";

const UploadPage = () => (
    <>
        <div className="pt-2 pb-2 mb-3">
            <h2>Upload new session</h2>
        </div>
        <div className="content p-3">
            <form className="mt-5">
                <UploadButton labelName={"EEG file (csv/json)*"} buttonText={"Upload file"} id={"eegUpload"} fileTypes={".csv,.json"} multiple={false} />
                <UploadButton labelName={"Survey Data"} buttonText={"Upload survey"} id={"surveyUpload"} fileTypes={".csv,.json"} multiple={false} />
                <UploadButton labelName={"Images"} buttonText={"Upload images"} id={"imgUpload"} fileTypes={".png, .jpeg"} multiple={true} />

                {/*<div className="row justify-content-center mt-6">*/}
                <button type="submit" className="btn btn-main mt-5">Submit</button>
                {/*</div>*/}
            </form>
        </div>
    </>
);

export default UploadPage;