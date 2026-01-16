import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-accent">
        <Bot className="w-4 h-4 text-accent-foreground" />
      </div>
      <div className="bg-chat-bot-bg rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1">
          <span
            className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-dot"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-dot"
            style={{ animationDelay: "0.2s" }}
          />
          <span
            className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-dot"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
