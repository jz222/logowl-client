import React from 'react';

import styling from './Avatar.module.scss';

const Avatar = ({ firstName = '', lastName = '', size = 'standard', stacked }) => {
    let style = styling.one;
    
    const charCode = firstName.toUpperCase().charCodeAt(0) || 0;
    
    if (charCode >= 75) {
        style = styling.two;
    }
    
    if (charCode >= 83) {
        style = styling.three;
    }
    
    style = style + ' ' + styling[size] + ' ' + (stacked && styling.stacked);
    
    return <div className={style}>{firstName[0].toUpperCase()}{lastName[0].toUpperCase()}</div>;
};

export const AvatarPlaceholder = ({ number, size = 'standard' }) => (
    <div className={styling.placeholder + ' ' + styling[size]}>+{number}</div>
);

export default Avatar;