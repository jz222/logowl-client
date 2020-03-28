const convertTimestamp = (timestamp) => {
    return timestamp < 1000000000000 ? timestamp * 1000 : timestamp
};

export const getDate = (timestamp) => {
    try {
        timestamp = convertTimestamp(timestamp);
        
        const date = new Date(timestamp);
        
        return date.toLocaleDateString();
        
    } catch (error) {
        console.error(error);
        return '';
    }
};

export const getDateWithTime = (timestamp) => {
    try {
        timestamp = convertTimestamp(timestamp);
        
        const date = new Date(timestamp);
        
        return date.toLocaleString();
        
    } catch (error) {
        console.error(error);
        return '';
    }
};