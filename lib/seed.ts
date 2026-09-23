// Deterministic string -> visual seed helpers.
// Used to generate consistent (no hydration mismatch), distinct-looking
// generative art panels from a slug/name instead of Math.random().

export function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function seededValue(seed: string, salt: number, min: number, max: number): number {
  const h = hashString(`${seed}:${salt}`);
  return min + (h % 1000) / 1000 * (max - min);
}

const HUES = [16, 38, 84, 154, 198, 262, 312];

export function seedToHue(seed: string, salt = 0): number {
  const h = hashString(`${seed}:hue:${salt}`);
  return HUES[h % HUES.length];
}

// Deterministic photographic placeholder: same seed always resolves to the
// same image (no hydration mismatch), distinct seeds resolve to distinct
// images. Swap this for real client photography by pointing it at the CMS
// asset URL once real assets exist.
export function seedToImageUrl(seed: string, width = 640, height = 480): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}
