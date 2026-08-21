// Looping background animation for the homepage hero: a grid forms along the
// x and y axes at once, then a stock-style uptrend line draws across it.
// Pure SVG + CSS (see .hero-grid-line / .hero-graph-line / .hero-graph-dot in
// globals.css) — no JS, no images, so it's cheap and works in the static export.

const VIEW_W = 1200;
const VIEW_H = 500;
const COL_STEP = 100;
const ROW_STEP = 100;

const GRAPH_POINTS: [number, number][] = [
  [40, 430],
  [180, 380],
  [320, 410],
  [460, 320],
  [600, 350],
  [740, 230],
  [880, 270],
  [1020, 150],
  [1160, 90],
];

export default function HeroGraphGrid() {
  const cols = Array.from({ length: VIEW_W / COL_STEP + 1 }, (_, i) => i * COL_STEP);
  const rows = Array.from({ length: VIEW_H / ROW_STEP + 1 }, (_, i) => i * ROW_STEP);
  const [endX, endY] = GRAPH_POINTS[GRAPH_POINTS.length - 1];
  const pathD = GRAPH_POINTS.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      {/* Vertical lines grow upward from the x-axis */}
      {cols.map((x, i) => (
        <line
          key={`v-${x}`}
          className="hero-grid-line"
          x1={x}
          y1={VIEW_H}
          x2={x}
          y2={0}
          pathLength={100}
          style={{ animationDelay: `${i * 0.045}s` }}
        />
      ))}
      {/* Horizontal lines grow rightward from the y-axis */}
      {rows.map((y, i) => (
        <line
          key={`h-${y}`}
          className="hero-grid-line"
          x1={0}
          y1={y}
          x2={VIEW_W}
          y2={y}
          pathLength={100}
          style={{ animationDelay: `${i * 0.045}s` }}
        />
      ))}
      {/* The uptrend line, drawn once the grid has formed */}
      <path className="hero-graph-line" d={pathD} pathLength={100} />
      <circle className="hero-graph-dot" cx={endX} cy={endY} r={9} />
    </svg>
  );
}
