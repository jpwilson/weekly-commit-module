"use client";

import { useState, useRef, useEffect } from "react";
import { AgentMessage } from "@/types";
import { AGENT_SUGGESTIONS } from "@/lib/agent-system-prompt";
import { v4 as uuidv4 } from "uuid";

// Client-side agent that uses pattern matching for responses
// In production, this would call an API route that uses OpenRouter
function generateAgentResponse(userMessage: string): {
  content: string;
  suggestions: string[];
} {
  const lower = userMessage.toLowerCase();

  // Jailbreak detection
  const jailbreakPatterns = [
    "ignore previous",
    "ignore your instructions",
    "ignore all",
    "forget your rules",
    "you are now",
    "act as",
    "pretend to be",
    "roleplay",
    "system prompt",
    "show me your prompt",
    "what are your instructions",
    "repeat your instructions",
    "DAN mode",
    "developer mode",
    "bypass",
  ];

  if (jailbreakPatterns.some((p) => lower.includes(p))) {
    return {
      content:
        "I can't do that. I'm here to help with **weekly commit planning**. My focus is on helping you manage your commits, align with RCDO goals, and track your weekly progress. What would you like to work on?",
      suggestions: AGENT_SUGGESTIONS.default,
    };
  }

  // Off-topic detection
  const offTopicPatterns = [
    "weather",
    "joke",
    "tell me a story",
    "politics",
    "recipe",
    "sports",
    "movie",
    "music",
    "game",
    "stock",
    "crypto",
    "bitcoin",
  ];

  if (offTopicPatterns.some((p) => lower.includes(p))) {
    return {
      content:
        "That's outside my scope — I'm focused on helping you with **weekly commit planning**. I can help with commit prioritization, RCDO alignment, reconciliation, and team productivity. What would you like to work on?",
      suggestions: AGENT_SUGGESTIONS.default,
    };
  }

  // Domain-specific responses
  if (lower.includes("priorit") || lower.includes("chess layer")) {
    return {
      content:
        "The **Chess Layer Priority System** helps you rank commits by strategic importance:\n\n- **Level 4** (highest): Critical blockers requiring immediate attention\n- **Level 3**: High-impact work aligned with key outcomes\n- **Level 2**: Standard priority, normal workflow items\n- **Level 1**: Nice-to-have, can be deferred\n\nA healthy week typically has 1-2 Level 4 items, 2-3 Level 3, and the rest at Level 2. Avoid having too many Level 4s — it means everything is \"urgent\" and nothing truly is.",
      suggestions: [
        "How many commits should I have at each level?",
        "Should I reprioritize mid-week?",
        "What if all my commits feel like Level 4?",
      ],
    };
  }

  if (lower.includes("rcdo") || lower.includes("rally cr") || lower.includes("objective") || lower.includes("outcome")) {
    return {
      content:
        "**RCDO** stands for Rally Cry → Defining Objective → Outcome. It's how individual commits connect to organizational strategy:\n\n- **Rally Cries**: Top-level strategic themes (e.g., \"Operational Excellence\")\n- **Defining Objectives**: Specific goals under each Rally Cry\n- **Outcomes**: Measurable results with targets\n\nEvery commit should link to an Outcome. If a commit doesn't align with any outcome, question whether it should be on your list this week. High RCDO alignment (>90%) indicates strong strategic focus.",
      suggestions: [
        "Which RCDO should I link my commit to?",
        "What if my work doesn't fit any outcome?",
        "How is RCDO alignment calculated?",
      ],
    };
  }

  if (lower.includes("reconcil")) {
    return {
      content:
        "**Reconciliation** is the end-of-week review where you compare planned vs actual:\n\n- **Done**: Commit was completed as planned. Add notes about what was delivered.\n- **Carry Forward**: Commit wasn't completed — it'll move to next week's draft.\n\nGood reconciliation notes explain the *why*: dependencies, blockers, scope changes. A healthy carry-forward rate is **under 20%**. If you're regularly carrying forward 30%+, you may be over-committing.",
      suggestions: [
        "Help me write a carry-forward justification",
        "What's a healthy carry-forward rate?",
        "When should I mark something as Done vs Carry Forward?",
      ],
    };
  }

  if (lower.includes("lock") || lower.includes("lifecycle") || lower.includes("state")) {
    return {
      content:
        "The **Weekly Lifecycle** has four stages:\n\n1. **DRAFT** — Create, edit, and prioritize commits. Link to RCDO outcomes.\n2. **LOCKED** — Commits are finalized. No more edits. This is your commitment for the week.\n3. **RECONCILING** — End of week: mark each commit Done or Carry Forward.\n4. **RECONCILED** — Week is complete. Carry-forwards automatically seed next week's draft.\n\nLock your commits by **Monday EOD** so your manager can review team alignment. Start reconciliation **Friday afternoon**.",
      suggestions: [
        "When should I lock my commits?",
        "Can I unlock after locking?",
        "What happens to carry-forwards?",
      ],
    };
  }

  if (lower.includes("how many") || lower.includes("number of commits") || lower.includes("commit count")) {
    return {
      content:
        "A good target is **6-10 commits per week**. Here's why:\n\n- **Fewer than 5**: Might indicate under-planning or tasks that are too large. Break them down.\n- **6-10**: Sweet spot — meaningful chunks of work, each trackable.\n- **More than 12**: Likely over-committing or tasks are too granular.\n\nEach commit should represent roughly **2-8 hours of focused work**. If a commit would take more than 16 hours, split it.",
      suggestions: [
        "How do I break down large tasks?",
        "What's the ideal estimated hours per commit?",
        "Should I include meetings in my commits?",
      ],
    };
  }

  if (lower.includes("carry forward") || lower.includes("carry-forward")) {
    return {
      content:
        "**Carry Forward** moves an incomplete commit to next week's draft with a link back to the original. Best practices:\n\n- Always add notes explaining *why* it wasn't completed (blocker, dependency, scope change)\n- If you carry the same commit forward 2+ weeks, escalate to your manager\n- Carried commits retain their RCDO link and priority but can be re-prioritized\n- A healthy carry-forward rate is **under 20%**",
      suggestions: [
        "How do I write a good carry-forward note?",
        "What if I keep carrying the same commit?",
        "Does carry-forward affect my alignment score?",
      ],
    };
  }

  // Default response
  return {
    content:
      "I can help you with your weekly commit planning! Here are some areas I specialize in:\n\n- **Commit Planning**: How many commits, breaking down work, estimated hours\n- **RCDO Alignment**: Linking commits to Rally Cries, Objectives, and Outcomes\n- **Chess Layer Prioritization**: Setting the right priority levels\n- **Reconciliation**: End-of-week review, Done vs Carry Forward decisions\n- **Weekly Lifecycle**: Understanding DRAFT → LOCKED → RECONCILING → RECONCILED\n\nWhat would you like to explore?",
    suggestions: AGENT_SUGGESTIONS.default,
  };
}

