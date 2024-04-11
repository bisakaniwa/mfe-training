import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

// Mount function to start the app
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath],
    });

    if (onNavigate) {
        history.listen(onNavigate);
    };

    ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

    return {
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location;

            if (pathname !== nextPathname) {
                history.push(nextPathname);
            };
        },
    };
};

// If running in development and in isolation, call mount immediately
// Simplest of js to be able to communicate w/ diff frameworks
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');

    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    };
};

export { mount };