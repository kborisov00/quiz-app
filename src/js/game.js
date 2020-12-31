// modules
import Timer from './classes/Timer';
import Quiz from './classes/Quiz';
import { timerConfig, quizConfig } from './config';

export default (() => {
  const timer = new Timer(timerConfig);
  timer.startTimer((counter) => console.log(counter));

  // eslint-disable-next-line no-unused-vars
  const quiz = new Quiz(quizConfig);
})();
