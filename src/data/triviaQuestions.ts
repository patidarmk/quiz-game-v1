export interface TriviaQuestion {
  id: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export const triviaCategories = [
  { id: 'history', name: 'History', icon: '🏛️', color: 'bg-amber-500' },
  { id: 'science', name: 'Science', icon: '🔬', color: 'bg-blue-500' },
  { id: 'sports', name: 'Sports', icon: '⚽', color: 'bg-green-500' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: 'bg-purple-500' },
  { id: 'geography', name: 'Geography', icon: '🌍', color: 'bg-teal-500' },
  { id: 'art', name: 'Art & Literature', icon: '🎨', color: 'bg-pink-500' },
];

export const triviaQuestions: TriviaQuestion[] = [
  // History Questions
  {
    id: 'hist1',
    category: 'history',
    difficulty: 'easy',
    question: 'In which year did World War II end?',
    options: ['1943', '1945', '1950', '1939'],
    correctAnswer: 1,
    explanation: 'World War II ended in 1945 with the surrender of Germany in May and Japan in August.'
  },
  {
    id: 'hist2',
    category: 'history',
    difficulty: 'medium',
    question: 'Who was the first President of the United States?',
    options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Benjamin Franklin'],
    correctAnswer: 2,
    explanation: 'George Washington served as the first President from 1789 to 1797.'
  },
  {
    id: 'hist3',
    category: 'history',
    difficulty: 'hard',
    question: 'The Treaty of Tordesillas divided newly discovered lands between which two countries?',
    options: ['Spain and Portugal', 'England and France', 'Spain and England', 'Portugal and Netherlands'],
    correctAnswer: 0,
    explanation: 'Signed in 1494, the Treaty of Tordesillas divided the world between Spain and Portugal along a meridian.'
  },
  
  // Science Questions
  {
    id: 'sci1',
    category: 'science',
    difficulty: 'easy',
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correctAnswer: 2,
    explanation: 'The chemical symbol for gold is Au, from the Latin word "aurum".'
  },
  {
    id: 'sci2',
    category: 'science',
    difficulty: 'medium',
    question: 'What is the powerhouse of the cell?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic Reticulum'],
    correctAnswer: 1,
    explanation: 'Mitochondria are known as the powerhouse of the cell because they generate most of the cell\'s supply of ATP.'
  },
  {
    id: 'sci3',
    category: 'science',
    difficulty: 'hard',
    question: 'What is the name of the phenomenon where light bends when passing through different mediums?',
    options: ['Reflection', 'Diffraction', 'Refraction', 'Interference'],
    correctAnswer: 2,
    explanation: 'Refraction is the bending of light as it passes from one medium to another with a different density.'
  },
  
  // Sports Questions
  {
    id: 'sport1',
    category: 'sports',
    difficulty: 'easy',
    question: 'In which sport would you perform a slam dunk?',
    options: ['Football', 'Basketball', 'Tennis', 'Baseball'],
    correctAnswer: 1,
    explanation: 'A slam dunk is a basketball move where a player jumps and scores by putting the ball directly through the hoop.'
  },
  {
    id: 'sport2',
    category: 'sports',
    difficulty: 'medium',
    question: 'Which country won the FIFA World Cup in 2018?',
    options: ['Germany', 'Brazil', 'France', 'Argentina'],
    correctAnswer: 2,
    explanation: 'France won the 2018 FIFA World Cup, defeating Croatia 4-2 in the final.'
  },
  {
    id: 'sport3',
    category: 'sports',
    difficulty: 'hard',
    question: 'Who holds the record for the most Grand Slam singles titles in tennis?',
    options: ['Serena Williams', 'Roger Federer', 'Rafael Nadal', 'Novak Djokovic'],
    correctAnswer: 3,
    explanation: 'Novak Djokovic holds the record with 24 Grand Slam singles titles as of 2023.'
  },
  
  // Entertainment Questions
  {
    id: 'ent1',
    category: 'entertainment',
    difficulty: 'easy',
    question: 'Which movie features the character Jack Sparrow?',
    options: ['Pirates of the Caribbean', 'The Lord of the Rings', 'Star Wars', 'Indiana Jones'],
    correctAnswer: 0,
    explanation: 'Captain Jack Sparrow is the main character in the Pirates of the Caribbean film series, played by Johnny Depp.'
  },
  {
    id: 'ent2',
    category: 'entertainment',
    difficulty: 'medium',
    question: 'Who wrote the novel "1984"?',
    options: ['Aldous Huxley', 'George Orwell', 'Ray Bradbury', 'Philip K. Dick'],
    correctAnswer: 1,
    explanation: 'George Orwell wrote "1984", a dystopian novel published in 1949.'
  },
  {
    id: 'ent3',
    category: 'entertainment',
    difficulty: 'hard',
    question: 'Which band released the album "Dark Side of the Moon"?',
    options: ['The Beatles', 'Led Zeppelin', 'Pink Floyd', 'The Rolling Stones'],
    correctAnswer: 2,
    explanation: 'Pink Floyd released "The Dark Side of the Moon" in 1973, one of the best-selling albums of all time.'
  },
  
  // Geography Questions
  {
    id: 'geo1',
    category: 'geography',
    difficulty: 'easy',
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 2,
    explanation: 'Paris is the capital and largest city of France.'
  },
  {
    id: 'geo2',
    category: 'geography',
    difficulty: 'medium',
    question: 'Which is the longest river in the world?',
    options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
    correctAnswer: 1,
    explanation: 'The Nile River is traditionally considered the longest river in the world at approximately 4,135 miles.'
  },
  {
    id: 'geo3',
    category: 'geography',
    difficulty: 'hard',
    question: 'Which country has the most time zones?',
    options: ['Russia', 'United States', 'China', 'France'],
    correctAnswer: 3,
    explanation: 'France has the most time zones (12) due to its overseas territories spread across the globe.'
  },
  
  // Art & Literature Questions
  {
    id: 'art1',
    category: 'art',
    difficulty: 'easy',
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
    correctAnswer: 2,
    explanation: 'Leonardo da Vinci painted the Mona Lisa between 1503 and 1506.'
  },
  {
    id: 'art2',
    category: 'art',
    difficulty: 'medium',
    question: 'Which Shakespeare play features the characters Rosencrantz and Guildenstern?',
    options: ['Hamlet', 'Macbeth', 'King Lear', 'Othello'],
    correctAnswer: 0,
    explanation: 'Rosencrantz and Guildenstern are characters in Shakespeare\'s "Hamlet", where they are childhood friends of the protagonist.'
  },
  {
    id: 'art3',
    category: 'art',
    difficulty: 'hard',
    question: 'Who composed the "Moonlight Sonata"?',
    options: ['Johann Sebastian Bach', 'Wolfgang Amadeus Mozart', 'Ludwig van Beethoven', 'Franz Schubert'],
    correctAnswer: 2,
    explanation: 'Beethoven composed the "Moonlight Sonata" (Piano Sonata No. 14) in 1801.'
  }
];

export const getQuestionsByCategory = (category: string) => {
  return triviaQuestions.filter(q => q.category === category);
};

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
  return triviaQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomQuestions = (count: number, category?: string) => {
  let questions = category 
    ? triviaQuestions.filter(q => q.category === category)
    : [...triviaQuestions];
  
  // Shuffle array
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  
  return questions.slice(0, count);
};