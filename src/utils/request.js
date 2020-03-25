const request = async (url, opts) => {
    const response = await fetch(url, opts);
    return response.json();
};

export default request;