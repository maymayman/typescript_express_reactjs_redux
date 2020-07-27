import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';

import App from './components/App';
import Html from './components/Html';

const scripts = ['/public/bundle.js']; // ['vendor.js', 'client.js'];

export const getAppMarkup = ({
  url,
  store
}: {
  url: string;
  store: any;
}): string =>
  ReactDOMServer.renderToString(
    <StaticRouter location={url} context={{}}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );

export const getHtml = ({
  appMarkup,
  initialState
}: {
  appMarkup: string;
  initialState: any;
}): string =>
  ReactDOMServer.renderToStaticMarkup(
    <Html children={appMarkup} scripts={scripts} initialState={initialState} />
  );
