const getDate = (timestamp) => {
    try {
        const date = new Date(timestamp);
        
        return date.toLocaleDateString();
        
    } catch(error) {
        console.error(error);
        return '';
    }
};

export default getDate;