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
  }

  setButtonsNodes() {
    const currentQuestion = this.quiz.getCurrentQuestion();
    const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    const buttons = this.nodes.buttonsNodes;
    const shuffledAnswers = Quiz.shuffleArray(answers);

    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].classList = 'button';
      buttons[i].innerText = shuffledAnswers[i];
    }
  }

  setQuestionNode() {
    this.nodes.questionNode.innerText = this.quiz.getCurrentQuestion().question;
    this.nodes.counterNode.innerText = `${this.quiz.getCurrentQuestion().index + 1} / ${this.quiz.questions.length}`;
  }

  setTimeNode(time = this.timer.getInitialTime()) {
    this.nodes.timeNode.innerText = time;
  }

  nextQuestion() {
    this.quiz.nextQuestion();
    this.renderQuestion();
  }

  handleButtonClick(btn) {
    const hasCorrectAnswer = btn.innerText === this.quiz.getCurrentQuestion().correct_answer;
    btn.classList.add(hasCorrectAnswer ? 'button--correct' : 'button--wrong');

    setTimeout(() => this.nextQuestion(), 2000);
  }

  setButtonEventListeners() {
    const buttons = this.nodes.buttonsNodes;
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].addEventListener('click', () => this.handleButtonClick(buttons[i]), false);
    }
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
    //   timeWrapper.classList.add('statusbar__time--danger');
    // }
  }

  handleInit() {
    this.setButtonEventListeners();
    this.renderQuestion();

    // this.timer.startTimer((time) => this.handleTimer(time));
  }

  init() {
    this.quiz.init(() => this.handleInit());
  } 
       }

export default (() => { const game = new Game({ nodes: nodes, });
   
  game.init();
})();
