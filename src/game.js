const isArtistAnswerCorrect = (question, userAnswer) => {
  return userAnswer.artist === question.song.artist;
};

const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((item, index) => {
    return item === (question.answers[index].genre === question.genre);
  });
};


export {
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
};
