interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

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
  } else if (percentCompleted > 0.6) {
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

const days = [2.1, 3, 0, 1, 1.5];
const target = 2;

console.log(calculateExercises(days, target));