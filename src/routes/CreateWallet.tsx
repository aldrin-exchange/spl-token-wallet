import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CreateWallet } from '../pages/CreateWallet/CreateWallet';

export default function CreateWalletRoute({ match }) {
    return (
        <Switch>
            <Route path={match.url} component={CreateWallet} />
        </Switch>
    );
}
