import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Home, Trophy, Users, Calendar, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🧠</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TriviaMaster
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Button>
            </Link>
            <Link to="/categories">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Trophy className="w-4 h-4" />
                <span>Categories</span>
              </Button>
            </Link>
            <Link to="/game">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Multiplayer</span>
              </Button>
            </Link>
            <Link to="/game">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Challenges</span>
              </Button>
            </Link>
            <Link to="/game">
              <Button variant="ghost" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Button>
            </Link>
          </nav>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">Sign In</Button>
            <Button size="sm">Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  );
}