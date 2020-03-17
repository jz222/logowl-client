import React from 'react';
import { motion } from 'framer-motion';

import styling from './Event.module.scss';

const transition = {
    type: 'spring',
    damping: 20,
    stiffness: 400
};

const Event = (props) => <motion.li className={styling.event} layoutTransition={transition} {...props} />;

export default Event;