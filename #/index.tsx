import App from '#/app';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

(window as any).MicroApp = {};

ReactDOM.render(<App />, document.getElementById('root')!);

loadModule(
  'http://localhost:8081/bundle.js',
  document.getElementById('solid-counter-module')!,
  'SolidCounter',
);

loadModule(
  'http://localhost:8082/bundle.js',
  document.getElementById('react-counter-module')!,
  'ReactCounter',
);

async function loadModule(
  src: string,
  target: HTMLElement,
  moduleName: string,
) {
  await loadScript(src);
  (window as any).MicroApp[moduleName].render(target);
  console.info(`Module: ${moduleName} loaded successfully`);
}

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
