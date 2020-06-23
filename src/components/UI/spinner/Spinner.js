import React from 'react';

import styling from './Spinner.module.scss';

const Spinner = ({ size, invert, hidden }) => {
    const style = (styling[size] || styling.medium) + ' ' + (invert && styling.invert);
    
    return (
        <div className={style} hidden={hidden}>
            <div />
            <div />
        </div>
    );
};

export const LoadingSpinner = () => (
    <div className={styling.loadingSpinner}>
        <Spinner invert />
        <h4>loading</h4>
    </div>
);

export default Spinner;