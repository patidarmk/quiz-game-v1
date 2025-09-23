import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSearch } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import QuestionCard from '@/components/QuestionCard';
import GameStats from '@/components/GameStats';
import LifelineButton from '@/components/LifelineButton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { RotateCcw, Users, Clock, HelpCircle } from 'lucide-react';
import { useTriviaQuestions } from '@/hooks/useTriviaQuestions';

const GAME_DURATION = 30; // seconds per question

export default function Game() {
  const navigate = useNavigate();
  const search = useSearch();
  const { toast } = useToast();
  
  // Get category from URL search params
  const category = typeof search === 'object' && 'category' in search 
    ? search.category as string 
    : undefined;
  
  // Fetch questions using our custom hook
  const { questions, loading, error } = useTriviaQuestions(10, category);
  
  // Game state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [maxLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Lifelines
  const [lifelines, setLifelines] = useState({
    fiftyFifty: false,
    askAudience: false,
    phoneFriend: false
  });
  
  // 50/50 lifeline state
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  
  // Show error toast if using fallback
  useEffect(() => {
    if (error) {
      toast({
        title: "Network Issue",
        description: error,
        variant: "destructive"
      });
    }
  }, [error, toast]);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  // Timer effect
  useEffect(() => {
    if (loading || !currentQuestion || showResult || gameOver) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQuestion, showResult, gameOver, loading]);
  
  const handleTimeUp = () => {
    toast({
      title: "Time's up!",
      description: "You ran out of time!",
      variant: "destructive"
    });
    handleWrongAnswer();
  };
  
  const handleOptionSelect = (index: number) => {
    if (showResult || selectedOption !== null) return;
    
    setSelectedOption(index);
    const correct = index === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      const points = (currentQuestion.difficulty === 'easy' ? 10 : 
                     currentQuestion.difficulty === 'medium' ? 20 : 30) * (streak + 1);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      
      if (streak > 0 && (streak + 1) % 3 === 0) {
        toast({
          title: "Streak Bonus!",
          description: `You earned a streak bonus! +${Math.floor(points * 0.5)} points`,
        });
        setScore(prev => prev + Math.floor(points * 0.5));
      }
    } else {
      handleWrongAnswer();
    }
    
    // Move to next question after delay
    setTimeout(() => {
      if (correct) {
        if (currentQuestionIndex < questions.length - 1) {
          nextQuestion();
        } else {
          finishGame();
        }
      }
    }, 2000);
  };
  
  const handleWrongAnswer = () => {
    setStreak(0);
    setLives(prev => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        setGameOver(true);
        toast({
          title: "Game Over!",
          description: `Your final score: ${score}`,
          variant: "destructive"
        });
      }
      return newLives;
    });
  };
  
  const nextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedOption(null);
    setShowResult(false);
    setIsCorrect(null);
    setTimeLeft(GAME_DURATION);
    setEliminatedOptions([]);
    
    // Level up every 3 questions
    if ((currentQuestionIndex + 1) % 3 === 0) {
      setLevel(prev => prev + 1);
      toast({
        title: "Level Up!",
        description: `You've reached level ${level + 1}!`,
      });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };
  
  const finishGame = () => {
    setGameOver(true);
    setShowConfetti(true);
    toast({
      title: "Congratulations!",
      description: `You completed the quiz with ${score} points!`,
    });
  };
  
  // Lifeline functions
  const useFiftyFifty = () => {
    if (lifelines.fiftyFifty || !currentQuestion) return;
    
    const correctIndex = currentQuestion.correctAnswer;
    const incorrectOptions = currentQuestion.options
      .map((_, index) => index)
      .filter(index => index !== correctIndex);
    
    // Randomly eliminate 2 incorrect options
    const shuffled = [...incorrectOptions].sort(() => 0.5 - Math.random());
    const toEliminate = shuffled.slice(0, 2);
    
    setEliminatedOptions(toEliminate);
    setLifelines(prev => ({ ...prev, fiftyFifty: true }));
    toast({
      title: "50/50 Used",
      description: "Two incorrect options have been eliminated",
    });
  };
  
  const useAskAudience = () => {
    if (lifelines.askAudience || !currentQuestion) return;
    
    setLifelines(prev => ({ ...prev, askAudience: true }));
    
    // Simulate audience poll results
    const correctIndex = currentQuestion.correctAnswer;
    const pollResults: number[] = Array(currentQuestion.options.length).fill(0);
    
    // Give higher percentage to correct answer
    pollResults[correctIndex] = 50 + Math.floor(Math.random() * 30);
    
    // Distribute remaining percentage among other options
    let remaining = 100 - pollResults[correctIndex];
    for (let i = 0; i < pollResults.length; i++) {
      if (i !== correctIndex) {
        const share = Math.floor(remaining / (pollResults.length - 1));
        pollResults[i] = share;
        remaining -= share;
      }
    }
    
    // Add any remaining to first non-correct option
    if (remaining > 0) {
      for (let i = 0; i < pollResults.length; i++) {
        if (i !== correctIndex) {
          pollResults[i] += remaining;
          break;
        }
      }
    }
    
    toast({
      title: "Audience Poll Results",
      description: pollResults.map((percent, index) => 
        `${String.fromCharCode(65 + index)}: ${percent}%`
      ).join(', '),
    });
  };
  
  const usePhoneFriend = () => {
    if (lifelines.phoneFriend || !currentQuestion) return;
    
    setLifelines(prev => ({ ...prev, phoneFriend: true }));
    
    // Simulate friend's advice (70% chance of correct answer)
    const isCorrectGuess = Math.random() > 0.3;
    const friendAnswer = isCorrectGuess 
      ? currentQuestion.correctAnswer 
      : Math.floor(Math.random() * currentQuestion.options.length);
    
    toast({
      title: "Friend's Advice",
      description: `Your friend thinks the answer is: ${String.fromCharCode(65 + friendAnswer)}`,
    });
  };
  
  const restartGame = () => {
    window.location.reload();
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading questions from online database...</p>
        </div>
      </div>
    );
  }
  
  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-6 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't load any trivia questions. Please try again later.
          </p>
          <Button onClick={() => navigate({ to: '/' })}>
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }
  
  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
        <Card className="w-full max-w-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {lives > 0 ? "Congratulations!" : "Game Over!"}
          </h2>
          <div className="space-y-4 mb-6">
            <div className="text-4xl font-bold text-blue-600">{score}</div>
            <p className="text-muted-foreground">
              {lives > 0 
                ? "You completed the quiz!" 
                : "Better luck next time!"}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-100 p-3 rounded-lg">
                <div className="text-2xl font-bold">{level}</div>
                <div className="text-sm text-muted-foreground">Level</div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <div className="text-2xl font-bold">{streak}</div>
                <div className="text-sm text-muted-foreground">Best Streak</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <Button onClick={restartGame} className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              Play Again
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate({ to: '/' })}
              className="w-full"
            >
              Back to Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  
  const progress = ((currentQuestionIndex) / questions.length) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <div className="container mx-auto max-w-6xl py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Stats Sidebar */}
          <div className="lg:col-span-1">
            <GameStats
              score={score}
              streak={streak}
              lives={lives}
              maxLives={maxLives}
              level={level}
              progress={progress}
              lifelines={lifelines}
            />
            
            {/* Lifelines Section */}
            <Card className="mt-6 p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <HelpCircle className="mr-2 h-4 w-4" />
                Lifelines
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <LifelineButton
                  icon="50"
                  label="50/50"
                  description="Eliminate two wrong answers"
                  onClick={useFiftyFifty}
                  used={lifelines.fiftyFifty}
                  disabled={showResult}
                />
                <LifelineButton
                  icon="👥"
                  label="Audience"
                  description="See what the audience thinks"
                  onClick={useAskAudience}
                  used={lifelines.askAudience}
                  disabled={showResult}
                />
                <LifelineButton
                  icon="📞"
                  label="Friend"
                  description="Get advice from a friend"
                  onClick={usePhoneFriend}
                  used={lifelines.phoneFriend}
                  disabled={showResult}
                />
              </div>
            </Card>
          </div>
          
          {/* Main Game Area */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="mb-4 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{timeLeft}s</span>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {currentQuestion && (
                <QuestionCard
                  key={currentQuestion.id}
                  question={{
                    ...currentQuestion,
                    options: currentQuestion.options.filter((_, index) => 
                      !eliminatedOptions.includes(index)
                    )
                  }}
                  selectedOption={selectedOption}
                  onOptionSelect={handleOptionSelect}
                  showResult={showResult}
                  isCorrect={isCorrect}
                  disabled={showResult}
                  timeLeft={timeLeft}
                />
              )}
            </AnimatePresence>
            
            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                onClick={() => navigate({ to: '/' })}
              >
                Quit Game
              </Button>
              
              {showResult && (
                <Button
                  onClick={() => {
                    if (currentQuestionIndex < questions.length - 1) {
                      nextQuestion();
                    } else {
                      finishGame();
                    }
                  }}
                >
                  {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Game"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}