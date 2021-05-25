interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Output {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Args {
  daily_exercises: Array<number>,
  target: number
}

const parseExercisesArguments = (args: Args) => {
  const { daily_exercises, target } = args;
  const parsed_daily = daily_exercises.map(n => {
    if (isNaN(Number(n))) {
      throw new Error('malformatted parameters');
    }
    return Number(n);
  });
  if (isNaN(Number(target)))
    throw new Error('malformatted parameters');
  const parsed_target = Number(target);
  return {
    daily_exercises: parsed_daily,
    target: parsed_target
  };
};

const calculateExercises = (days: Array<number>, originalTarget: number): Result => {
  let rating: number, ratingDescription: string;
  const periodLength = days.length;
  const trainingDays = days.filter(day => day !== 0).length;
  const success = 
    days.filter(day => day < originalTarget).length !== 0
      ? false
      : true;
  const target = originalTarget;
  const average = days.reduce((a, b) => a + b) / days.length;
  const percentCompleted = days.filter(day => day >= originalTarget).length / days.length;
  if (percentCompleted <= 0.3) {
    rating = 3;
    ratingDescription = 'bad! shame on you!';
  } else if (percentCompleted > 0.3 && percentCompleted <= 0.6) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'very good! keep going!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

export const exercises = (args: Args): Output => {
  try {
    const { daily_exercises, target } = parseExercisesArguments(args);
    return calculateExercises(daily_exercises, target);
  } catch (e) {
    throw new Error('malformatted parameters');
  }
};