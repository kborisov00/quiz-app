// dependencies
import he from 'he';

// config
import { apiConfig } from '../config';

export default class Quiz {
  constructor(config) {
    this.numberQuestions = config.numberQuestions;
    this.questionsType = config.questionsType;

    this.baseAPI = apiConfig.base;
    this.numberQuestionsQueryParam = apiConfig.numberQuestionsQueryParam;
    this.questionsTypeQueryParam = apiConfig.questionsTypeQueryParam;

    this.questions = [];
    this.currentQuestion = null;
    this.url = this.createURL();

    this.init();
  }

  /**
   * @desc this function creates
   * a copy of the array, then 
   * performs the Durstenfeld shuffle algorithm
   * @return {array}
   * @param {array} array 
   */
  static shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
    }

    return shuffledArray;
  }

  /**
   * @desc this function
   * decodes html entities
   * @param {array} questions 
   */
  static parseQuestions(questions) {
    return questions.map((question) => {
      const parsedQuestion = { ...question };
      parsedQuestion.question = he.decode(parsedQuestion.question);
      parsedQuestion.correct_answer = he.decode(parsedQuestion.correct_answer);
      parsedQuestion.incorrect_answers.map((answer) => he.decode(answer));

      return parsedQuestion;
    });
  }

  /**
   * @desc this function creates the api endpoint url
   */
  createURL() {
    const url = new URL(this.baseAPI);
    url.searchParams.append(this.numberQuestionsQueryParam, this.numberQuestions);
    url.searchParams.append(this.questionsTypeQueryParam, this.questionsType);

    return url;
  }

  /**
   * @desc this function fetches
   * the questions, sets some properties
   * and returns an empty callback
   * @return {function}
   * @param {function} callback 
   */
  async fetchQuestions(callback) {
    const response = await fetch(this.url);
    const data = await response.json();

    if (response.status === 200) {
      const questions = this.constructor.parseQuestions(data.results);
      this.questions = questions;
      this.currentQuestion = questions[0];

      return callback();
    }

    throw new Error('something went wrong..');
  }

  /**
   * @desc this function changes
   * the current question to the
   * next one in the array
   */
  nextQuestion() {
    const currentIndex = this.questions.indexOf(this.currentQuestion);
    if (currentIndex < this.numberQuestions - 1) {
      this.currentQuestion = this.questions[currentIndex + 1];
    } else {
      throw new Error('no questions left');
    }
  }

  /**
   * @desc this function creates an object
   * with the current question, except
   * it adds an index property
   * @return {object}
   */
  getCurrentQuestion() {
    return { index: this.questions.indexOf(this.currentQuestion), ...this.currentQuestion };
  }

  /**
   * @desc this function creates
   * and returns a shuffled array with the
   * correct answer combined with
   * the incorrect ones
   */
  getCurrentAnswers() {
    const answers = [
      ...this.getCurrentQuestion().incorrect_answers,
      this.getCurrentQuestion().correct_answer,
    ];

    return this.constructor.shuffleArray(answers);
  }

  /**
   * @desc this function returns a callback when the questions are fetched
   * @param {function} callback 
   */
  init(callback) {
    this.fetchQuestions(() => typeof callback === 'function' && callback());
  }
}
