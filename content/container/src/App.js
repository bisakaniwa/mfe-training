import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Progress } from '@material-ui/core'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
// import MarketingApp from './components/MarketingApp';
// import AuthApp from './components/AuthApp';
const MarketingLazy = lazy(() => import('./components/MarketingApp.js'));
const AuthLazy = lazy(() => import('./components/AuthApp.js'));
import Header from './components/Header';

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});

export default () => {
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth" component={AuthLazy} />
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                    <MarketingApp />
                </div>
            </StylesProvider>
        </BrowserRouter>
    )
};