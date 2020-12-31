import { apiConfig } from '../config';

export default class Quiz {
  constructor(config) {
    this.numberQuestions = config.numberQuestions;
    this.questionsType = config.questionsType;
    
    this.baseAPI = apiConfig.base;
    this.numberQuestionsQueryParam = apiConfig.numberQuestionsQueryParam;
    this.questionsTypeQueryParam = apiConfig.questionsTypeQueryParam;
  }

  createURL() {
    const url = new URL(this.baseAPI);
    url.searchParams.append(this.numberQuestionsQueryParam, this.numberQuestions);
    url.searchParams.append(this.questionsTypeQueryParam, this.questionsType);

    return url;
  }

  // async fetchQuestions() {
  //   const data = await fetch()
  // }

  // startQuiz() {}

  // previousQuestion() {}

  // nextQuestion() {}
}
