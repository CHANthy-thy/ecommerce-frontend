// Shared helpers for international skincare sample data.
// Kept intentionally tiny to avoid affecting existing business logic.

export function clampInt(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.trunc(n)))
}

