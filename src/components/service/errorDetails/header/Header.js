import React from 'react';
import { FiActivity, FiCheckCircle, FiChevronDown, FiChevronRight, FiChevronUp, FiClock, FiXCircle } from 'react-icons/fi';
import { IoIosFingerPrint } from 'react-icons/io';

import Avatar, { AvatarPlaceholder } from 'components/UI/avatar/Avatar';
import Adapter from 'components/UI/adapter/Adapter';
import Toggle from 'components/UI/toggle/Toggle';
import Badge from 'components/UI/badge/Badge';

import { useStore } from 'context';
import utils from 'utils';

import styling from './Header.module.scss';

const Header = ({ type, adapter, message, evolution, fingerprint, count, firstSeen, lastSeen, resolved, seenBy, resolveHandler }) => {
    const [store] = useStore();
    
    /**
     * Calculates if the error count increased, decreased or
     * remained the same over the last two occurrences.
     * @returns {*} JSX component that indicates the difference
     */
    const compareOccurrences = () => {
        let { difference } = utils.computeEvolution(evolution);
        
        const shortenedDifference = utils.shortNumber(Math.abs(difference) || 0);
        
        let component = <div className={styling.neutral}><FiChevronRight /> 0%</div>;
        
        if (difference > 0) {
            component = <div className={styling.increase}><FiChevronUp /> {shortenedDifference}%</div>;
        }
        
        if (difference < 0) {
            component = <div className={styling.decrease}><FiChevronDown /> {shortenedDifference}%</div>;
        }
        
        return component;
    };
    
    
    /**
     * Returns avatars for all users who have seen the error.
     * Shows only the first four avatars and a placeholder if
     * more than four users have seen the error.
     * @returns {array} avatars
     */
    const getSeenByUsers = () => {
        const seenByUsers = store.team.filter(teamMember => seenBy.includes(teamMember.id));
        
        return seenByUsers.map(({ firstName, lastName }, i) => {
            if (i < 4) {
                return <Avatar key={i} firstName={firstName} lastName={lastName} size='small' stacked />;
            }
            
            if (i === 4) {
                return <AvatarPlaceholder number={seenByUsers.length - 4} size='small' />
            }
            
            return null;
        });
    };
    
    
    return (
        <section className={styling.header}>
            
            <div className={styling.identity}>
                <Badge size='small' type='neutral'>{type}</Badge>
                
                <h2>{message}</h2>
                
                <div className={styling.wrapper}>
                    <div className={styling.box}>
                        <div className={styling.label}>
                            <IoIosFingerPrint />
                            <span>{fingerprint}</span>
                        </div>
                        
                        <div className={styling.label}>
                            <FiClock />
                            <span>Last seen: {utils.getDateWithTime(lastSeen)}</span>
                        </div>
                        
                        <div className={styling.label}>
                            <FiActivity />
                            <span>Total occurrences: {count}</span>
                        </div>
                    </div>
                    
                    <div className={styling.centered}>
                        <div className={styling.box}>
                            <div className={styling.adapter}>
                                <Adapter type={adapter.type} size='medium' />
                                <span>{adapter.name} {adapter.version}</span>
                            </div>
                            
                            <div className={styling.seenBy} hidden={!seenBy.length}>
                                <span>seen by:</span>
                                {getSeenByUsers()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div>
                <div className={styling.occurrence}>
                    <div>
                        <div className={styling.date}>{utils.getDate(firstSeen)}</div>
                        <div className={styling.label}>first seen</div>
                    </div>
                    
                    <div>
                        <div className={styling.date}>{utils.getDate(lastSeen)}</div>
                        <div className={styling.label}>last seen</div>
                    </div>
                    
                    <div className={styling.comparison}>
                        {compareOccurrences()}
                    </div>
                </div>
                
                <div className={resolved ? styling.resolved : styling.unresolved}>
                    <div className={styling.badge}>
                        {resolved ? <FiCheckCircle /> : <FiXCircle />}
                    </div>
                    
                    <p hidden={!resolved}>
                        This error has been marked as resolved. Uncheck on the right to re-open it.
                    </p>
                    
                    <p hidden={resolved}>This error hasn't been resolved or was re-opened again. Check to resolve.</p>
                    
                    <Toggle checked={resolved} onChange={resolveHandler} />
                </div>
            </div>
        
        </section>
    );
};

export default Header;