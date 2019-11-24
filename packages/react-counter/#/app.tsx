import * as React from 'react';

function App() {
  const [state, setState] = React.useState({ counter: 0 });

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setState({ counter: state.counter + 1 });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div
      style={{
        backgroundColor: 'pink',
        padding: 20,
      }}
    >
      React Counter: {state.counter}
    </div>
  );
}

export default App;
