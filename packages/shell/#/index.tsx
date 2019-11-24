import App from '#/app';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

(window as any).MicroApp = {};

ReactDOM.render(<App />, document.getElementById('root')!);
