import { useState } from "react";
import { Header } from "@/components/Header";
import { AuthModal } from "@/components/AuthModal";
import { FeedSection } from "@/components/FeedSection";
import { Button } from "@/components/ui/button";
import { TrendingUp, Heart, Search, Sparkles, Globe, Clock } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'personalized' | 'general'>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { currentLanguage, setCurrentLanguage } = useTranslation();

  // Mock data for articles
  const personalizedArticles = [
    {
      id: "1",
      title: "The Future of AI in Personalized Content Recommendation",
      description: "How machine learning algorithms are revolutionizing the way we discover and consume digital content across platforms.",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      category: "Technology",
      readTime: "5 min read",
      source: "TechCrunch",
      publishedAt: "2h ago",
      url: "#",
      isBookmarked: true
    },
    {
      id: "2", 
      title: "Breaking: Major Climate Summit Reaches Historic Agreement",
      description: "World leaders agree on unprecedented carbon reduction targets and renewable energy initiatives for the next decade.",
      imageUrl: "https://images.unsplash.com/photo-1569163139394-de44cb4e4834?w=400&h=250&fit=crop",
      category: "Environment",
      readTime: "7 min read",
      source: "Reuters",
      publishedAt: "4h ago",
      url: "#"
    },
    {
      id: "3",
      title: "Revolutionary Gene Therapy Shows Promise in Cancer Treatment",
      description: "New clinical trials demonstrate significant improvements in patient outcomes using targeted genetic interventions.",
      imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      category: "Health",
      readTime: "6 min read",
      source: "Nature Medicine",
      publishedAt: "6h ago",
      url: "#"
    }
  ];

  const generalArticles = [
    {
      id: "4",
      title: "Global Markets Rally as Economic Indicators Show Strong Growth",
      description: "International stock markets see significant gains following positive employment data and consumer confidence reports.",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
      category: "Finance",
      readTime: "4 min read",
      source: "Financial Times", 
      publishedAt: "1h ago",
      url: "#"
    },
    {
      id: "5",
      title: "Space Tourism Industry Reaches New Milestone",
      description: "Private space companies successfully complete record number of civilian flights, marking a turning point for commercial space travel.",
      imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=250&fit=crop",
      category: "Space",
      readTime: "8 min read",
      source: "Space News",
      publishedAt: "3h ago",
      url: "#"
    },
    {
      id: "6",
      title: "Breakthrough in Quantum Computing Achieved by Research Team",
      description: "Scientists demonstrate quantum supremacy in solving complex mathematical problems previously thought impossible.",
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop",
      category: "Science",
      readTime: "9 min read",
      source: "Science Daily",
      publishedAt: "5h ago",
      url: "#"
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality here
    console.log("Searching for:", query);
  };

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  if (currentView === 'personalized') {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Header 
          onSearch={handleSearch}
          onAuthClick={handleAuthClick}
          currentView={currentView}
          onViewChange={setCurrentView}
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
        />
        <main className="container mx-auto px-4 py-8">
          <FeedSection
            title="Your Personal Feed"
            subtitle="Curated content based on your interests and reading history"
            icon={<Heart className="w-6 h-6 text-news-accent" />}
            articles={personalizedArticles}
            type="personalized"
          />
        </main>
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>
    );
  }

  if (currentView === 'general') {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Header 
          onSearch={handleSearch}
          onAuthClick={handleAuthClick}
          currentView={currentView}
          onViewChange={setCurrentView}
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
        />
        <main className="container mx-auto px-4 py-8">
          <FeedSection
            title="Trending Now"
            subtitle="Most popular stories and breaking news from around the world"
            icon={<TrendingUp className="w-6 h-6 text-tech-accent" />}
            articles={generalArticles}
            type="general"
          />
        </main>
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>
    );
  }

  // Home view
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header 
        onSearch={handleSearch}
        onAuthClick={handleAuthClick}
        currentView={currentView}
        onViewChange={setCurrentView}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-news-accent-light/20 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-news-accent" />
              <span className="text-sm font-medium text-news-accent">AI-Powered News Curation</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
              Stay Informed with
              <br />
              Personalized News
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Discover articles, videos, and podcasts tailored to your interests. 
              Our AI analyzes your reading patterns to deliver the most relevant content.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={() => setCurrentView('personalized')}
                className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-premium px-8 py-3 text-lg font-medium"
              >
                <Heart className="w-5 h-5 mr-2" />
                Explore Your Feed
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCurrentView('general')}
                className="border-border hover:bg-accent px-8 py-3 text-lg font-medium"
              >
                <Globe className="w-5 h-5 mr-2" />
                Browse Trending
              </Button>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-news-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Sparkles className="w-6 h-6 text-news-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">AI-Powered</h3>
                <p className="text-muted-foreground">Smart algorithms learn your preferences to deliver personalized content recommendations.</p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-tech-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Clock className="w-6 h-6 text-tech-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Real-time Updates</h3>
                <p className="text-muted-foreground">Stay current with breaking news and trending topics from trusted sources worldwide.</p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Smart Search</h3>
                <p className="text-muted-foreground">Advanced search capabilities help you find exactly what you're looking for across all sources.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Index;