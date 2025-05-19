// Grade 2 NY Math Curriculum Questions
// Each question includes distractors based on common misconceptions

// Define types for our NY questions
interface BaseNYQuestion {
  id: string;
  standard: string;
  prompt: string;
}

// Multiple choice question interface
interface MultipleChoiceNYQuestion extends BaseNYQuestion {
  options: string[];
  correctIndex: number;
  openEnded?: undefined;
}

// Open-ended question interface
interface OpenEndedNYQuestion extends BaseNYQuestion {
  openEnded: true;
  options?: undefined;
  correctIndex?: undefined;
}

// Union type for all question types
export type NYQuestion = MultipleChoiceNYQuestion | OpenEndedNYQuestion;

// Application format question types
interface BaseQuestion {
  id: string;
  standard: string;
  prompt: string;
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctIndex: number;
}

interface OpenEndedQuestion extends BaseQuestion {
  type: 'open-ended';
}

export type Question = MultipleChoiceQuestion | OpenEndedQuestion;

// The actual question data
const nyGrade2Questions: NYQuestion[] = [
  {"id":"2.OA.1a-001","standard":"NY-2.OA.1a","prompt":"Sam had 43 marbles. He lost some marbles and now has 27. How many marbles did Sam lose?","options":["16","14","20","70"],"correctIndex":0},
  {"id":"2.OA.1b-001","standard":"NY-2.OA.1b","prompt":"Tom had 28 apples. He picked 17 more and then gave 12 to a friend. How many apples does Tom have now?","options":["33","41","23","45"],"correctIndex":0},
  {"id":"2.OA.2a-001","standard":"NY-2.OA.2a","prompt":"What is 9 + 8? (Solve mentally.)","options":["17","15","18","19"],"correctIndex":0},
  {"id":"2.OA.2b-001","standard":"NY-2.OA.2b","prompt":"What is 6 + 7?","options":["13","12","14","15"],"correctIndex":0},
  {"id":"2.OA.3a-001","standard":"NY-2.OA.3a","prompt":"Is 11 an even number or an odd number?","options":["Odd","Even","Prime","Composite"],"correctIndex":0},
  {"id":"2.OA.3b-001","standard":"NY-2.OA.3b","prompt":"Write an equation that shows 14 as the sum of two equal addends.","options":["7 + 7 = 14","6 + 6 = 12","8 + 8 = 16","5 + 9 = 14"],"correctIndex":0},
  {"id":"2.OA.4-001","standard":"NY-2.OA.4","prompt":"A garden has 3 rows of tomato plants with 4 plants in each row. How many tomato plants are there in all?","options":["12","7","16","24"],"correctIndex":0},
  {"id":"2.NBT.1-001","standard":"NY-2.NBT.1","prompt":"In the number 582, what digit is in the hundreds place?","options":["5","8","2","50"],"correctIndex":0},
  {"id":"2.NBT.2-001","standard":"NY-2.NBT.2","prompt":"When counting by 10s, what number comes right after 260?","options":["270","261","360","268"],"correctIndex":0},
  {"id":"2.NBT.3-001","standard":"NY-2.NBT.3","prompt":"Write the number four hundred sixteen in numerals.","options":["416","461","406","410"],"correctIndex":0},
  {"id":"2.NBT.4-001","standard":"NY-2.NBT.4","prompt":"Which number is greater, 567 or 576?","options":["576","567","657","556"],"correctIndex":0},
  {"id":"2.NBT.5-001","standard":"NY-2.NBT.5","prompt":"What is 48 + 37?","options":["85","95","75","86"],"correctIndex":0},
  {"id":"2.NBT.6-001","standard":"NY-2.NBT.6","prompt":"Add: 14 + 26 + 35 + 15","options":["90","80","89","91"],"correctIndex":0},
  {"id":"2.NBT.7-001","standard":"NY-2.NBT.7","prompt":"What is 614 − 275?","options":["339","349","329","439"],"correctIndex":0},
  {"id":"2.NBT.8-001","standard":"NY-2.NBT.8","prompt":"What is 700 − 100?","options":["600","500","650","610"],"correctIndex":0},
  {"id":"2.NBT.9-001","standard":"NY-2.NBT.9","prompt":"Explain why 30 + 70 = 100 using place value.","openEnded":true},
  {"id":"2.MD.1-001","standard":"NY-2.MD.1","prompt":"Which tool would you use to measure the length of a classroom door: a ruler, a meter stick, or a thermometer?","options":["Meter stick","Ruler","Thermometer","String"],"correctIndex":0},
  {"id":"2.MD.2-001","standard":"NY-2.MD.2","prompt":"A table is 1 meter long. About how many centimeters is that?","options":["100","10","1000","120"],"correctIndex":0},
  {"id":"2.MD.3-001","standard":"NY-2.MD.3","prompt":"Which is the best estimate for the length of a pencil: 7 cm, 70 cm, or 700 cm?","options":["7 cm","70 cm","5 m","700 cm"],"correctIndex":0},
  {"id":"2.MD.4-001","standard":"NY-2.MD.4","prompt":"A yellow crayon is 15 cm long and a blue crayon is 9 cm long. How much longer is the yellow crayon?","options":["6","24","5","4"],"correctIndex":0},
  {"id":"2.MD.5-001","standard":"NY-2.MD.5","prompt":"A piece of ribbon is 45 cm long. Tina cuts off 12 cm. How long is the ribbon now?","options":["33","57","32","30"],"correctIndex":0},
  {"id":"2.MD.6-001","standard":"NY-2.MD.6","prompt":"What is the sum of 28 and 15? (Show it on a number line if helpful.)","options":["43","42","53","38"],"correctIndex":0},
  {"id":"2.MD.7-001","standard":"NY-2.MD.7","prompt":"If the minute hand is on the 3 and the hour hand is just past 5, what time is it?","options":["5:15","3:25","5:03","6:15"],"correctIndex":0},
  {"id":"2.MD.8-001","standard":"NY-2.MD.8","prompt":"How much money is 3 quarters, 1 dime, and 2 pennies?","options":["0.87","0.85","0.92","0.60"],"correctIndex":0},
  {"id":"2.MD.9-001","standard":"NY-2.MD.9","prompt":"Sophie measured three worms as 4 cm, 6 cm, and 5 cm. How many worms are 5 cm or longer?","options":["2","1","3","0"],"correctIndex":0},
  {"id":"2.MD.10-001","standard":"NY-2.MD.10","prompt":"A picture graph shows 2 apples, 5 bananas, and 3 oranges. How many more bananas than apples are there?","options":["3","1","2","5"],"correctIndex":0},
  {"id":"2.G.1-001","standard":"NY-2.G.1","prompt":"Draw a quadrilateral with four right angles. What is the name of this shape?","options":["Rectangle","Triangle","Pentagon","Rhombus"],"correctIndex":0},
  {"id":"2.G.2-001","standard":"NY-2.G.2","prompt":"Partition a rectangle into 2 rows and 5 columns of equal squares. How many squares are there?","options":["10","7","12","25"],"correctIndex":0},
  {"id":"2.G.3-001","standard":"NY-2.G.3","prompt":"If you cut a circle into 3 equal shares, what is each share called?","options":["One third","One half","One quarter","One fourth"],"correctIndex":0}
];

/**
 * Maps a NY question object to a common format used by the application
 * @param {NYQuestion} nyQuestion - NY curriculum question object
 * @returns {Question} Question in application format
 */
const mapNYQuestionToQuestion = (nyQuestion: NYQuestion): Question => {
  // If it's an open-ended question
  if ('openEnded' in nyQuestion && nyQuestion.openEnded) {
    return {
      id: nyQuestion.id,
      standard: nyQuestion.standard,
      type: 'open-ended',
      prompt: nyQuestion.prompt,
    };
  }
  
  // For multiple choice questions
  return {
    id: nyQuestion.id,
    standard: nyQuestion.standard,
    type: 'multiple-choice',
    prompt: nyQuestion.prompt,
    options: (nyQuestion as MultipleChoiceNYQuestion).options,
    correctIndex: (nyQuestion as MultipleChoiceNYQuestion).correctIndex
  };
};

// Export both the raw questions and the mapping function
export const nyGrade2QuestionsRaw = nyGrade2Questions;
export const getFormattedNYGrade2Questions = (): Question[] => nyGrade2Questions.map(mapNYQuestionToQuestion);
export default nyGrade2Questions;
