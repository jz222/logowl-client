import React from 'react';
import { FiActivity, FiCheckCircle, FiChevronDown, FiChevronRight, FiChevronUp, FiClock, FiXCircle } from 'react-icons/fi';
import { IoIosFingerPrint } from 'react-icons/io';

import Toggle from 'components/UI/toggle/Toggle';
import Badge from 'components/UI/badge/Badge';

import utils from 'utils';

import styling from './Header.module.scss';

const Header = ({ type, message, evolution, fingerprint, count, createdAt, updatedAt, resolved, resolveHandler }) => {
    
    /**
     * Calculates if the error count increased, decreased or
     * remained the same over the last two occurrences.
     * @returns {*} JSX component that indicates the difference
     */
    const compareOccurrences = () => {
        const { difference } = utils.computeEvolution(evolution);
        
        let component = <div className={styling.neutral}><FiChevronRight /> 0%</div>;
        
        if (difference > 0) {
            component = <div className={styling.increase}><FiChevronUp /> {Math.abs(difference)}%</div>;
        }
        
        if (difference < 0) {
            component = <div className={styling.decrease}><FiChevronDown /> {Math.abs(difference)}%</div>;
        }
        
        return component;
    };
    
    return (
        <section className={styling.header}>
            
            <div className={styling.identity}>
                <Badge size='small' type='neutral'>{type}</Badge>
                
                <h2>{message}</h2>
                
                <div className={styling.label}>
                    <IoIosFingerPrint />
                    <span>{fingerprint}</span>
                </div>
                
                <div className={styling.label}>
                    <FiClock />
                    <span>Last seen: {new Date(updatedAt).toLocaleString()}</span>
                </div>
                
                <div className={styling.label}>
                    <FiActivity />
                    <span>Total occurrences: {count}</span>
                </div>
            </div>
            
            
            <div>
                <div className={styling.occurrence}>
                    <div>
                        <div className={styling.date}>{utils.getDate(createdAt)}</div>
                        <div className={styling.label}>first seen</div>
                    </div>
                    
                    <div>
                        <div className={styling.date}>{utils.getDate(updatedAt)}</div>
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
                    
                    <p hidden={!resolved}>This error has been marked as resolved. Uncheck on the right to re-open it.</p>
                    
                    <p hidden={resolved}>This error hasn't been resolved or was re-opened again. Check to mark as resolved.</p>
                    
                    <Toggle checked={resolved} onChange={resolveHandler} />
                </div>
            </div>
        
        </section>
    );
};

export default Header;