import * as React from 'react';
import './app.css';

function App() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
        padding: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        marginTop: 40,
      }}
    >
      <h2>This is Shell</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div id="solid-counter-module"></div>
        <div id="react-counter-module"></div>
      </div>
    </div>
  );
}

export default App;
