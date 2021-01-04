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

  /**
   * @desc this function creates
   * and returns an array with the
   * correct answer combined with
   * the incorrect ones
   * @return {array}
   */
  getQuestionAnswers() {
    return [
      ...this.quiz.getCurrentQuestion().incorrect_answers,
      this.quiz.getCurrentQuestion().correct_answer,
    ];
  }

  /**
   * @desc this function shuffles the answers,
   * then uses them to modify the button nodes
   */
  setButtonsNodes() {
    const buttons = this.nodes.buttonsNodes;
    const answers = this.getQuestionAnswers();
    const shuffledAnswers = Quiz.shuffleArray(answers);

    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].classList = 'button'; // reset classes
      buttons[i].innerText = shuffledAnswers[i];
    }
  }

  /**
   * @desc this function modifies 
   * question node's text and question counter's text
   */
  setQuestionNode() {
    this.nodes.questionNode.innerText = this.quiz.getCurrentQuestion().question;
    this.nodes.counterNode.innerText = `${this.quiz.getCurrentQuestion().index + 1} / ${this.quiz.questions.length}`;
  }

  /**
   * @desc this function switches
   * to the next question and renders it
   */
  nextQuestion() {
    this.quiz.nextQuestion();
    this.renderQuestion();
  }

  /**
   * @desc this function disables every button
   * @param {boolean} disabled 
   */
  disableButtons(isDisabled) {
    for (let i = 0; i < this.nodes.buttonsNodes.length; i += 1) {
      this.nodes.buttonsNodes[i].disabled = isDisabled;
    }
  }

  /**
   * @desc this functions checks and returns boolean
   * based on if the answer is correct or not
   * @param {node} clickedButton 
   */
  isCorrect(clickedButton) {
    return clickedButton.innerText === this.quiz.getCurrentQuestion().correct_answer;
  }

  /**
   * @desc this function adds modification
   * class to the node depending on
   * if the answer is correct
   * @param {node} clickedButton 
   * @param {boolean} isCorrect 
   */
  // eslint-disable-next-line class-methods-use-this
  setButtonState(clickedButton, isCorrect) {
    clickedButton.classList.add(isCorrect ? 'button--correct' : 'button--wrong');
  }

  /**
   * @desc this function sets the button state based on
   * if the clicked button is the correct one, disables
   * every button, then waits small amount of time,
   * renders the next question and enables the buttons again
   * @param {node} clickedButton 
   */
  handleButtonClick(clickedButton) {
    this.setButtonState(clickedButton, this.isCorrect(clickedButton));
    this.disableButtons(true);

    setTimeout(() => {
      this.nextQuestion();
      this.disableButtons(false);
    }, 2000);
  }

  /**
   * @desc this function adds
   * an event listener to every button
   */
  setButtonEventListeners() {
    const buttons = this.nodes.buttonsNodes;
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].addEventListener('click', () => this.handleButtonClick(buttons[i]), false);
    }
  }

  setTimeNode(time = this.timer.getInitialTime()) {
    this.nodes.timeNode.innerText = time;
  }

  handleTimer(time) {
    const timeWrapper = document.getElementById('timeWrapper'); // eslint-disable-line no-unused-vars
    this.setTimeNode(time);
  }

  /**
   * @desc this function renders the question
   */
  renderQuestion() {
    this.setQuestionNode();
    this.setButtonsNodes();
  }

  /**
   * @desc this functions is called
   * after quiz initialization
   * which means the questions
   * were fetched
   */
  handleInit() {
    this.setButtonEventListeners();
    this.renderQuestion();

    // this.timer.startTimer((time) => this.handleTimer(time));
  }

  /**
   * @desc initialization function
   */
  init() {
    this.quiz.init(() => this.handleInit());
  } 
}

export default (() => {
  const game = new Game({ nodes: nodes });
  game.init();
})();
