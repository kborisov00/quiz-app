// modules
import nodes from '../nodes';

export default class Renderer {
  constructor(timer) {
    this.nodes = nodes;
    this.timer = timer;
  }

  /**
   * @desc this function shuffles the answers,
   * then uses them to modify the button nodes' text
   */
  setButtonsNodes(answers) {
    const buttons = this.nodes.buttonsNodes;
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].classList = 'button'; // reset classes
      buttons[i].innerText = answers[i];
    }
  }

  /**
   * @desc this function modifies 
   * question node's question counter's text
   */
  setQuestionNode(currentQuestion) {
    this.nodes.questionNode.innerText = currentQuestion.question;
    this.nodes.counterNode.innerText = `${currentQuestion.index + 1} / ${this.quiz.questions.length}`;
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
    console.log(this.timer.getInitialTime());
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
   * @desc this function disables every button
   * @param {boolean} isDisabled 
   */
  disableButtons(isDisabled) {
    for (let i = 0; i < this.nodes.buttonsNodes.length; i += 1) {
      this.nodes.buttonsNodes[i].disabled = isDisabled;
    }
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

  renderQuestion(currentQuestion, answers) {
    this.setButtonsNodes(answers);
    this.setQuestionNode(currentQuestion);
    this.setScoreNode();
  }
}
