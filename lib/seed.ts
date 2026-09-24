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

// Curated high-resolution editorial and category photography from Unsplash.
// Highly reliable, cached on global CDNs, zero DNS/CORS failures on Vercel.
const CURATED_SEED_IMAGES = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
];

export function seedToImageUrl(seed: string, width = 640, height = 480): string {
  const hash = hashString(seed);
  return CURATED_SEED_IMAGES[hash % CURATED_SEED_IMAGES.length];
}
