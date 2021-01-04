// modules
import Timer from './Timer';
import Quiz from './Quiz';
import nodes from '../nodes';
import { timerConfig, quizConfig, gameConfig } from '../config';

class Game {
  constructor(config) {
    this.nodes = config.nodes;

    this.quiz = new Quiz(quizConfig);
    this.timer = new Timer(timerConfig);

    this.score = 0;
    this.scoreIncrement = gameConfig.scoreIncrement;

    this.startTime = () => {
      this.timer.resetTime();
      this.timer.startTime((time) => this.handleTimer(time));
    };
    this.stopTime = () => this.timer.clearTime();
  }

  // getters

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

  // setters

  /**
   * @desc this function shuffles the answers,
   * then uses them to modify the button nodes' text
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
   * @desc this function modifies
   * the score node's text
   */
  setScoreNode() {
    this.nodes.scoreNode.innerText = this.score;
  }

  /**
   * @desc this function modifies time node's text
   * @param {int} time 
   */
  setTimeNode(time = this.timer.getInitialTime()) {
    this.nodes.timeNode.innerText = time;
  }

  /**
   * @desc this function adds modification
   * class to the node depending on
   * if the answer is correct
   * @param {node} clickedButton 
   * @param {boolean} isCorrect 
   */
  // eslint-disable-next-line class-methods-use-this
  setButtonState(clickedButton) {
    const isCorrect = this.isAnswerCorrect(clickedButton);
    clickedButton.classList.add(isCorrect ? 'button--correct' : 'button--wrong');
  }

  /**
   * @desc this function increments or
   * decrements the score based on if
   * the clicked button is the correct
   * one and then sets score node's text
   * @param {node} clickedButton 
   */
  setScore(clickedButton) {
    if (this.isAnswerCorrect(clickedButton)) {
      this.score += this.scoreIncrement;
    } else if (!this.isAnswerCorrect(clickedButton) && this.score > 0) {
      this.score -= this.scoreIncrement;
    }
    this.setScoreNode();
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

  // HANDLERS

  /**
   * @desc this starts the timer,
   * renders the next questions and
   * enables the buttons
   */
  handleQuestionTimeout() {
    this.startTime();
    this.nextQuestion();
    this.disableButtons(false);
  }

  /**
   * @desc this function stops the time,sets the button state based on
   * if the clicked button is the correct one or not, disables
   * every button, then waits small amount of time,
   * renders the next question and enables the buttons again
   * @param {node} clickedButton 
   */
  handleButtonClick(clickedButton) {
    this.stopTime();
    this.setButtonState(clickedButton); // set button correct or wrong state
    this.setScore(clickedButton);
    this.disableButtons(true);

    setTimeout(() => this.handleQuestionTimeout(), gameConfig.questionIntervalMilliseconds);
  }

  handleTimer(time) {
    const timeWrapper = document.getElementById('timeWrapper'); // eslint-disable-line no-unused-vars
    this.setTimeNode(time);

    if (time === 0) {
      // window.location.reload();
    }
  }

  // OTHER

  /**
   * @desc this function switches
   * to the next question and renders it
   */
  nextQuestion() {
    this.quiz.nextQuestion();
    this.renderQuestion();
  }

  /**
   * @desc this function renders everything on the page
   */
  renderQuestion() {
    this.setQuestionNode();
    this.setButtonsNodes();
    this.setScoreNode();
    this.setTimeNode();
  }

  /**
   * @desc this function disables every button
   * @param {boolean} isDisabled 
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
  isAnswerCorrect(clickedButton) {
    return clickedButton.innerText === this.quiz.getCurrentQuestion().correct_answer;
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
    this.startTime();
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
