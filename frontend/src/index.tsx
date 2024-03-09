import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { setupStore } from "./store/store";
import ErrorFallback from "./components/ui/ErrorFallback/ErrorFallback";
import MainLoader from "./components/ui/MainLoader/MainLoader";
import App from './App';
import './index.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = setupStore();

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<MainLoader/>}>
                    <App/>
                </Suspense>
            </ErrorBoundary>
        </BrowserRouter>
    </Provider>,
);


