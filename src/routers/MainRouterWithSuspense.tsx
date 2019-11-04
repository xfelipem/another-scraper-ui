import React, { Suspense, lazy } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import AppRouterWithSuspense from './AppRouterWithSuspense';
import Loading from '../components/Loading';

const LandingPage = lazy(() => import('../pages/LandingPage'));

const MainRouterWithSuspense = (): JSX.Element | React.FunctionComponentElement<{ key: number; }> => {
  return (
    <Suspense fallback={Loading}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/app/*">
          <AppRouterWithSuspense />
        </Route>
        <Route exact path="/app" render={
          ({ location }) => (
            <Redirect to={{
              pathname: "/app/sources",
              state: { from: location }
            }}
            />
          )}
        />
      </Switch>
    </Suspense>
  );
}

export default MainRouterWithSuspense;