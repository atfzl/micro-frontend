import { css } from 'emotion';
import { createState, onCleanup } from 'solid-js';

function App() {
  const [state, setState] = createState({ counter: 0 });

  const intervalId = setInterval(() => {
    setState({ counter: state.counter + 1 });
  }, 1000);

  onCleanup(() => {
    clearInterval(intervalId);
  });

  return (
    <div
      className={css`
        height: 100%;
        width: 100%;
        background-color: papayawhip;
      `}
    >
      Solid Counter: {state.counter}
    </div>
  );
}

export default App;
