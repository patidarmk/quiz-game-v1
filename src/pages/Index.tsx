import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MadeWithApplaa } from '@/components/made-with-applaa';
import { Play, Trophy, Users, Zap, Clock, HelpCircle } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            TriviaMaster
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Challenge your knowledge with our exciting trivia game. Test yourself across multiple categories, use lifelines, and climb the leaderboard!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link to="/game">
              <Button size="lg" className="text-lg px-8 py-6">
                <Play className="mr-2 h-6 w-6" />
                Quick Play
              </Button>
            </Link>
            <Link to="/categories">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Trophy className="mr-2 h-6 w-6" />
                Choose Category
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Game Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-blue-500 mb-3" />
              <CardTitle>Multiple Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Test your knowledge in History, Science, Sports, Entertainment, Geography, and Art & Literature.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <HelpCircle className="h-10 w-10 text-green-500 mb-3" />
              <CardTitle>Lifeline System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Use 50/50, Ask the Audience, or Phone a Friend when you're stuck on a tough question.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Clock className="h-10 w-10 text-purple-500 mb-3" />
              <CardTitle>Timer Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Race against time to answer questions and earn bonus points for quick responses.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Trophy className="h-10 w-10 text-yellow-500 mb-3" />
              <CardTitle>Streak Bonuses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Build your streak to earn multiplier bonuses and climb to the top of the leaderboard.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-red-500 mb-3" />
              <CardTitle>Multiplayer Battles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Challenge friends in real-time trivia battles and prove who's the ultimate trivia master.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Play className="h-10 w-10 text-indigo-500 mb-3" />
              <CardTitle>Daily Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                New daily quizzes with special rewards to keep you coming back for more knowledge.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="container mx-auto px-4 pb-16">
        <Card className="max-w-3xl mx-auto text-center">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Test Your Knowledge?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of players challenging themselves with our trivia quizzes every day.
            </p>
            <Link to="/game">
              <Button size="lg">
                Start Playing Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      
      <MadeWithApplaa />
    </div>
  );
}