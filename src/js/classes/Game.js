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

  setTimeNode(time = this.timer.getInitialTime()) {
    this.nodes.timeNode.innerText = time;
  }

  renderQuestion() {
    this.setQuestionNode();
    this.setButtonsNodes();
    this.setTimeNode();
  }

  handleTimer(time) {
    const timeWrapper = document.getElementById('timeWrapper'); // eslint-disable-line no-unused-vars
    this.setTimeNode(time);
    
    // if (time < 5) {
    //   // timeWrapper.classList.add('statusbar__time--danger');
    // }
  }

  init() {
    this.quiz.init(() => {
      this.currentQuestion = this.quiz.getCurrentQuestion();
      this.renderQuestion();

      this.timer.startTimer((time) => this.handleTimer(time));
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
