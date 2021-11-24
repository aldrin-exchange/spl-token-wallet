import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Welcome } from '../pages/Welcome/Welcome';

export default function HomepageRoute({ match }) {
    return (
        <Switch>
            <Route path={match.url} component={Welcome} />
        </Switch>
    );
}
