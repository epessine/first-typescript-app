interface ExerciseInput {
  days: Array<number>,
  target: number
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseExerciseArguments = (args: Array<string>): ExerciseInput => {
  if (args.length < 4) throw new Error('Not enough arguments');

  args.slice(2).forEach(arg => {
    if (isNaN(Number(arg)))
      throw new Error('Provided values were not numbers!');
  });
  
  const days = args.map(arg => Number(arg)).slice(2, -1);
  const target = Number(args[args.length - 1]);

  return {
    days,
    target
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

try {
  const { days, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(days, target));
} catch (e) {
  console.log('Error, something bad happened: ', e.message);
}