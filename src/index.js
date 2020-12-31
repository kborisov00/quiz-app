// dependencies
import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line no-unused-vars

// modules
import Timer from './js/classes/Timer';
import Quiz from './js/classes/Quiz';
import nodes from './js/nodes';
import './styles/main.scss';

import { timerConfig, quizConfig } from './js/config';

const timer = new Timer(timerConfig);
timer.startTimer((counter) => console.log(counter));

// eslint-disable-next-line no-unused-vars
const quiz = new Quiz({
  questions: quizConfig.questions,
  questionNode: nodes.questionNode,
  quizAnswersNode: nodes.quizAnswersNode,
});
