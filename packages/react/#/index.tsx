import * as React from 'react';
import { render } from 'react-dom';
import App from './app';

const renderApp = (target: HTMLElement) => {
  render(<App />, target);
};

Object.assign((window as any).MicroApp, {
  ReactCounter: {
    render: renderApp,
  },
});
