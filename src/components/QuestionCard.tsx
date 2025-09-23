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

  // Robust HTML entity decoder
  const decodeHtmlEntities = (text: string): string => {
    const entities: Record<string, string> = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#039;': "'",
      '&apos;': "'",
      '&plus;': '+',
      '&percnt;': '%',
      '&equals;': '=',
      '&nbsp;': ' ',
      '&copy;': '©',
      '&reg;': '®',
      '&trade;': '™',
      '&euro;': '€',
      '&pound;': '£',
      '&yen;': '¥',
      '&cent;': '¢',
      '&deg;': '°',
      '&sup2;': '²',
      '&sup3;': '³',
      '&frac14;': '¼',
      '&frac12;': '½',
      '&frac34;': '¾',
      '&times;': '×',
      '&divide;': '÷',
      '&ndash;': '–',
      '&mdash;': '—',
      '&hellip;': '…',
      '&lsquo;': '‘',
      '&rsquo;': '’',
      '&ldquo;': '"',
      '&rdquo;': '"',
      '&laquo;': '«',
      '&raquo;': '»',
      '&iexcl;': '¡',
      '&iquest;': '¿'
    };

    let decoded = text;
    Object.entries(entities).forEach(([entity, char]) => {
      decoded = decoded.replace(new RegExp(entity, 'g'), char);
    });

    // Handle numeric entities like &#43; or &#37;
    decoded = decoded.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
    decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));

    return decoded;
  };

  const decodedQuestion = decodeHtmlEntities(question.question);
  const decodedOptions = question.options.map(option => decodeHtmlEntities(option));

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
          <div className="mt-4">
            <CardTitle className="text-xl md:text-2xl text-left leading-relaxed break-words">
              {decodedQuestion}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {decodedOptions.map((option, index) => {
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