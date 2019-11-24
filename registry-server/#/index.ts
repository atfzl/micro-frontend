import * as express from 'express';

const app = express();
const PORT = 3046;

app.get('/', (__, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
