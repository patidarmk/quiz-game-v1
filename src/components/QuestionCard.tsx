import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TriviaQuestion } from '@/data/triviaQuestions';

interface QuestionCardProps {
  question: TriviaQuestion;
  selectedOption: number | null;
  onOptionSelect: (index: number) => void;
  showResult: boolean;
  isCorrect: boolean | null;
  disabled: boolean;
  timeLeft: number;
}

export default function QuestionCard({
  question,
  selectedOption,
  onOptionSelect,
  showResult,
  isCorrect,
  disabled,
  timeLeft
}: QuestionCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="border-2 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <Badge className={getDifficultyColor(question.difficulty)}>
              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </Badge>
            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium">Time:</div>
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold",
                timeLeft <= 5 ? "bg-red-500 text-white animate-pulse" : "bg-blue-100 text-blue-800"
              )}>
                {timeLeft}
              </div>
            </div>
          </div>
          <CardTitle className="text-xl md:text-2xl mt-4 text-left leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option, index) => {
            let buttonVariant: "default" | "secondary" | "destructive" | "outline" = "outline";
            let showIcon = false;
            
            if (showResult) {
              if (index === question.correctAnswer) {
                buttonVariant = "default";
                showIcon = true;
              } else if (index === selectedOption && selectedOption !== question.correctAnswer) {
                buttonVariant = "destructive";
                showIcon = true;
              }
            } else if (selectedOption === index) {
              buttonVariant = "secondary";
            }
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant={buttonVariant}
                  className={cn(
                    "w-full h-auto py-4 text-left justify-start text-base font-medium transition-all duration-200",
                    disabled && "cursor-not-allowed"
                  )}
                  onClick={() => !disabled && onOptionSelect(index)}
                  disabled={disabled}
                >
                  <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                  <span className="flex-1 text-left">{option}</span>
                  {showIcon && (
                    <span className="ml-2 text-xl">
                      {index === question.correctAnswer ? '✓' : '✗'}
                    </span>
                  )}
                </Button>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}