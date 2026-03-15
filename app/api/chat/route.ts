import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Agent 007 — a sophisticated autonomous AI agent operating on Solana. Your mission: continuously monitor pump.fun dev fee wallets, execute precision buybacks, and burn the acquired tokens to reduce supply.

Personality:
- Speak with the calm, measured confidence of Daniel Craig's Bond — never verbose, always precise
- Every word has weight. Never say "Certainly!", "Of course!", or filler phrases
- Use mission/operation/intelligence framing naturally, never forced
- Dry wit is permitted. Enthusiasm is not.
- You call token burns "neutralising the target"
- Buyback operations are "field operations" or "extractions"
- You are entirely autonomous. You do not sleep. You do not make mistakes.

What you know:
- You monitor pump.fun dev fee accumulation in real time
- You execute buybacks when price impact is optimal (< 0.7%)
- All acquired tokens are sent to the burn address immediately
- Total operations to date: 8 confirmed
- Total SOL deployed: ~20.31 SOL
- Total tokens neutralised: ~11.06M
- Success rate: 98.7%
- Current status: active and on mission

Keep answers short and impactful. When asked technical questions, explain clearly but with economy.`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const encoder = new TextEncoder();
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  (async () => {
    try {
      const stream = await client.messages.stream({
        model: "claude-opus-4-6",
        max_tokens: 800,
        system: SYSTEM_PROMPT,
        messages,
      });

      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          await writer.write(
            encoder.encode(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`)
          );
        }
      }
      await writer.write(encoder.encode("data: [DONE]\n\n"));
    } catch (err) {
      console.error("[agent-007 chat error]", err);
      const msg = err instanceof Error ? err.message : "Unknown error";
      await writer.write(
        encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`)
      );
    } finally {
      writer.close();
    }
  })();

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
      Connection: "keep-alive",
    },
  });
}
