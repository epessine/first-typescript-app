/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { bmi } from './bmiCalculator';
import { exercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

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
    const result = { error: '' };
    if (e instanceof Error) {
      result.error = e.message;
    }
    res.send(result);
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
  const args = {
    daily_exercises,
    target
  };
  try {
    const result = exercises(args);
    res.send(result);
  } catch (e) {
    const result = { error: '' };
    if (e instanceof Error) {
      result.error = e.message;
    }
    res.send(result);
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});