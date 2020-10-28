import {isGenreAnswerCorrect, isArtistAnswerCorrect} from '../game';
import {GameType} from '../const';


const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET_GAME: `RESET_GAME`,
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  REDIRECT_TO_ROUTE: `REDIRECT_TO_ROUTE`,
};

const incrementStep = () => ({
  type: ActionType.INCREMENT_STEP,
  payload: 1,
});

const resetGame = () => ({
  type: ActionType.RESET_GAME,
});

const incrementMistake = (question, userAnswer) => {
  let answerIsCorrect = false;

  switch (question.type) {
    case GameType.ARTIST:
      answerIsCorrect = isArtistAnswerCorrect(question, userAnswer);
      break;
    case GameType.GENRE:
      answerIsCorrect = isGenreAnswerCorrect(question, userAnswer);
      break;
  }

  return {
    type: ActionType.INCREMENT_MISTAKES,
    payload: answerIsCorrect ? 0 : 1,
  };
};

const loadQuestions = (questions) => ({
  type: ActionType.LOAD_QUESTIONS,
  payload: questions,
});

const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});

const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});


export {
  ActionType,
  incrementStep,
  resetGame,
  incrementMistake,
  loadQuestions,
  requireAuthorization,
  redirectToRoute,
};
