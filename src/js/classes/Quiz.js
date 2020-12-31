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

  createURL() {
    const url = new URL(this.baseAPI);
    url.searchParams.append(this.numberQuestionsQueryParam, this.numberQuestions);
    url.searchParams.append(this.questionsTypeQueryParam, this.questionsType);

    return url;
  }

  async fetchQuestions(callback) {
    const response = await fetch(this.url);
    const data = await response.json();

    if (response.status === 200) {
      const questions = data.results;
      this.questions = questions;
      this.currentQuestion = questions[0];

      return callback();
    }
    
    throw new Error('something went wrong..');
  }

  prevQuestion() {
    const currentIndex = this.questions.indexOf(this.currentQuestion);
    if (currentIndex > 0) {
      this.currentQuestion = this.questions[currentIndex - 1];
    } else {
      throw new Error('This is the last question');
    }
  }

  nextQuestion() {
    const currentIndex = this.questions.indexOf(this.currentQuestion);
    if (currentIndex < this.numberQuestions - 1) {
      this.currentQuestion = this.questions[currentIndex + 1];
    } else {
      throw new Error('This is the last question');
    }
  }

  init() {
    this.fetchQuestions(() => {
      // questions are fetched
    });
  }
  // startQuiz() {}

  // previousQuestion() {}

  // nextQuestion() {}
}
