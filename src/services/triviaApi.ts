import axios from 'axios';

export interface TriviaQuestion {
  id: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

// Open Trivia Database API endpoint
const API_BASE_URL = 'https://opentdb.com/api.php';

// Map API categories to our categories
const categoryMap: Record<number, string> = {
  9: 'general',
  10: 'books',
  11: 'film',
  12: 'music',
  13: 'musicals',
  14: 'television',
  15: 'video_games',
  16: 'board_games',
  17: 'science',
  18: 'computers',
  19: 'mathematics',
  20: 'mythology',
  21: 'sports',
  22: 'geography',
  23: 'history',
  24: 'politics',
  25: 'art',
  26: 'celebrities',
  27: 'animals',
  28: 'vehicles',
  29: 'comics',
  30: 'gadgets',
  31: 'anime',
  32: 'cartoon'
};

// Map API difficulty to our difficulty
const difficultyMap: Record<string, 'easy' | 'medium' | 'hard'> = {
  'easy': 'easy',
  'medium': 'medium',
  'hard': 'hard'
};

export const fetchTriviaQuestions = async (amount: number = 10, category?: string): Promise<TriviaQuestion[]> => {
  try {
    // Build query parameters
    const params: Record<string, string | number> = {
      amount,
      type: 'multiple', // Only multiple choice questions
      encode: 'urlLegacy' // For proper decoding
    };
    
    // Add category if specified
    if (category) {
      // Find the category ID that matches our category
      const categoryId = Object.keys(categoryMap).find(
        key => categoryMap[Number(key)] === category
      );
      if (categoryId) {
        params.category = categoryId;
      }
    }
    
    const response = await axios.get(API_BASE_URL, { params });
    
    if (response.data.response_code !== 0) {
      throw new Error('Failed to fetch trivia questions');
    }
    
    // Transform API response to our format
    const questions: TriviaQuestion[] = response.data.results.map((q: any, index: number) => {
      // Decode HTML entities
      const question = decodeHtmlEntities(q.question);
      const correctAnswer = decodeHtmlEntities(q.correct_answer);
      const incorrectAnswers = q.incorrect_answers.map(decodeHtmlEntities);
      
      // Combine all options and shuffle
      const allOptions = [correctAnswer, ...incorrectAnswers];
      const shuffledOptions = shuffleArray([...allOptions]);
      
      // Find correct answer index
      const correctAnswerIndex = shuffledOptions.indexOf(correctAnswer);
      
      return {
        id: `q-${Date.now()}-${index}`,
        category: categoryMap[q.category] || 'general',
        difficulty: difficultyMap[q.difficulty] || 'medium',
        question,
        options: shuffledOptions,
        correctAnswer: correctAnswerIndex,
        explanation: 'Explanation not available for online questions'
      };
    });
    
    return questions;
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    // Fallback to local data if API fails
    throw error;
  }
};

// Helper function to decode HTML entities
const decodeHtmlEntities = (text: string): string => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};

// Helper function to shuffle array
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};