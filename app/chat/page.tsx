"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "What's your current mission status?",
  "How do you decide when to execute a buyback?",
  "How much SOL have you deployed total?",
  "What happens to the tokens after you buy them?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamText, setStreamText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamText]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setStreamText("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                fullText += parsed.text;
                setStreamText(fullText);
              }
            } catch {}
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fullText },
      ]);
      setStreamText("");
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Mission communications disrupted. Please try again.",
        },
      ]);
      setStreamText("");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const allMessages = [
    ...messages,
    ...(streamText || loading
      ? [{ role: "assistant" as const, content: streamText || "" }]
      : []),
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col max-w-3xl mx-auto">
      {/* Header */}
      <div className="px-6 py-10 border-b border-obsidian-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-4 h-px bg-gold" />
          <span className="text-xs text-white/30 tracking-widest font-mono uppercase">Secure Channel · Encrypted</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Agent avatar */}
          <div className="relative w-12 h-12 flex-shrink-0">
            <div className="absolute inset-0 rounded-full border border-gold/40" />
            <div className="absolute inset-1.5 rounded-full border border-gold/20" />
            <div className="absolute inset-3 rounded-full bg-gold/80 flex items-center justify-center">
              <span className="text-obsidian text-xs font-black">007</span>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider">
              <span className="text-white">AGENT</span>{" "}
              <span className="text-gold">007</span>
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white/30 font-mono tracking-wider">On mission · Ready to debrief</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
        {allMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            {/* Reticle */}
            <div className="relative w-20 h-20 mb-8 opacity-30">
              <div className="absolute inset-0 rounded-full border border-gold reticle" />
              <div className="absolute inset-4 rounded-full border border-gold reticle" style={{ animationDirection: "reverse" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-gold/60" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-px h-full bg-gold/60" />
              </div>
            </div>
            <p className="text-white/30 text-sm font-mono tracking-widest mb-8">
              AWAITING TRANSMISSION
            </p>
            {/* Suggested */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left px-4 py-3 border border-obsidian-border hover:border-gold/30 text-white/40 hover:text-white/70 text-xs font-mono tracking-wide transition-all rounded-sm bg-obsidian-card hover:bg-gold/5"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {allMessages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-4 animate-slide-up ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div className="flex-shrink-0 mt-0.5">
              {msg.role === "assistant" ? (
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 rounded-full border border-gold/40" />
                  <div className="absolute inset-1 rounded-full border border-gold/20" />
                  <div className="absolute inset-2 rounded-full bg-gold/70 flex items-center justify-center">
                    <span className="text-obsidian text-[8px] font-black">007</span>
                  </div>
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full border border-white/10 bg-obsidian-card flex items-center justify-center">
                  <span className="text-white/40 text-xs font-mono">YOU</span>
                </div>
              )}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[80%] px-4 py-3 rounded-sm text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-obsidian-card border border-white/10 text-white/80 ml-auto"
                  : "bg-gold/5 border border-gold/20 text-white/90"
              }`}
            >
              {msg.content || (
                <span className="inline-flex items-center gap-1">
                  <span className="text-gold/60 font-mono text-xs">analyzing</span>
                  <span className="flex gap-0.5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="w-1 h-1 rounded-full bg-gold/60 animate-bounce"
                        style={{ animationDelay: `${d * 150}ms` }}
                      />
                    ))}
                  </span>
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-obsidian-border px-6 py-5">
        <div className="flex gap-3 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a transmission..."
            rows={1}
            disabled={loading}
            className="flex-1 bg-obsidian-card border border-obsidian-border focus:border-gold/40 rounded-sm px-4 py-3 text-sm text-white/80 placeholder:text-white/20 focus:outline-none resize-none font-mono transition-colors disabled:opacity-50"
            style={{ minHeight: "48px", maxHeight: "120px" }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="h-12 px-5 bg-gold text-obsidian font-bold text-sm tracking-wider hover:bg-gold-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 rounded-sm flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
        <p className="text-white/15 text-[10px] font-mono mt-2 text-center tracking-widest">
          ENCRYPTED · SECURE CHANNEL · ENTER TO SEND
        </p>
      </div>
    </div>
  );
}
