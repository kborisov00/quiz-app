export const timerConfig = {
  initialTimeSeconds: 10,
  decrementValueSeconds: 1,
};

export const quizConfig = {
  numberQuestions: 5,
  questionsType: 'multiple',
};

export const apiConfig = {
  base: 'https://opentdb.com/api.php',
  numberQuestionsQueryParam: 'amount',
  questionsTypeQueryParam: 'type',
};
