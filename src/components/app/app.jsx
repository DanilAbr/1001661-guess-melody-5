import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {MAX_MISTAKE_COUNT} from '../../const';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import AuthScreen from '../auth-screen/auth-screen';
import GameOverScreen from '../game-over-screen/game-over-screen';
import WinScreen from '../win-screen/win-screen';
import PrivateRoute from '../private-route/private-route';
import GameScreen from '../game-screen/game-screen';


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"
          render={({history}) =>
            <WelcomeScreen
              onPlayButtonClick={() => history.push(`/game`)}
              errorsCount={MAX_MISTAKE_COUNT}
            />
          }
        />
        <Route
          exact
          path="/login"
          render={({history}) => (
            <AuthScreen
              onReplayButtonClick={() => history.push(`/game`)}
            />
          )}
        />
        <PrivateRoute
          exact
          path="/result"
          render={({history}) =>
            <WinScreen
              onReplayButtonClick={() => history.push(`/game`)}
            />
          }
        />
        <Route
          exact
          path="/lose"
          render={({history}) =>
            <GameOverScreen
              onReplayButtonClick={() => history.push(`/game`)}
            />
          }
        />
        <Route exact path="/game">
          <GameScreen
            errorsCount={MAX_MISTAKE_COUNT}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};


export default App;
