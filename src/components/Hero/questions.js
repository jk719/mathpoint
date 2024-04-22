// questions.js
const questionsByGrade = {
    1: [
      { id: 1000, question: "What is 2 + 3?", options: ["5", "4", "3", "6"], answer: "5" },
      { id: 1001, question: "What number comes after 6?", options: ["7", "5", "8", "6"], answer: "7" },
      { id: 1002, question: "How many sides does a square have?", options: ["4", "3", "5", "6"], answer: "4" },
      { id: 1003, question: "What is 5 + 3 - 4?", options: ["4", "3", "2", "5"], answer: "4" },
      { id: 1004, question: "What is 10 - 7?", options: ["2", "3", "4", "5"], answer: "3" }
    ],
    2: [
      { id: 2000, question: "What is 4 x 2?", options: ["6", "8", "10", "12"], answer: "8" },
      { id: 2001, question: "What is half of 14?", options: ["5", "6", "7", "8"], answer: "7" },
      { id: 2002, question: "Which number is even?", options: ["1", "3", "4", "5"], answer: "4" },
      { id: 2003, question: "What shape has no corners?", options: ["Circle", "Triangle", "Square", "Rectangle"], answer: "Circle" },
      { id: 2004, question: "How many months are in a year?", options: ["10", "12", "24", "30"], answer: "12" }
    ],
    3: [
      { id: 3000, question: "What is 8 / 4?", options: ["1", "2", "3", "4"], answer: "2" },
      { id: 3001, question: "What is 25% of 100?", options: ["15", "20", "25", "30"], answer: "25" },
      { id: 3002, question: "Which number is a multiple of 9?", options: ["27", "29", "30", "31"], answer: "27" },
      { id: 3003, question: "What is the correct spelling of the number 8?", options: ["Eigth", "Eight", "Ait", "Ate"], answer: "Eight" },
      { id: 3004, question: "What is the perimeter of a rectangle with length 5 and width 3?", options: ["16", "15", "14", "12"], answer: "16" }
    ],
    4: [
      { id: 4000, question: "What is the area of a square with side length 6?", options: ["36", "12", "18", "24"], answer: "36" },
      { id: 4001, question: "What is the product of 7 and 9?", options: ["63", "56", "72", "49"], answer: "63" },
      { id: 4002, question: "What is the largest two-digit prime number?", options: ["97", "95", "93", "91"], answer: "97" },
      { id: 4003, question: "What is the next number in the pattern: 2, 4, 8, 16?", options: ["18", "20", "32", "64"], answer: "32" },
      { id: 4004, question: "Which fraction is equivalent to 1/2?", options: ["2/4", "2/5", "3/6", "3/5"], answer: "2/4" }
    ],
    5: [
      { id: 5000, question: "What is the common factor of 15 and 25?", options: ["3", "5", "7", "9"], answer: "5" },
      { id: 5001, question: "What is 3^3 (three cubed)?", options: ["6", "9", "27", "81"], answer: "27" },
      { id: 5002, question: "What decimal is equivalent to 1/4?", options: ["0.2", "0.25", "0.5", "0.75"], answer: "0.25" },
      { id: 5003, question: "Which geometric shape has exactly five sides?", options: ["Pentagon", "Hexagon", "Octagon", "Decagon"], answer: "Pentagon" },
      { id: 5004, question: "What is the volume of a cube with side length 3?", options: ["9", "18", "27", "36"], answer: "27" }
    ],
    6: [
        { id: 6000, question: "Calculate the product of 7 and 8.", options: ["54", "56", "49", "63"], answer: "56" },
        { id: 6001, question: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: "6" },
        { id: 6002, question: "What is 50% of 100?", options: ["50", "100", "25", "75"], answer: "50" },
        { id: 6003, question: "What is the next prime number after 11?", options: ["12", "13", "14", "15"], answer: "13" },
        { id: 6004, question: "Solve: 20 - (6 + 2)", options: ["10", "12", "14", "16"], answer: "12" }
      ],
      7: [
        { id: 7000, question: "Simplify: 49 / (7^2).", options: ["7", "1", "49", "0"], answer: "1" },
        { id: 7001, question: "What is the value of x in the equation 3x = 12?", options: ["3", "4", "5", "6"], answer: "4" },
        { id: 7002, question: "What is the area of a triangle with base 10 cm and height 4 cm?", options: ["20", "40", "60", "80"], answer: "20" },
        { id: 7003, question: "Which of the following is a composite number?", options: ["2", "3", "5", "4"], answer: "4" },
        { id: 7004, question: "Convert 20% to a decimal.", options: ["2", "0.2", "0.02", "0.002"], answer: "0.2" }
      ],
      8: [
        { id: 8000, question: "Simplify: (4^2) * (4^3).", options: ["64", "256", "1024", "4096"], answer: "1024" },
        { id: 8001, question: "Solve for y: 2y + 6 = 14", options: ["4", "8", "5", "3"], answer: "4" },
        { id: 8002, question: "Find the circumference of a circle with a radius of 3. (Use π = 3.14)", options: ["18.84", "9.42", "6.28", "28.26"], answer: "18.84" },
        { id: 8003, question: "Which operation should be performed first according to the order of operations? 3 + 4 * 2", options: ["Addition", "Subtraction", "Multiplication", "Division"], answer: "Multiplication" },
        { id: 8004, question: "What is the median of the following numbers: 3, 8, 9, 5, 4?", options: ["5", "4", "6", "7"], answer: "5" }
      ],
      9: [
        { id: 9000, question: "Solve the quadratic equation x^2 - 5x + 6 = 0", options: ["1 and 6", "2 and 3", "3 and 2", "1 and 5"], answer: "2 and 3" },
        { id: 9001, question: "Find the slope of the line that passes through the points (2, 3) and (4, 7)", options: ["2", "3", "1", "4"], answer: "2" },
        { id: 9002, question: "What is the angle sum of a pentagon?", options: ["360 degrees", "180 degrees", "540 degrees", "720 degrees"], answer: "540 degrees" },
        { id: 9003, question: "Calculate the area of a circle with a radius of 5 cm. (Use π = 3.14)", options: ["78.5", "31.4", "157", "62.8"], answer: "78.5" },
        { id: 9004, question: "If f(x) = 2x + 3, find f(-1).", options: ["1", "5", "-1", "0"], answer: "1" }
      ],
      10: [
        { id: 10000, question: "If f(x) = 2x^2 + 3x - 5, find f(3).", options: ["22", "24", "26", "28"], answer: "28" },
        { id: 10001, question: "What is the value of x in the equation x/2 - 2 = 8?", options: ["16", "18", "20", "22"], answer: "20" },
        { id: 10002, question: "Simplify: (x^2 - 4)/(x - 2).", options: ["x + 2", "x - 2", "x + 4", "x - 4"], answer: "x + 2" },
        { id: 10003, question: "What is the sum of interior angles of a hexagon?", options: ["720 degrees", "360 degrees", "540 degrees", "180 degrees"], answer: "720 degrees" },
        { id: 10004, question: "Which is a rational number?", options: ["sqrt(2)", "3.14", "2/3", "pi"], answer: "2/3" }
      ],
      11: [
        { id: 11000, question: "Simplify: sqrt(12) * sqrt(3)", options: ["sqrt(36)", "sqrt(9)", "sqrt(15)", "6"], answer: "6" },
        { id: 11001, question: "If log3(x) = 4, what is x?", options: ["81", "64", "49", "12"], answer: "81" },
        { id: 11002, question: "What is the derivative of f(x) = 3x^2 + 7x - 5?", options: ["6x + 7", "6x + 5", "9x + 7", "3x + 7"], answer: "6x + 7" },
        { id: 11003, question: "Evaluate the integral of f(x) = 3x from x = 0 to x = 4.", options: ["12", "24", "36", "48"], answer: "24" },
        { id: 11004, question: "What is the inverse function of f(x) = 2x + 3?", options: ["(x-3)/2", "(x+3)/2", "(x/2) + 3", "(x/2) - 3"], answer: "(x-3)/2" }
      ],
      12: [
        { id: 12000, question: "Calculate the derivative of f(x) = x^3 - 4x^2 + x - 4", options: ["3x^2 - 8x + 1", "3x^2 - 4x + 1", "3x^2 - 8x - 1", "x^2 - 8x + 1"], answer: "3x^2 - 8x + 1" },
        { id: 12001, question: "Evaluate the integral of f(x) = 2x from x = 0 to x = 4", options: ["16", "8", "4", "2"], answer: "16" },
        { id: 12002, question: "If f(x) = x^2 and g(x) = x + 3, find (f o g)(2)", options: ["25", "16", "13", "11"], answer: "25" },
        { id: 12003, question: "What is the standard form of the equation of a circle with a center at (3, -4) and radius 5?", options: ["(x-3)^2 + (y+4)^2 = 25", "(x+3)^2 + (y-4)^2 = 25", "(x-3)^2 + (y+4)^2 = 5", "(x+3)^2 + (y-4)^2 = 5"], answer: "(x-3)^2 + (y+4)^2 = 25" },
        { id: 12004, question: "Simplify the expression: (8x^3 y^2) / (4xy)", options: ["2x^2y", "2xy", "4x^2y", "4xy"], answer: "2x^2y" }
      ],
  };
  
  export const getQuestionsForGrade = (grade) => {
    return questionsByGrade[grade] || []; // Return an empty array if no questions for the grade
  };
  