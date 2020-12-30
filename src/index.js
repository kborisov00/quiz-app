// runtime generator for async functions
import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line no-unused-vars

// modules
import Timer from './js/Timer';
// import Quiz from './js/Quiz';
import nodes from './js/nodes';
import './styles/main.scss'; // styles

// timer constants
const INITIAL_TIME_SECONDS = 3;
const DECREMENT_VALUE_SECONDS = 1;

// eslint-disable-next-line no-unused-vars
const timer = new Timer({
  initialTimeSeconds: INITIAL_TIME_SECONDS,
  decrementValueSeconds: DECREMENT_VALUE_SECONDS,
  timeNode: nodes.timeNode,
});

timer.startTimer(() => console.log('has finished'));
