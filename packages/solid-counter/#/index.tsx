import { render } from 'solid-js/dom';
import App from './app';

const renderApp = (target: HTMLElement) => {
  render(() => <App />, target);
};

Object.assign((window as any).MicroApp, {
  SolidCounter: {
    render: renderApp,
  },
});
