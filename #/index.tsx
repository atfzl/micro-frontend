import App from '#/app';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

(window as any).MicroApp = {};

ReactDOM.render(<App />, document.getElementById('root')!);

async function loadModule(src: string, target: HTMLElement) {
  await loadScript(src);
  (window as any).MicroApp.Solid.render(target);
}
loadModule(
  'http://localhost:8081/bundle.js',
  document.getElementById('solid-module')!,
);

function loadScript(src: string) {
  return new Promise(resolve => {
    const scriptElement = document.createElement('script');
    scriptElement.src = src;
    scriptElement.onload = () => {
      resolve();
      scriptElement.remove();
    };
    document.body.appendChild(scriptElement);
  });
}
