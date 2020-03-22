const getDate = (timestamp) => {
    try {
        if (timestamp < 1000000000000) {
            timestamp = timestamp * 1000;
        }
        
        const date = new Date(timestamp);
        
        return date.toLocaleDateString();
        
    } catch (error) {
        console.error(error);
        return '';
    }
};

export default getDate;