// modules
import Timer from './js/Timer';
import './styles/main.scss';

// timer constants
const INITIAL_TIME_SECONDS = 60;
const DECREMENT_VALUE_SECONDS = 1;

const timer = new Timer(INITIAL_TIME_SECONDS, DECREMENT_VALUE_SECONDS);
timer.init();
