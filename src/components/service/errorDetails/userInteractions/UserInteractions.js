import React from 'react';

import Badge from 'components/UI/badge/Badge';

import utils from 'utils';

import styling from './UserInteractions.module.scss';

const UserInteractions = ({ userInteractions, errorMessage }) => {
    return (
        <section hidden={!userInteractions.length}>
            <h4 className={styling.title}>User Interactions</h4>
            
            <ul className={styling.wrapper}>
                {userInteractions.map((interaction, i) => (
                    <li key={i}>
                        <div className={styling.bullet}>
                            <div />
                            <div />
                        </div>
                        
                        <div className={styling.interaction}>
                            <div><b>Element:</b> <Badge size='tiny' type='info'>{interaction.element}</Badge></div>
                            <div hidden={!interaction.id}><b>Element ID:</b> {interaction.id}</div>
                            <div hidden={!interaction.innerText}><b>Label:</b> {interaction.innerText}</div>
                            <div><b>Location:</b> {interaction.location}</div>
                            <div><b>Timestamp:</b> {utils.getDateWithTime(interaction.timestamp)}</div>
                        </div>
                    </li>
                ))}
                
                <li>
                    <div className={styling.errorBullet}>
                        <div />
                        <div />
                    </div>
                    
                    <div className={styling.interaction}>
                        <h5>{errorMessage}</h5>
                    </div>
                </li>
                
                <div className={styling.line} />
            </ul>
        </section>
    );
};

export default UserInteractions;