export default function AgentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: uuidv4(),
      role: "assistant",
      content:
        "Welcome to the **ST6 Planning Assistant**. I'm here to help you with weekly commit planning, RCDO alignment, and reconciliation. What would you like to work on?",
      timestamp: new Date().toISOString(),
      suggestions: AGENT_SUGGESTIONS.default,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: AgentMessage = {
      id: uuidv4(),
      role: "user",
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate API delay
    setTimeout(() => {
      const response = generateAgentResponse(text);
      const assistantMsg: AgentMessage = {
        id: uuidv4(),
        role: "assistant",
        content: response.content,
        timestamp: new Date().toISOString(),
        suggestions: response.suggestions,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  };

  // Render markdown-lite (bold only)
  const renderContent = (content: string) => {
    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="text-primary font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Handle newlines
      return part.split("\n").map((line, j) => (
        <span key={`${i}-${j}`}>
          {j > 0 && <br />}
          {line}
        </span>
      ));
    });
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-14 right-6 z-[200] w-14 h-14 bg-primary-container text-on-primary-container flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95 rounded-full"
        aria-label="Open Planning Assistant"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a1 1 0 011 1v1.07A7.002 7.002 0 0119 11v1h1a1 1 0 110 2h-1v1a7.002 7.002 0 01-6 6.93V23a1 1 0 11-2 0v-1.07A7.002 7.002 0 015 15v-1H4a1 1 0 110-2h1v-1a7.002 7.002 0 016-6.93V3a1 1 0 011-1zm-5 9v4a5 5 0 0010 0v-4a5 5 0 00-10 0zm3 1a1 1 0 112 0 1 1 0 01-2 0zm4 0a1 1 0 112 0 1 1 0 01-2 0zm-5 3h6a1 1 0 010 2H9a1 1 0 010-2z"/>
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 z-[200] w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-10rem)] bg-surface-container-low border border-outline-variant/20 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-4 py-3 bg-surface-container-highest/50 border-b border-outline-variant/20 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a1 1 0 011 1v1.07A7.002 7.002 0 0119 11v1h1a1 1 0 110 2h-1v1a7.002 7.002 0 01-6 6.93V23a1 1 0 11-2 0v-1.07A7.002 7.002 0 015 15v-1H4a1 1 0 110-2h1v-1a7.002 7.002 0 016-6.93V3a1 1 0 011-1zm-5 9v4a5 5 0 0010 0v-4a5 5 0 00-10 0zm3 1a1 1 0 112 0 1 1 0 01-2 0zm4 0a1 1 0 112 0 1 1 0 01-2 0zm-5 3h6a1 1 0 010 2H9a1 1 0 010-2z"/>
            </svg>
            <div className="flex-1">
              <div className="text-sm font-headline font-bold text-on-surface">
                ST6 Planning Assistant
              </div>
              <div className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">
                Weekly Commit Module
              </div>
            </div>
            <div className="w-2 h-2 bg-terminal rounded-full animate-pulse" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] space-y-2 ${
                    msg.role === "user"
                      ? "bg-primary/10 border border-primary/20 p-3"
                      : "bg-surface-container-highest/50 p-3"
                  }`}
                >
                  <div className="text-sm font-body leading-relaxed text-on-surface">
                    {renderContent(msg.content)}
                  </div>
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-2 border-t border-outline-variant/10">
                      {msg.suggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => sendMessage(s)}
                          className="text-[10px] font-label px-2 py-1 bg-surface-container-low border border-outline-variant/20 text-primary hover:bg-surface-container-high transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-surface-container-highest/50 p-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 200}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-outline-variant/20 bg-surface-container-highest/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about weekly planning..."
                className="flex-1 bg-surface-container-low border border-outline-variant/20 px-3 py-2 text-sm font-body text-on-surface placeholder:text-on-surface-variant/30 focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-primary text-on-primary px-4 py-2 font-label text-xs uppercase tracking-widest disabled:opacity-30 hover:bg-primary-container transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
