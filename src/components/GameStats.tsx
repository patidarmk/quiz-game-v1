import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, Target, Star } from 'lucide-react';

interface GameStatsProps {
  score: number;
  streak: number;
  lives: number;
  maxLives: number;
  level: number;
  progress: number;
  lifelines: {
    fiftyFifty: boolean;
    askAudience: boolean;
    phoneFriend: boolean;
  };
}

export default function GameStats({
  score,
  streak,
  lives,
  maxLives,
  level,
  progress,
  lifelines
}: GameStatsProps) {
  const getLivesColor = (current: number, max: number) => {
    const ratio = current / max;
    if (ratio <= 0.3) return 'text-red-500';
    if (ratio <= 0.6) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold">Game Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Target className="text-blue-500" />
            <div>
              <div className="text-sm text-muted-foreground">Score</div>
              <div className="text-xl font-bold">{score}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Zap className="text-yellow-500" />
            <div>
              <div className="text-sm text-muted-foreground">Streak</div>
              <div className="text-xl font-bold">{streak}x</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Heart className={getLivesColor(lives, maxLives)} />
            <div>
              <div className="text-sm text-muted-foreground">Lives</div>
              <div className="text-xl font-bold">{lives}/{maxLives}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Star className="text-purple-500" />
            <div>
              <div className="text-sm text-muted-foreground">Level</div>
              <div className="text-xl font-bold">{level}</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="pt-2">
          <div className="text-sm text-muted-foreground mb-2">Lifelines</div>
          <div className="flex space-x-2">
            <Badge variant={lifelines.fiftyFifty ? "secondary" : "outline"} className="px-2 py-1">
              50/50 {lifelines.fiftyFifty && "✓"}
            </Badge>
            <Badge variant={lifelines.askAudience ? "secondary" : "outline"} className="px-2 py-1">
              Audience {lifelines.askAudience && "✓"}
            </Badge>
            <Badge variant={lifelines.phoneFriend ? "secondary" : "outline"} className="px-2 py-1">
              Friend {lifelines.phoneFriend && "✓"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}