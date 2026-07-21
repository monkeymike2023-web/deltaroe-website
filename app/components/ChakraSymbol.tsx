// Traditional chakra glyphs, simplified for small sizes: a lotus ring with
// the correct petal count around each center's classic inner mark. Rendered
// as a plain <g> centered on (0,0) so it works inside any SVG — the figure
// on /sound-chakras, the list buttons, and the round intros on /the-clearing.

const SYMBOL_PETALS: Record<string, number> = {
  root: 4,
  sacral: 6,
  "solar-plexus": 10,
  heart: 12,
  throat: 16,
  "third-eye": 2,
  crown: 20, // stands in for the thousand-petal lotus
};

function petalPath(r: number, petals: number) {
  const inner = r * 0.48;
  const mid = (inner + r) / 2;
  const w = Math.min(r * 0.3, (Math.PI * mid * 0.72) / petals);
  return `M 0 ${-inner} Q ${w} ${-mid} 0 ${-r} Q ${-w} ${-mid} 0 ${-inner} Z`;
}

function glyph(id: string, s: number, color: string) {
  const triDown = (k: number) =>
    `M 0 ${s * 0.62 * k} L ${s * 0.56 * k} ${-s * 0.34 * k} L ${-s * 0.56 * k} ${-s * 0.34 * k} Z`;
  switch (id) {
    case "root": // square of earth + inverted triangle
      return (
        <>
          <rect x={-s * 0.62} y={-s * 0.62} width={s * 1.24} height={s * 1.24} />
          <path d={triDown(0.72)} />
        </>
      );
    case "sacral": // crescent moon
      return (
        <path
          d={`M ${-s * 0.6} 0 A ${s * 0.65} ${s * 0.65} 0 0 0 ${s * 0.6} 0 A ${s} ${s} 0 0 1 ${-s * 0.6} 0 Z`}
        />
      );
    case "solar-plexus": // inverted triangle, the inner fire
      return <path d={triDown(1)} />;
    case "heart": // two triangles meeting — the hexagram
      return (
        <>
          <path d={`M 0 ${-s * 0.62} L ${s * 0.54} ${s * 0.31} L ${-s * 0.54} ${s * 0.31} Z`} />
          <path d={`M 0 ${s * 0.62} L ${s * 0.54} ${-s * 0.31} L ${-s * 0.54} ${-s * 0.31} Z`} />
        </>
      );
    case "throat": // circle of ether holding a small triangle
      return (
        <>
          <circle r={s * 0.58} />
          <path d={triDown(0.52)} />
        </>
      );
    case "third-eye": // inverted triangle beneath the bindu
      return (
        <>
          <path d={`M 0 ${s * 0.5} L ${s * 0.52} ${-s * 0.28} L ${-s * 0.52} ${-s * 0.28} Z`} />
          <circle cy={-s * 0.58} r={s * 0.13} fill={color} stroke="none" />
        </>
      );
    case "crown": // the still point within the thousand petals
      return (
        <>
          <circle r={s * 0.5} />
          <circle r={s * 0.13} fill={color} stroke="none" />
        </>
      );
    default:
      return <circle r={s * 0.5} />;
  }
}

export default function ChakraSymbol({
  id,
  r,
  color,
}: {
  id: string;
  r: number;
  color: string;
}) {
  const petals = SYMBOL_PETALS[id] ?? 8;
  const d = petalPath(r, petals);
  return (
    <g stroke={color} fill="none" strokeWidth={r * 0.1} strokeLinejoin="round">
      {Array.from({ length: petals }, (_, k) => (
        <path
          key={k}
          d={d}
          fill={color}
          fillOpacity={0.22}
          transform={`rotate(${(360 / petals) * k})`}
        />
      ))}
      <circle r={r * 0.46} />
      {glyph(id, r * 0.46, color)}
    </g>
  );
}
