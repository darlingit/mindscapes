const getAllSessions = async() => {
    const response = await fetch(`/api/sessions`);
    console.log("here");
    return await response.json();
}

export {getAllSessions};