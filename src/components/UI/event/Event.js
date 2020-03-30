import React from 'react';
import { motion } from 'framer-motion';

import etalon from 'etalon';

import styling from './Event.module.scss';

const Event = (props) => <motion.li className={styling.event} layoutTransition={etalon.transition} {...props} />;

export default Event;