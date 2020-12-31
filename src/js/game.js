// modules
import Timer from './classes/Timer';
import Quiz from './classes/Quiz';
import nodes from './nodes';
import { timerConfig, quizConfig } from './config';

export default (() => {
  // eslint-disable-next-line no-unused-vars
  const timer = new Timer(timerConfig);

  // eslint-disable-next-line no-unused-vars
  const quiz = new Quiz(quizConfig);
  quiz.init(() => {
    const currentQuestion = quiz.getCurrentQuestion();
    const buttons = Array.from(nodes.buttonsNodes); // eslint-disable-line no-unused-vars
    const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    const shuffledAnswers = Quiz.shuffleArray(answers);

    nodes.questionNode.innerText = currentQuestion.question;

    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].innerText = shuffledAnswers[i];
    }
  });
})();
