export interface Buyback {
  id: string;
  timestamp: Date;
  solSpent: number;
  tokensBurned: number;
  txHash: string;
  token: string;
  tokenSymbol: string;
  priceImpact: number;
  status: "confirmed" | "pending";
}

export interface AgentStats {
  totalSolSpent: number;
  totalTokensBurned: number;
  totalBuybacks: number;
  successRate: number;
  avgBuybackSize: number;
}

// Live data — populated once wallet is connected
export const buybacks: Buyback[] = [];

export const agentStats: AgentStats = {
  totalSolSpent: 0,
  totalTokensBurned: 0,
  totalBuybacks: 0,
  successRate: 0,
  avgBuybackSize: 0,
};

export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function shortHash(hash: string): string {
  if (hash.length <= 12) return hash;
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}
