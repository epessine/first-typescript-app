import express = require('express');
import { bmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const args = [
    String(req.query.height),
    String(req.query.weight)
  ];
  try {
    const result = bmi(args);
    res.send(result);
  } catch (e) {
    const result = {
      error: 'malformatted parameters'
    };
    res.send(result);
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});