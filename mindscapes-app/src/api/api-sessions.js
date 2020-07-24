const readUploadedFileAsText = (inputFile) => {
    const fr = new FileReader();

    return new Promise((resolve, reject) => {
        fr.onerror = () => {
            fr.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        fr.onload = () => {
            resolve(fr.result);
        };
        fr.readAsText(inputFile);
    });
};


const getAllSessions = async() => {
    const response = await fetch(`/api/sessions`);
    return await response.json();
}

const deleteSession = async(sessionId) => {
    const response = await fetch(`/api/sessions/delete`, {
        method: 'delete',
        body: JSON.stringify({ sessionId }),
        headers: {
        'Content-Type': 'application/json',
        }});
    return await response.json();
}

const postSession = async(form) => {
    const { sessionName, eegUpload, surveyUpload } = form;

    const files = {eegUpload, surveyUpload};
    let filesWithContent = {};
    for (const key of Object.keys(files)) {
        try {
            const fileContent = await readUploadedFileAsText(files[key][0]);
            filesWithContent = {
                ...filesWithContent,
                [key]: fileContent,
            };
        } catch (e) {
            console.warn(e.message)
        }
    }
    const response = await fetch(`/api/sessions/post`, {
        method: 'post',
        body: JSON.stringify({ sessionName, filesWithContent }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await response.json();
}

export {getAllSessions, postSession, deleteSession};