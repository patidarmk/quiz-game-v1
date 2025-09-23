import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { triviaCategories } from '@/data/triviaQuestions';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export default function Categories() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-6xl py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Trivia Categories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a category to test your knowledge. Each quiz features 10 challenging questions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {triviaCategories.map((category) => (
            <Card 
              key={category.id} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{category.icon}</span>
                  <Badge variant="secondary">{category.name}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-3">{category.name}</CardTitle>
                <p className="text-muted-foreground mb-4">
                  Test your knowledge in {category.name.toLowerCase()} with our challenging questions.
                </p>
                <Link to="/game" search={{ category: category.id }}>
                  <Button className="w-full group">
                    Start Quiz
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Feeling Lucky?</h3>
              <p className="text-muted-foreground mb-4">
                Take on our mixed category challenge with questions from all topics!
              </p>
              <Link to="/game">
                <Button size="lg">
                  Random Challenge
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}