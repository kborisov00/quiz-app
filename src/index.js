// dependencies
import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line no-unused-vars

// modules
import Timer from './js/classes/Timer';
import Quiz from './js/classes/Quiz'; // eslint-disable-line no-unused-vars
import nodes from './js/nodes';
import './styles/main.scss'; // styles

import { timerConfig } from './js/config';

const timer = new Timer({
  initialTimeSeconds: timerConfig.INITIAL_TIME,
  decrementValueSeconds: timerConfig.DECREMENT_VALUE,
  timeNode: nodes.timeNode,
});

timer.startTimer(() => console.log('has finished'));
