"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "What's your current mission status?",
  "How do you time your buybacks?",
  "How much SOL have you deployed?",
  "What happens after you acquire tokens?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamText, setStreamText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamText]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    setStreamText("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = decoder.decode(value).split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6);
          if (raw === "[DONE]") continue;
          try {
            const parsed = JSON.parse(raw);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.text) { full += parsed.text; setStreamText(full); }
          } catch {}
        }
      }

      setMessages((prev) => [...prev, { role: "assistant", content: full }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Mission communications disrupted. Ensure ANTHROPIC_API_KEY is configured." },
      ]);
    } finally {
      setStreamText("");
      setLoading(false);
    }
  }

  const displayMessages: Message[] = [
    ...messages,
    ...(loading || streamText ? [{ role: "assistant" as const, content: streamText }] : []),
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] max-w-3xl mx-auto">

      {/* Header */}
      <div className="px-6 py-7 border-b border-agent-border flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 flex-shrink-0">
            <div className="absolute inset-0 rounded-full border border-white/20 reticle" />
            <div className="absolute inset-2 rounded-full border border-white/10" />
            <div className="absolute inset-3.5 rounded-full bg-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-white font-black tracking-[0.15em] text-sm">AGENT 007</h1>
              <div className="border border-agent-red/50 px-1.5 py-0.5">
                <span className="font-mono text-[8px] text-agent-red tracking-widest">CLASSIFIED</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-agent-green animate-pulse-dot" />
              <span className="font-mono text-[10px] text-agent-dim tracking-wider">Secure channel · Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
        {displayMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="relative w-16 h-16 mb-8 opacity-20">
              <div className="absolute inset-0 rounded-full border border-white reticle" />
              <div className="absolute inset-3 rounded-full border border-white reticle-rev" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white" />
            </div>
            <p className="font-mono text-[10px] text-agent-dim tracking-[0.4em] mb-8">AWAITING TRANSMISSION</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left px-4 py-3 border border-agent-border hover:border-white/20 text-agent-dim hover:text-agent-light text-[11px] font-mono tracking-wide transition-all bg-agent-card hover:bg-white/[0.02]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {displayMessages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 animate-slide-up ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div className="flex-shrink-0 pt-1">
              {msg.role === "assistant" ? (
                <div className="relative w-6 h-6">
                  <div className="absolute inset-0 rounded-full border border-white/20 reticle" />
                  <div className="absolute inset-2 rounded-full bg-white" />
                </div>
              ) : (
                <div className="w-6 h-6 border border-agent-border flex items-center justify-center">
                  <span className="font-mono text-[8px] text-agent-dim">YOU</span>
                </div>
              )}
            </div>

            <div
              className={`max-w-[78%] px-4 py-3 text-sm leading-relaxed font-mono ${
                msg.role === "user"
                  ? "bg-white/[0.04] border border-agent-border text-agent-light"
                  : "border-l-2 border-white/40 pl-4 text-white/90"
              }`}
            >
              {msg.role === "assistant" && !msg.content && loading ? (
                <span className="flex items-center gap-1.5 text-agent-dim text-xs">
                  <span className="tracking-widest">PROCESSING</span>
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="w-1 h-1 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: `${d * 200}ms` }} />
                  ))}
                </span>
              ) : msg.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-agent-border px-6 py-4 flex-shrink-0">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-3 font-mono text-[10px] text-agent-dim select-none">›</span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
              }}
              placeholder="Send transmission..."
              rows={1}
              disabled={loading}
              className="w-full bg-agent-card border border-agent-border focus:border-white/20 pl-7 pr-4 py-3 text-sm text-white placeholder:text-agent-dim/50 focus:outline-none resize-none font-mono transition-colors disabled:opacity-40"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="h-11 px-5 bg-white text-black font-bold text-xs tracking-[0.15em] hover:bg-white/90 transition-colors disabled:opacity-25 disabled:cursor-not-allowed flex-shrink-0"
          >
            SEND
          </button>
        </div>
        <p className="font-mono text-[9px] text-agent-dim/30 mt-2 tracking-[0.25em] text-center">
          ENCRYPTED · SECURE CHANNEL
        </p>
      </div>
    </div>
  );
}
