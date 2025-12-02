import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";

type Message = {
  from: "user" | "bot";
  text: string;
  isHtml?: boolean;
};

const SanaChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi, I’m Sana’s mini chatbot 👋 Ask me about her skills, experience, or projects!",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessages: Message[] = [...messages, { from: "user", text: trimmed }];

    const lower = trimmed.toLowerCase();
    let reply = "Apologies! I’m not equipped to respond to that.🙂";
    let isHtml = false;

    if (lower.includes("skills")) {
      reply =
        "Sana’s core skills include Data Analysis, Automation, Process Optimization, and Platform Governance.";
    } else if (lower.includes("experience") || lower.includes("cibc")) {
      reply = `
  You can view Sana’s complete work experience and career journey on her
  <a href="https://www.linkedin.com/in/sana-alia-b68147250"
     target="_blank"
     rel="noopener noreferrer"
     style="text-decoration: underline; color: #9bb8ff;">
     LinkedIn Profile
  </a>.
`;
isHtml = true;

    } else if (lower.includes("projects")) {
      reply =
        "Sana has worked on automation workflows, data dashboards, and full-stack course projects.";
    } else if (lower.includes("contact")) {
      reply =
        "You can reach Sana via LinkedIn – the links are in the top navigation and Contact section.";
    } else if (lower.includes("fun") || lower.includes("hobby") || lower.includes("free time") || lower.includes("hobbies")) {
      reply =
        "Outside of tech, Sana enjoys Badminton, Reading, Going for drives, and Exploring new tech trends.";
    }

    setMessages([...newMessages, { from: "bot", text: reply, isHtml }]);
    setInput("");
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
  onClick={() => setIsOpen(!isOpen)}
  aria-label="Open chat with Sana"
  className="
    fixed bottom-6 right-6 z-40 
    rounded-full
    px-5 py-3 
    shadow-xl 
    flex items-center gap-2
    transition-all
    bg-[#e7c79a]        /* Exact beige */
    text-[#2b2b2b]      /* Dark text */
    hover:bg-[#d8b789]  /* Slightly darker on hover */
    hover:shadow-[0_0_14px_rgba(231,199,154,0.45)]
    hover:translate-y-[-2px]
    active:scale-95
  "
>
  <MessageCircle className="w-5 h-5 text-[#2b2b2b]" />
  <span className="hidden md:inline text-sm font-medium">
    Chat with me
  </span>
</button>


      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-40 w-80 md:w-96 rounded-2xl bg-background/95 border border-border shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-border/60 flex justify-between items-center">
            <span className="font-semibold text-sm">Chat with Sana (bot)</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 px-3 py-3 space-y-2 max-h-80 overflow-y-auto text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-xl max-w-[80%] ${
                    m.from === "user"
                      ? "bg-primary text-secondary rounded-br-sm"
                      : "bg-secondary/60 text-foreground rounded-bl-sm"
                  }`}
                >
                  {m.isHtml ? (
                    <span dangerouslySetInnerHTML={{ __html: m.text }} />
                  ) : (
                    m.text
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="px-3 py-2 border-t border-border flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-background border border-border/60 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Ask about my skills, experience..."
            />
            <button
  onClick={handleSend}
  disabled={!input.trim()}
  className={`
    p-2 rounded-full transition-all
    ${input.trim()
      ? "bg-primary text-secondary hover:bg-primary/90 shadow-[0_0_8px_rgba(231,199,154,0.6)]"
      : "bg-primary/40 text-secondary/40 cursor-not-allowed"}
  `}
>
  <Send className="w-4 h-4" />
</button>

          </div>
        </div>
      )}
    </>
  );
};

export default SanaChatbot;
