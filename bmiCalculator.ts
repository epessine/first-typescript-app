interface BmiInput {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): BmiInput => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100)**2;
  if (bmi <= 15) {
    return `Your BMI category is 'Very severely underweight' (${bmi})`;
  } else if (bmi > 15 && bmi <= 16) {
    return `Your BMI category is 'Severely underweight' (${bmi})`;
  } else if (bmi > 16 && bmi <= 18.5) {
    return `Your BMI category is 'Underweight (${bmi})`;
  } else if (bmi > 18.5 && bmi <= 25) {
    return `Your BMI category is 'Normal' (${bmi})`;
  } else if (bmi > 25 && bmi <= 30) {
    return `Your BMI category is 'Overweight' (${bmi})`;
  } else if (bmi > 30 && bmi <= 35) {
    return `Your BMI category is 'Moderately obese' (${bmi})`;
  } else if (bmi > 35 && bmi <= 40) {
    return `Your BMI category is 'Severely obese' (${bmi})`;
  } else if (bmi > 40) {
    return `Your BMI category is 'Very severely obese' (${bmi})`;
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error, something bad happened: ', e.message);
}