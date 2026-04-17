interface GrassDividerProps {
  /** Base color the blades "emerge from" — draws a thin strip along the bottom edge */
  baseColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Deterministic pseudo-random so SSR and client render match identically.
 */
function rand(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

type Blade = {
  xPct: number;
  width: number;
  height: number;
  rotation: number;   // static lean in degrees (-25 to +25)
  gradStart: string;
  gradMid: string;
  gradEnd: string;
  duration: number;
  delay: number;
  layer: 'back' | 'mid' | 'front';
};

// Precompute blades — 4 layers for real depth, dense coverage, dramatic per-blade leans
function buildBlades(): Blade[] {
  const blades: Blade[] = [];

  // FAR BACK — many small dark blades, high density for base texture
  for (let i = 0; i < 90; i++) {
    const r1 = rand(i + 1);
    const r2 = rand(i + 301);
    const r3 = rand(i + 601);
    blades.push({
      xPct: (i / 89) * 100 + (r1 - 0.5) * 1,
      width: 4 + r3 * 3,              // 4-7 px
      height: 16 + r2 * 14,           // 16-30 px
      rotation: (r1 - 0.5) * 40,      // ±20° lean
      gradStart: '#0A1F0C',
      gradMid: '#1B5E20',
      gradEnd: '#2E7D32',
      duration: 4 + r3 * 2,
      delay: r1 * 5,
      layer: 'back',
    });
  }

  // BACK — medium darker blades
  for (let i = 0; i < 60; i++) {
    const r1 = rand(i + 1001);
    const r2 = rand(i + 1501);
    const r3 = rand(i + 2001);
    blades.push({
      xPct: (i / 59) * 100 + (r1 - 0.5) * 2,
      width: 6 + r3 * 4,              // 6-10 px
      height: 28 + r2 * 16,           // 28-44 px
      rotation: (r1 - 0.5) * 40,      // ±20° lean
      gradStart: '#0A1F0C',
      gradMid: '#1B5E20',
      gradEnd: '#388E3C',
      duration: 3.5 + r3 * 2.5,
      delay: r2 * 5,
      layer: 'back',
    });
  }

  // MID
  for (let i = 0; i < 45; i++) {
    const r1 = rand(i + 3001);
    const r2 = rand(i + 3501);
    const r3 = rand(i + 4001);
    blades.push({
      xPct: (i / 44) * 100 + (r1 - 0.5) * 3,
      width: 7 + r3 * 5,              // 7-12 px
      height: 38 + r2 * 20,           // 38-58 px
      rotation: (r1 - 0.5) * 46,      // ±23° lean
      gradStart: '#1B5E20',
      gradMid: '#2E7D32',
      gradEnd: '#66BB6A',
      duration: 3 + r3 * 3,
      delay: r3 * 5,
      layer: 'mid',
    });
  }

  // FRONT — tallest, brightest, most dramatic leans
  for (let i = 0; i < 32; i++) {
    const r1 = rand(i + 5001);
    const r2 = rand(i + 5501);
    const r3 = rand(i + 6001);
    blades.push({
      xPct: (i / 31) * 100 + (r1 - 0.5) * 4,
      width: 8 + r3 * 6,              // 8-14 px
      height: 50 + r2 * 22,           // 50-72 px
      rotation: (r1 - 0.5) * 50,      // ±25° lean
      gradStart: '#2E7D32',
      gradMid: '#43A047',
      gradEnd: '#8BC34A',
      duration: 2.8 + r3 * 2.5,
      delay: r2 * 5,
      layer: 'front',
    });
  }

  return blades;
}

const BLADES = buildBlades();

function renderBlade(blade: Blade, i: number) {
  const { width: w, height: h, xPct, rotation, gradStart, gradMid, gradEnd, duration, delay, layer } = blade;
  const gradId = `blade-${i}`;

  // Simple tapered blade with gentle curve — quadratic bezier
  // Start at base-left, curve up to pointed tip, curve back down to base-right
  const d = `M 0,${h} Q ${w * 0.4},${h * 0.45} ${w * 0.5},0 Q ${w * 0.6},${h * 0.45} ${w},${h} Z`;

  const opacity =
    layer === 'back' ? 0.75 :
    layer === 'mid' ? 0.92 : 1;
  const zIndex =
    layer === 'back' ? 1 :
    layer === 'mid' ? 2 : 3;

  return (
    // Outer: positions + applies the STATIC lean rotation.
    <div
      key={i}
      style={{
        position: 'absolute',
        left: `${xPct}%`,
        bottom: 0,
        width: `${w}px`,
        height: `${h}px`,
        marginLeft: `-${w / 2}px`,
        zIndex,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: '50% 100%',
      }}
      aria-hidden="true"
    >
      {/* Inner: applies the SWAY animation. Rotations compose. */}
      <svg
        className="grass-blade"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${w} ${h}`}
        width={w}
        height={h}
        style={{
          display: 'block',
          opacity,
          overflow: 'visible',
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="40%" stopColor={gradMid} />
            <stop offset="90%" stopColor={gradEnd} />
            <stop offset="100%" stopColor={gradEnd} stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path d={d} fill={`url(#${gradId})`} />
      </svg>
    </div>
  );
}

export default function GrassDivider({
  baseColor = '#1B5E20',
  className = '',
  style,
}: GrassDividerProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '80px',
        overflow: 'hidden',
        ...style,
      }}
      aria-hidden="true"
    >
      {/* Soft soil/turf bed at the bottom — gradient so it blends seamlessly */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '10px',
          background: `linear-gradient(to top, ${baseColor}, transparent)`,
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />

      {BLADES.map((blade, i) => renderBlade(blade, i))}
    </div>
  );
}
