import { useState, useEffect } from 'react';
import { TriviaQuestion, fetchTriviaQuestions } from '@/services/triviaApi';
import { triviaQuestions as fallbackQuestions } from '@/data/triviaQuestions';

export const useTriviaQuestions = (count: number = 10, category?: string) => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const fetchedQuestions = await fetchTriviaQuestions(count, category);
        setQuestions(fetchedQuestions);
      } catch (err) {
        console.error('Failed to fetch online questions, using fallback:', err);
        setError('Using fallback questions due to network issue');
        
        // Use fallback questions with category filter if needed
        let fallback = [...fallbackQuestions];
        if (category) {
          fallback = fallback.filter(q => q.category === category);
        }
        
        // Shuffle and take requested count
        const shuffled = [...fallback].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, count));
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [count, category]);

  return { questions, loading, error };
};