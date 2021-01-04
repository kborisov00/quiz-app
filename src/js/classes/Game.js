// modules
import Renderer from './Renderer';
import Timer from './Timer';
import Quiz from './Quiz';

import nodes from '../nodes';
import { timerConfig, quizConfig, gameConfig } from '../config';

class Game {
  constructor() {
    this.nodes = nodes;

    this.quiz = new Quiz(quizConfig);
    this.timer = new Timer(timerConfig);
    this.renderer = new Renderer();

    this.score = 0;
    this.scoreIncrement = gameConfig.scoreIncrement;

    this.startTime = () => {
      this.timer.resetTime();
      this.timer.startTime((time) => this.handleTimer(time));
    };
    this.stopTime = () => this.timer.clearTime();
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
    // set score node
  }

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

  /**
   * @desc this function does stuff
   * @param {int} time 
   */
  handleTimer(time) {
    const timeWrapper = document.getElementById('timeWrapper'); // eslint-disable-line no-unused-vars
    this.renderer.setTimeNode(time);

    if (time === 0) {
      // window.location.reload();
    }
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
    const answers = this.quiz.getCurrentAnswers();
    const currentQuestion = this.quiz.getCurrentQuestion();

    this.startTime();
    this.renderer.renderQuestion(currentQuestion, answers);
    this.setButtonEventListeners();
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
