import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, Bookmark } from "lucide-react";

interface NewsCardProps {
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

export const NewsCard = ({
  title,
  description,
  imageUrl,
  category,
  readTime,
  source,
  publishedAt,
  url,
  isBookmarked = false
}: NewsCardProps) => {
  return (
    <Card className="group overflow-hidden bg-card hover:bg-card-hover shadow-card hover:shadow-news transition-all duration-300 ease-smooth cursor-pointer border-0 animate-fade-in">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 ease-smooth"
        />
        <div className="absolute top-3 left-3">
          <Badge 
            variant="secondary" 
            className="bg-background/90 backdrop-blur-sm border-0 text-primary font-medium"
          >
            {category}
          </Badge>
        </div>
        <button className="absolute top-3 right-3 p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-background transition-colors">
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span className="font-medium text-primary">{source}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{readTime}</span>
          </div>
          <span>•</span>
          <span>{publishedAt}</span>
        </div>
        
        <h3 className="font-bold text-lg leading-tight text-card-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors">
            Read more
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
};