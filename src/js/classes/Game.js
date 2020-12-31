// modules
import Timer from './Timer';
import Quiz from './Quiz';
import nodes from '../nodes';
import { timerConfig, quizConfig } from '../config';

class Game {
  constructor(config) {
    this.nodes = config.nodes;

    this.quiz = new Quiz(quizConfig);
    this.timer = new Timer(timerConfig);

    this.currentQuestion = {};
  }

  setButtonsNodes() {
    const currentQuestion = this.quiz.getCurrentQuestion();
    const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    const buttons = this.nodes.buttonsNodes;
    const shuffledAnswers = Quiz.shuffleArray(answers);

    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].innerText = shuffledAnswers[i];
    }
  }

  setQuestionNode() {
    this.nodes.questionNode.innerText = this.currentQuestion.question;
    this.nodes.counterNode.innerText = `${this.currentQuestion.index + 1} / ${this.quiz.questions.length}`;
  }

  setTimeNode() {
    this.nodes.timeNode.innerText = this.timer.getInitialTime();
  }

  renderQuestion() {
    this.setQuestionNode();
    this.setButtonsNodes();
    this.setTimeNode();
  }

  init() {
    this.quiz.init(() => {
      this.currentQuestion = this.quiz.getCurrentQuestion();
      this.renderQuestion();
    });
  }
}

export default (() => {
  const game = new Game({
    nodes: nodes,
    quiz: Quiz,
    timer: Timer,
  });

  game.init();
})();
