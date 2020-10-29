import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {GameType, MAX_MISTAKE_COUNT, AppRoute} from '../../const';
import Mistakes from '../mistakes/mistakes';
import {incrementMistake, incrementStep, resetGame} from '../../store/action';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';

import artistQuestionProp from '../artist-question-screen/artist-question.prop';
import genreQuestionProp from '../genre-question-screen/genre-question.prop';

import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player';
import withUserAnswer from '../../hocs/with-user-answer/with-user-answer';
import {getQuestions} from '../../store/reducrers/game-data/selectors';
import {getMistakes, getStep} from '../../store/reducrers/game-process/selectors';

const GenreQuestionScreenWrapped = withAudioPlayer(withUserAnswer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);


const GameScreen = (props) => {
  const {questions, step, onUserAnswer, mistakes} = props;
  const question = questions[step];

  if (mistakes >= MAX_MISTAKE_COUNT) {
    return <Redirect to={AppRoute.LOSE} />;
  }

  if (step >= questions.length || !question) {
    return <Redirect to={AppRoute.RESULT} />;
  }

  switch (question.type) {
    case GameType.ARTIST:
      return (
        <ArtistQuestionScreenWrapped
          key={step}
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </ArtistQuestionScreenWrapped>
      );
    case GameType.GENRE:
      return (
        <GenreQuestionScreenWrapped
          key={step}
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </GenreQuestionScreenWrapped>
      );
  }

  return <Redirect to={AppRoute.ROOT} />;
};


GameScreen.propTypes = {
  questions: PropTypes.arrayOf(
      PropTypes.oneOfType([
        artistQuestionProp,
        genreQuestionProp
      ]).isRequired
  ),
  step: PropTypes.number.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: getStep(state),
  mistakes: getMistakes(state),
  questions: getQuestions(state),
});

const mapDispatchToProps = (dispatch) => ({
  resetGameAction() {
    dispatch(resetGame());
  },
  onUserAnswer(question, answer) {
    dispatch(incrementStep());
    dispatch(incrementMistake(question, answer));
  },
});


export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
