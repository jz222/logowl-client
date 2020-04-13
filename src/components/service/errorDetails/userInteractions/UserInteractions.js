import React from 'react';

import styling from './UserInteractions.module.scss';

const UserInteractions = ({ userInteractions }) => {
    return (
        <section>
            <h4 className={styling.title}>User Interactions</h4>
        </section>
    );
};

export default UserInteractions;