import React from 'react';

import styling from './Avatar.module.scss';

const Avatar = ({ firstName = '', lastName = '' }) => {
    return <div className={styling.one}>{firstName[0]}{lastName[0]}</div>;
};

export default Avatar;