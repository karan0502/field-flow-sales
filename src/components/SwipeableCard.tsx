import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Share, Trash2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface SwipeableCardProps {
  author: string;
  avatarUrl?: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
  onDelete?: () => void;
}

export function SwipeableCard({ 
  author, 
  avatarUrl, 
  content, 
  time, 
  likes, 
  comments, 
  onDelete 
}: SwipeableCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [swipeX, setSwipeX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX.current;
    setSwipeX(Math.max(-100, Math.min(0, diffX)));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (swipeX < -50) {
      setSwipeX(-80);
    } else {
      setSwipeX(0);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (swipeX < 0) setSwipeX(0);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [swipeX]);

  return (
    <div className="relative overflow-hidden">
      {/* Delete action behind card */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-destructive flex items-center justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-destructive-foreground p-2"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Main card */}
      <Card
        ref={cardRef}
        className="transform transition-transform duration-200"
        style={{ transform: `translateX(${swipeX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium">{author}</span>
                <span className="text-muted-foreground text-sm">·</span>
                <span className="text-muted-foreground text-sm">{time}</span>
              </div>
            </div>
          </div>
          
          <p className="mb-4">{content}</p>
          
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 p-1 ${isLiked ? "text-red-500" : "text-muted-foreground"}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              <span className="text-sm">{likes + (isLiked ? 1 : 0)}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground p-1">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{comments}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground p-1 ml-auto">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}