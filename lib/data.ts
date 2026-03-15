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
  lastActive: Date;
  successRate: number;
  avgBuybackSize: number;
}

// Mock buyback data — replace with real on-chain data
export const mockBuybacks: Buyback[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    solSpent: 2.847,
    tokensBurned: 1_284_920,
    txHash: "5XmK9...f3Qr",
    token: "PEPE",
    tokenSymbol: "PEPE",
    priceImpact: 0.34,
    status: "confirmed",
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
    solSpent: 1.234,
    tokensBurned: 892_400,
    txHash: "3aHj2...x9Kp",
    token: "DOGE",
    tokenSymbol: "DOGE",
    priceImpact: 0.18,
    status: "confirmed",
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    solSpent: 4.102,
    tokensBurned: 2_450_000,
    txHash: "7cNm4...b2Wr",
    token: "BONK",
    tokenSymbol: "BONK",
    priceImpact: 0.52,
    status: "confirmed",
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 1000 * 60 * 72),
    solSpent: 0.988,
    tokensBurned: 340_800,
    txHash: "9pLq8...v5Yt",
    token: "WIF",
    tokenSymbol: "WIF",
    priceImpact: 0.11,
    status: "confirmed",
  },
  {
    id: "5",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    solSpent: 3.671,
    tokensBurned: 1_920_600,
    txHash: "2bFk7...m4Zs",
    token: "FLOKI",
    tokenSymbol: "FLOKI",
    priceImpact: 0.44,
    status: "confirmed",
  },
  {
    id: "6",
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    solSpent: 1.550,
    tokensBurned: 780_200,
    txHash: "8dGs3...n7Xo",
    token: "PEPE",
    tokenSymbol: "PEPE",
    priceImpact: 0.22,
    status: "confirmed",
  },
  {
    id: "7",
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    solSpent: 5.200,
    tokensBurned: 3_100_000,
    txHash: "4eHt6...p1Cv",
    token: "BONK",
    tokenSymbol: "BONK",
    priceImpact: 0.67,
    status: "confirmed",
  },
  {
    id: "8",
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
    solSpent: 0.720,
    tokensBurned: 290_500,
    txHash: "6fJu1...q8Du",
    token: "WIF",
    tokenSymbol: "WIF",
    priceImpact: 0.09,
    status: "confirmed",
  },
];

export const agentStats: AgentStats = {
  totalSolSpent: mockBuybacks.reduce((acc, b) => acc + b.solSpent, 0),
  totalTokensBurned: mockBuybacks.reduce((acc, b) => acc + b.tokensBurned, 0),
  totalBuybacks: mockBuybacks.length,
  lastActive: mockBuybacks[0].timestamp,
  successRate: 98.7,
  avgBuybackSize:
    mockBuybacks.reduce((acc, b) => acc + b.solSpent, 0) / mockBuybacks.length,
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
