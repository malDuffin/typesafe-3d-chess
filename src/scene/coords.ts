/** Square ↔ world helpers. White orientation: a1 at (-3.5, 0, 3.5). */
import * as THREE from "three";

export const TILE = 1;
export const ORIGIN = 3.5;

export function filesRanks(): { file: number; rank: number; square: string }[] {
  const out: { file: number; rank: number; square: string }[] = [];
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      out.push({ file, rank, square: `${"abcdefgh"[file]}${rank + 1}` });
    }
  }
  return out;
}

export function squareToWorld(
  square: string,
  orientation: "white" | "black" = "white",
  y = 0,
): THREE.Vector3 {
  const file = square.charCodeAt(0) - 97;
  const rank = Number(square[1]) - 1;
  let x = file - ORIGIN;
  let z = ORIGIN - rank;
  if (orientation === "black") {
    x = -x;
    z = -z;
  }
  return new THREE.Vector3(x * TILE, y, z * TILE);
}

export function worldToSquare(
  xOrPoint: number | THREE.Vector3,
  zOrOrientation?: number | "white" | "black",
  orientation: "white" | "black" = "white",
): string | null {
  let x: number;
  let z: number;
  let side = orientation;
  if (typeof xOrPoint === "number") {
    x = xOrPoint;
    if (typeof zOrOrientation === "number") z = zOrOrientation;
    else return null;
  } else {
    x = xOrPoint.x / TILE;
    z = xOrPoint.z / TILE;
    if (zOrOrientation === "white" || zOrOrientation === "black") side = zOrOrientation;
  }
  if (side === "black") {
    x = -x;
    z = -z;
  }
  const file = Math.round(x + ORIGIN);
  const rank = Math.round(ORIGIN - z);
  if (file < 0 || file > 7 || rank < 0 || rank > 7) return null;
  return `${"abcdefgh"[file]}${rank + 1}`;
}
