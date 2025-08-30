import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Menu, Bell, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onSearch: (query: string) => void;
  onAuthClick: () => void;
  isAuthenticated?: boolean;
  currentView: 'home' | 'personalized' | 'general';
  onViewChange: (view: 'home' | 'personalized' | 'general') => void;
}

export const Header = ({ 
  onSearch, 
  onAuthClick, 
  isAuthenticated = false,
  currentView,
  onViewChange 
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const navItems = [
    { id: 'home', label: 'Home', view: 'home' as const },
    { id: 'personalized', label: 'For You', view: 'personalized' as const },
    { id: 'general', label: 'Trending', view: 'general' as const },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary p-2 rounded-xl">
              <div className="w-6 h-6 bg-primary-foreground rounded-sm"></div>
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              NewsFlow
            </h1>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.view ? "default" : "ghost"}
                className={cn(
                  "font-medium transition-all duration-200",
                  currentView === item.view 
                    ? "bg-primary text-primary-foreground shadow-news" 
                    : "hover:bg-accent"
                )}
                onClick={() => onViewChange(item.view)}
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search news, topics, sources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background-secondary border-border focus:ring-primary"
              />
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-news-accent rounded-full"></span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <Button 
                onClick={onAuthClick}
                className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-news"
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden mt-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background-secondary border-border"
            />
          </form>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.view ? "default" : "ghost"}
                  className={cn(
                    "justify-start font-medium",
                    currentView === item.view && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => {
                    onViewChange(item.view);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};