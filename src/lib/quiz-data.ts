import type { Quiz, QuizTopic } from './types';

export const quizzes: Record<QuizTopic, Quiz> = {
  Algebra: {
    topic: 'Algebra',
    questions: [
      {
        id: 'alg1',
        question: 'What is the value of x in the equation 2x + 3 = 7?',
        options: ['1', '2', '3', '4'],
        correctAnswer: '2',
      },
      {
        id: 'alg2',
        question: 'Simplify the expression: (x^2)^3',
        options: ['x^5', 'x^6', 'x^8', '3x^2'],
        correctAnswer: 'x^6',
      },
      {
        id: 'alg3',
        question: 'What is the slope of the line y = 3x - 2?',
        options: ['3', '-2', '1', '0'],
        correctAnswer: '3',
      },
       {
        id: 'alg4',
        question: 'Factor the expression: x^2 - 4',
        options: ['(x-2)(x-2)', '(x+2)(x+2)', '(x-2)(x+2)', '(x-4)(x+1)'],
        correctAnswer: '(x-2)(x+2)',
      },
      {
        id: 'alg5',
        question: 'What is the value of 5! (5 factorial)?',
        options: ['25', '120', '60', '20'],
        correctAnswer: '120',
      },
      {
        id: 'alg6',
        question: 'Solve for x: 5(x + 2) = 30',
        options: ['2', '4', '6', '8'],
        correctAnswer: '4',
      },
      {
        id: 'alg7',
        question: 'What is the degree of the polynomial 3x^4 - 2x^2 + 5?',
        options: ['1', '2', '3', '4'],
        correctAnswer: '4',
      },
      {
        id: 'alg8',
        question: 'What is the solution to the system of equations: y = 2x and x + y = 3?',
        options: ['x=1, y=2', 'x=2, y=1', 'x=0, y=3', 'x=3, y=0'],
        correctAnswer: 'x=1, y=2',
      },
      {
        id: 'alg9',
        question: 'The sum of two numbers is 10 and their difference is 2. What are the numbers?',
        options: ['5 and 5', '6 and 4', '7 and 3', '8 and 2'],
        correctAnswer: '6 and 4',
      },
      {
        id: 'alg10',
        question: 'What is the value of log_10(100)?',
        options: ['1', '2', '10', '100'],
        correctAnswer: '2',
      },
    ],
  },
  Biology: {
    topic: 'Biology',
    questions: [
      {
        id: 'bio1',
        question: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Ribosome', 'Mitochondrion', 'Chloroplast'],
        correctAnswer: 'Mitochondrion',
      },
      {
        id: 'bio2',
        question: 'What is the process by which plants make their own food?',
        options: ['Respiration', 'Transpiration', 'Photosynthesis', 'Germination'],
        correctAnswer: 'Photosynthesis',
      },
      {
        id: 'bio3',
        question: 'Which of these is NOT a part of the DNA?',
        options: ['Guanine', 'Cytosine', 'Thymine', 'Uracil'],
        correctAnswer: 'Uracil',
      },
       {
        id: 'bio4',
        question: 'What is the largest organ in the human body?',
        options: ['Liver', 'Brain', 'Skin', 'Heart'],
        correctAnswer: 'Skin',
      },
      {
        id: 'bio5',
        question: 'How many chambers are in the human heart?',
        options: ['1', '2', '3', '4'],
        correctAnswer: '4',
      },
      {
        id: 'bio6',
        question: 'Which gas do plants absorb from the atmosphere?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        correctAnswer: 'Carbon Dioxide',
      },
      {
        id: 'bio7',
        question: 'What type of blood cell is responsible for fighting infections?',
        options: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'],
        correctAnswer: 'White blood cells',
      },
      {
        id: 'bio8',
        question: 'What is the scientific study of insects called?',
        options: ['Ornithology', 'Botany', 'Entomology', 'Ichthyology'],
        correctAnswer: 'Entomology',
      },
      {
        id: 'bio9',
        question: 'Which part of the plant absorbs water and nutrients from the soil?',
        options: ['Leaves', 'Stem', 'Flowers', 'Roots'],
        correctAnswer: 'Roots',
      },
      {
        id: 'bio10',
        question: 'Gregor Mendel is known as the father of what?',
        options: ['Genetics', 'Evolution', 'Anatomy', 'Taxonomy'],
        correctAnswer: 'Genetics',
      },
    ],
  },
  History: {
    topic: 'History',
    questions: [
      {
        id: 'his1',
        question: 'In what year did World War II end?',
        options: ['1943', '1945', '1950', '1939'],
        correctAnswer: '1945',
      },
      {
        id: 'his2',
        question: 'Who was the first President of the United States?',
        options: ['Abraham Lincoln', 'Thomas Jefferson', 'George Washington', 'John Adams'],
        correctAnswer: 'George Washington',
      },
      {
        id: 'his3',
        question: 'The Renaissance began in which country?',
        options: ['France', 'England', 'Spain', 'Italy'],
        correctAnswer: 'Italy',
      },
       {
        id: 'his4',
        question: 'Who wrote the "Declaration of Independence"?',
        options: ['Benjamin Franklin', 'Thomas Jefferson', 'John Hancock', 'George Washington'],
        correctAnswer: 'Thomas Jefferson',
      },
      {
        id: 'his5',
        question: 'The ancient city of Rome was built on how many hills?',
        options: ['Three', 'Five', 'Seven', 'Ten'],
        correctAnswer: 'Seven',
      },
      {
        id: 'his6',
        question: 'Which civilization built the Machu Picchu complex in Peru?',
        options: ['Aztec', 'Maya', 'Inca', 'Olmec'],
        correctAnswer: 'Inca',
      },
      {
        id: 'his7',
        question: 'The Battle of Waterloo was fought in which modern-day country?',
        options: ['France', 'Germany', 'Belgium', 'United Kingdom'],
        correctAnswer: 'Belgium',
      },
      {
        id: 'his8',
        question: 'Who was the famous queen of ancient Egypt?',
        options: ['Nefertiti', 'Hatshepsut', 'Cleopatra', 'Arsinoe'],
        correctAnswer: 'Cleopatra',
      },
      {
        id: 'his9',
        question: 'The Magna Carta was signed in what year?',
        options: ['1066', '1215', '1492', '1776'],
        correctAnswer: '1215',
      },
      {
        id: 'his10',
        question: 'Which empire was ruled by Genghis Khan?',
        options: ['Roman Empire', 'Ottoman Empire', 'Mongol Empire', 'Persian Empire'],
        correctAnswer: 'Mongol Empire',
      },
    ],
  },
};
