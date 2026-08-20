const PALETTE = [
  '#0ac8b9',
  '#c8aa6e',
  '#e84057',
  '#4caf6f',
  '#7c5cff',
  '#e8a03f',
];

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const second = parts.length > 1 ? (parts[1]?.[0] ?? '') : (parts[0]?.[1] ?? '');
  return (first + second).toUpperCase();
}

export function Avatar({ name, size = 72 }: { name: string; size?: number }) {
  const hash = hashString(name);
  const color = PALETTE[hash % PALETTE.length];

  return (
    <div
      className="rounded-full flex items-center justify-center font-semibold shrink-0 border border-rift-border"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(160deg, ${color}33, ${color}11)`,
        color,
        fontSize: size * 0.32,
      }}
    >
      {initials(name)}
    </div>
  );
}
