import React from 'react';

import Badge from 'components/UI/badge/Badge';

import utils from 'utils';

import styling from './UserInteractions.module.scss';

const UserInteractions = ({ userInteractions }) => {
    return (
        <section hidden={!userInteractions.length}>
            <h4 className={styling.title}>User Interactions</h4>
            
            <ul className={styling.wrapper}>
                {userInteractions.map((interaction, i) => (
                    <li key={i}>
                        <div className={(i !== userInteractions.length - 1) ? styling.bullet : styling.errorBullet}>
                            <div />
                            <div />
                        </div>
                        
                        <div className={styling.interaction}>
                            <div><b>Element:</b> <Badge size='tiny' type='info'>{interaction.element}</Badge></div>
                            <div><b>Element ID:</b> {interaction.id || 'n/a'}</div>
                            <div><b>Outer HTML:</b> {interaction.outerHtml}</div>
                            <div><b>Element Path:</b> {interaction.path.reverse().join(' > ')}</div>
                            <div><b>Location:</b> {interaction.location}</div>
                            <div><b>Timestamp:</b> {utils.getDateWithTime(interaction.timestamp)}</div>
                        </div>
                    </li>
                ))}
                
                <div className={styling.line} />
            </ul>
        </section>
    );
};

export default UserInteractions;