import {loadQuestions, requireAuthorization, redirectToRoute} from './action';
import {AuthorizationStatus} from '../const';
import {AppRoute, APIRoute} from '../const';


const fetchQuestionList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.QUESTIONS)
    .then(({data}) => dispatch(loadQuestions(data)))
);


const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch((_err) => {
      // throw err;
      return false;
    })
);


const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.RESULT)))
);


export {fetchQuestionList, checkAuth, login};
