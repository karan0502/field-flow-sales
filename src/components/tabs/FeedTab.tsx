import { useState } from "react";
import { SwipeableCard } from "../SwipeableCard";
import { FloatingActionButton } from "../FloatingActionButton";
import { ScrollArea } from "../ui/scroll-area";

export function FeedTab() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sarah Johnson",
      avatarUrl: "https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMGF2YXRhcnxlbnwxfHx8fDE3NTc5MzI4MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      content: "Just finished implementing a new swipe gesture for our mobile app! The user feedback has been incredible. Swipe left to delete, right to favorite. Simple but effective! 🚀",
      time: "2m",
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      author: "Alex Chen",
      avatarUrl: "",
      content: "Working on a new design system component library. The goal is to make mobile interfaces more consistent and accessible. Here's what I've learned about bottom navigation patterns...",
      time: "15m",
      likes: 12,
      comments: 3
    },
    {
      id: 3,
      author: "Maria Rodriguez",
      avatarUrl: "",
      content: "Hot take: Floating action buttons should only be used for the PRIMARY action on a screen. Too many apps use them for secondary actions and it creates visual clutter.",
      time: "1h",
      likes: 67,
      comments: 18
    },
    {
      id: 4,
      author: "David Park",
      avatarUrl: "",
      content: "Just shipped our new mobile navigation. We moved from a hamburger menu to bottom tabs and saw a 40% increase in feature discovery. Sometimes the obvious choice is the right choice.",
      time: "2h",
      likes: 89,
      comments: 22
    },
    {
      id: 5,
      author: "Emma Wilson",
      avatarUrl: "",
      content: "Reminder: Your app should work perfectly with one hand. Test your designs while holding a coffee, walking, or commuting. Real-world usage is very different from desktop testing.",
      time: "4h",
      likes: 156,
      comments: 34
    },
    {
      id: 6,
      author: "James Thompson",
      avatarUrl: "",
      content: "Cards are having a moment in mobile design, but remember: they need to earn their visual weight. Each card should contain related, actionable content.",
      time: "6h",
      likes: 43,
      comments: 12
    }
  ]);

  const handleDelete = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleNewPost = () => {
    const newPost = {
      id: Date.now(),
      author: "You",
      avatarUrl: "",
      content: "This is a new post created with the floating action button! This demonstrates how FABs can be used for primary creation actions.",
      time: "now",
      likes: 0,
      comments: 0
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="pb-20">
      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="space-y-3 p-4">
          {posts.map((post) => (
            <SwipeableCard
              key={post.id}
              author={post.author}
              avatarUrl={post.avatarUrl}
              content={post.content}
              time={post.time}
              likes={post.likes}
              comments={post.comments}
              onDelete={() => handleDelete(post.id)}
            />
          ))}
          
          {posts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No posts yet. Tap the + button to create one!</p>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <FloatingActionButton onClick={handleNewPost} />
    </div>
  );
}