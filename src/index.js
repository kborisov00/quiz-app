// runtime generator for async functions
import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line no-unused-vars

// modules
import Timer from './js/Timer';
// import Quiz from './js/Quiz';
import './styles/main.scss'; // styles

// timer constants
const INITIAL_TIME_SECONDS = 10;
const DECREMENT_VALUE_SECONDS = 1;

// eslint-disable-next-line no-unused-vars
const timer = new Timer(INITIAL_TIME_SECONDS, DECREMENT_VALUE_SECONDS); // eslint-disable-line max-len
