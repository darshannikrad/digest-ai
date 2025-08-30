import { NewsCard } from "./NewsCard";
import { Button } from "@/components/ui/button";
import { RefreshCw, Filter, TrendingUp, Heart } from "lucide-react";
import { useState } from "react";

interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  readTime: string;
  source: string;
  publishedAt: string;
  url: string;
  isBookmarked?: boolean;
}

interface FeedSectionProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  articles: Article[];
  type: 'personalized' | 'general';
}

export const FeedSection = ({ title, subtitle, icon, articles, type }: FeedSectionProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {icon}
            <div>
              <h2 className="text-2xl font-bold text-foreground">{title}</h2>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="border-border hover:bg-accent"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="border-border hover:bg-accent"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div 
            key={article.id} 
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <NewsCard {...article} />
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button 
          variant="outline" 
          className="border-border hover:bg-accent px-8"
        >
          Load More Articles
        </Button>
      </div>
    </div>
  );
};