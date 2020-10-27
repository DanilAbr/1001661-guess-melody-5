import {combineReducers} from 'redux';
import {gameProcess} from './game-process';
import {gameData} from './game-data';
import {user} from './user';


const NameSpace = {
  DATA: `DATA`,
  GAME: `GAME`,
  USER: `USER`,
};


export default combineReducers({
  [NameSpace.DATA]: gameData,
  [NameSpace.GAME]: gameProcess,
  [NameSpace.USER]: user,
});