export type Mode = "watch" | "white" | "black";
export type Difficulty = "novice" | "club" | "expert" | "grandmaster";
export type PieceType = "p" | "n" | "b" | "r" | "q" | "k";
export type Side = "w" | "b";

export interface AiDecision {
  san: string;
  uci: string;
  source: "typesafe" | "local";
  confidence?: number;
  probabilities?: Record<string, number>;
  model?: string;
  note?: string;
}

export interface MoveRequest {
  fen: string;
  difficulty: Difficulty;
  apiKey?: string;
}

export interface MoveResponse extends AiDecision {
  ok: boolean;
  error?: string;
}
