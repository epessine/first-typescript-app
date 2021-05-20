interface BmiInput {
  height: number;
  weight: number;
}

interface Output {
  weight: number,
  height: number,
  bmi: string
}

const parseBmiArguments = (args: Array<string>): BmiInput => {
  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      height: Number(args[0]),
      weight: Number(args[1])
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
  } else {
    return `Your BMI category is 'Very severely obese' (${bmi})`;
  }
};

export const bmi = (args: Array<string>): Output => {
  try {
    const { height, weight } = parseBmiArguments(args);
    return {
      weight,
      height,
      bmi: calculateBmi(height, weight)
    };
  } catch (e) {
    throw new Error('malformatted parameters');
  }
};