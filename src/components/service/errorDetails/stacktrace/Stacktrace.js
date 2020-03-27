import React, { useState } from 'react';

import Toggle from 'components/UI/toggle/Toggle';

import styling from './Stacktrace.module.scss';

const Stacktrace = ({ snippet, stacktrace, path, line }) => {
    const [showTrace, setShowTrace] = useState(false);
    
    const preparedSnippet = Object.keys(snippet).sort((a, b) => a - b);
    
    return (
        <section>
            <div className={styling.stacktrace}>
                <h4>Stacktrace</h4>
                
                <div>
                    <span>full stacktrace</span>
                    <Toggle checked={showTrace} onChange={() => setShowTrace(prevState => !prevState)} />
                </div>
            </div>
            
            <div className={styling.wrapper}>
                
                <ul className={styling.snippet} hidden={showTrace}>
                    {preparedSnippet.map(lineNumber => {
                        const style = (lineNumber === line) ? styling.error : '';
                        
                        return (
                            <li key={lineNumber}>
                                <div className={styling.number + ' ' + style}>{lineNumber}</div>
                                <div className={styling.code + ' ' + style}>{snippet[lineNumber]}</div>
                            </li>
                        );
                    })}
                </ul>
                
                <p hidden={!showTrace} className={styling.trace}>{stacktrace}</p>
                
                <div className={styling.info}><b>{path}</b> in line <b>{line}</b></div>
            
            </div>
        
        </section>
    );
};

export default Stacktrace;