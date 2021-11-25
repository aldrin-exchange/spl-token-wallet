import React, { lazy, Suspense, useMemo } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Container, Wrapper } from './components/CommonStyledComponents';

const Welcome = lazy(() => import('./routes/Welcome'));

// const LOCAL_BUILD = window.location.href.includes('localhost');

export default function App() {
  // Disallow rendering inside an iframe to prevent clickjacking.
  if (window.self !== window.top) {
    return null;
  }

  return (
    <BrowserRouter>
      <Container>
        <Wrapper>
          <Suspense fallback={<div>Loading...</div>}>
            <Pages />
          </Suspense>
        </Wrapper>
      </Container>
    </BrowserRouter>
  );
}

export const Pages = () => {
  useMemo(() => {
    let params = new URLSearchParams(window.location.hash.slice(1));
    const origin = params.get('origin');
    const hash = window.location.hash;

    if (origin) {
      sessionStorage.setItem('origin', origin);
    } else {
      sessionStorage.removeItem('origin');
    }

    if (hash) {
      sessionStorage.setItem('hash', hash);
    } else {
      sessionStorage.removeItem('hash');
    }
  }, []);

  return (
    <>
      <Switch>
        <Route path="/welcome" component={Welcome} />

        {/* popup if connecting from dex UI */}
        {/* {window.opener && !!wallet && <Redirect from="/" to="/connect_popup" />} */}

        {/* if wallet exists - for case when we'll have unlocked wallet */}
        {/* {!!wallet && <Redirect from="/" to="/wallet" />} */}

        {/* if have mnemonic in localstorage - login, otherwise - restore/import/create */}
        <Redirect from="/" to="/welcome" />
      </Switch>
    </>
  );
};
