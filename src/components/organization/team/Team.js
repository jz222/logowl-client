import React from 'react';
import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';

import { Action } from 'components/UI/button/Button';
import Avatar from 'components/UI/avatar/Avatar';
import Badge from 'components/UI/badge/Badge';
import Card from 'components/UI/card/Card';

import fetchClient from 'fetchClient';
import { useStore } from 'context';

import styling from './Team.module.scss';

const transition = {
    type: 'spring',
    damping: 20,
    stiffness: 400
};

const Team = ({ team = [], userId }) => {
    const [store, dispatch] = useStore();
    
    /**
     * Deletes an user with a given ID.
     * @param id {string} the ID of the user who should be deleted
     * @returns {Promise<void>}
     */
    const deleteUser = async (id) => {
        const currentTeam = [...store.team];
        
        try {
            const updatedTeam = currentTeam.filter(user => user.id !== id);
            
            dispatch({ type: 'update', payload: { team: updatedTeam } });
            
            const res = await fetchClient('deleteUserById', null, '/user/' + id);
            
            if (!res.ok) {
                throw new Error(res.message || 'failed to delete user');
            }
            
        } catch (error) {
            console.error(error);
            dispatch({ type: 'update', payload: { team: currentTeam } });
        }
    };
    
    /**
     * Opens an email client to send an email with the invite code.
     * @param firstName {string} first name of the invited user
     * @param lastName {string} last name of the invited user
     * @param email {string} email of the invited user
     * @param inviteCode {string} invite code of the user
     */
    const sendEmail = (firstName, lastName, email, inviteCode) => {
        const greeting = `Hello ${firstName} ${lastName},%0D%0A%0D%0A`;
        const text = 'I would like to invite you to LOGGY. Please click the link below to register your account.%0D%0A%0D%0A';
        const url = window.location.origin + '/auth/signup?code=' + inviteCode;
        
        const message = (greeting + text + url).replace(' ', '%20');
        
        window.location.href = 'mailto:' + email + '?subject=LOGGY%20Sign%20Up&body=' + message;
    };
    
    const reversedTeam = [...team].reverse();
    
    return (
        <Card>
            <ul>
                {reversedTeam.map(user => (
                    <motion.li key={user.email} className={styling.user} layoutTransition={transition}>
                        <Avatar firstName={user.firstName} lastName={user.lastName} />
                        
                        <div className={styling.wrapper}>
                            <div>
                                <div className={styling.info}>
                                    <h6>{user.firstName} {user.lastName}</h6>
                                    <Badge type='neutral' size='small'>{user.role}</Badge>
                                    <Badge type='info' size='small' hidden={user.isVerified}>pending</Badge>
                                </div>
                                
                                <p>{user.email}</p>
                                
                                <Badge
                                    type='neutral'
                                    size='small'
                                    hidden={!user.inviteCode}
                                    click={() => sendEmail(user.firstName, user.lastName, user.email, user.inviteCode)}
                                >
                                    Invite Code: {user.inviteCode}
                                </Badge>
                            </div>
                            
                            <Action
                                icon={<FiTrash2 />}
                                onClick={() => deleteUser(user.id)}
                                hidden={user.id === userId}
                            >
                                Delete
                            </Action>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </Card>
    );
};

export default Team;