/**
 * LearningSection — Static educational content below the synth.
 *
 * Covers synthesis basics in signal-chain order with inline SVG diagrams.
 * Accent colors match the corresponding synth panels above.
 */
import SignalFlowDiagram from './SignalFlowDiagram.jsx'

function SectionHeader({ color, title }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className={`w-1.5 h-4 rounded-sm ${color}`} />
      <h3 className="text-xs font-mono font-bold tracking-widest text-stone-400 uppercase">
        {title}
      </h3>
    </div>
  )
}

// ─── SVG Diagrams ──────────────────────────────────────────────────────────────

function WaveformDiagram() {
  const W = 210, H = 96, pad = 10
  const labelH = 18
  const drawH = H - labelH
  const cy = drawH * 0.5, amp = 30
  const colW = (W - pad * 2) / 3

  // Sine: closed path tracing full cycle above AND below centerline
  const sineForward = Array.from({ length: 61 }, (_, i) => {
    const x = pad + (i / 60) * colW
    const y = cy - Math.sin((i / 60) * Math.PI * 2) * amp
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  const sineFill = [
    `M ${pad},${cy}`,
    ...sineForward.map(p => `L ${p}`),
    `Z`,
  ].join(' ')

  // Square: connected step-wave polygon (reads as square wave icon)
  const sqX = pad + colW + 4, sqW = colW - 8
  const sqMid = sqX + sqW / 2
  const squarePts = [
    `${sqX},${cy}`,
    `${sqX},${cy - amp}`,
    `${sqMid},${cy - amp}`,
    `${sqMid},${cy + amp}`,
    `${sqX + sqW},${cy + amp}`,
    `${sqX + sqW},${cy}`,
  ].join(' ')

  // Sawtooth: filled triangle — left edge at top, right edge descends, baseline closes
  const sawX = pad + colW * 2 + 4, sawW = colW - 8

  return (
    <div className="rounded-lg overflow-hidden" style={{ background: '#000' }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: '116px' }}>
        {/* Sine — blue filled cycle */}
        <path d={sineFill} fill="#38bdf8" />
        <text x={pad + colW / 2} y={H - 4} textAnchor="middle" fontSize="11"
          fontFamily="monospace" fontWeight="bold" fill="#38bdf8" letterSpacing="0.06em">SINE</text>

        {/* Square — yellow step-wave polygon */}
        <polygon points={squarePts} fill="#fbbf24" />
        <text x={pad + colW + colW / 2} y={H - 4} textAnchor="middle" fontSize="11"
          fontFamily="monospace" fontWeight="bold" fill="#fbbf24" letterSpacing="0.06em">SQUARE</text>

        {/* Sawtooth — green filled triangle */}
        <polygon points={`${sawX},${cy - amp} ${sawX + sawW},${cy + amp} ${sawX},${cy + amp}`}
          fill="#4ade80" />
        <text x={pad + colW * 2 + colW / 2} y={H - 4} textAnchor="middle" fontSize="11"
          fontFamily="monospace" fontWeight="bold" fill="#4ade80" letterSpacing="0.06em">SAW</text>
      </svg>
    </div>
  )
}

function FilterDiagram() {
  const W = 210, H = 90, pad = 12
  const cutX = W * 0.42
  const baseY = H - 22

  // Bell-curve-like hill path for frequency content
  const hillPts = Array.from({ length: 61 }, (_, i) => {
    const t = i / 60
    const x = pad + t * (W - pad * 2)
    const peakT = 0.15
    const hillH = 44 * Math.exp(-Math.pow((t - peakT) * 3.5, 2))
    return { x, y: baseY - hillH }
  })

  const passPath = [
    `M ${pad},${baseY}`,
    ...hillPts.filter(p => p.x <= cutX).map(p => `L ${p.x.toFixed(1)},${p.y.toFixed(1)}`),
    `L ${cutX},${baseY} Z`,
  ].join(' ')

  const cutPath = [
    `M ${cutX},${baseY}`,
    ...hillPts.filter(p => p.x >= cutX).map(p => `L ${p.x.toFixed(1)},${p.y.toFixed(1)}`),
    `L ${W - pad},${baseY} Z`,
  ].join(' ')

  return (
    <div className="rounded-lg overflow-hidden" style={{ background: '#000' }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: '110px' }}>
        {/* Cut region */}
        <path d={cutPath} fill="#1e3a4a" />
        {/* Pass region */}
        <path d={passPath} fill="#38bdf8" opacity="0.9" />
        {/* Baseline */}
        <line x1={pad} y1={baseY} x2={W - pad} y2={baseY} stroke="#334155" strokeWidth="1" />
        {/* Cutoff line */}
        <line x1={cutX} y1={pad} x2={cutX} y2={baseY} stroke="#fff" strokeWidth="2" strokeDasharray="4,3" />
        {/* Labels */}
        <text x={pad + 4} y={H - 6} fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#38bdf8">PASS</text>
        <text x={cutX + 5} y={pad + 12} fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#fff">CUTOFF</text>
        <text x={W - 38} y={H - 6} fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#334155">CUT</text>
      </svg>
    </div>
  )
}

function ADSRDiagram() {
  const W = 210, H = 110
  const botY = H - 18, peakY = 8, susY = botY - 42
  const aX0 = 10, aX1 = 40
  const dX1 = 72
  const sX1 = 162
  const rX1 = W - 10

  const phases = [
    { color: '#3b82f6', label: 'A', lx: (aX0 + aX1) / 2,
      d: `M ${aX0},${botY} L ${aX1},${peakY} L ${aX1},${botY} Z` },
    { color: '#22c55e', label: 'D', lx: (aX1 + dX1) / 2,
      d: `M ${aX1},${peakY} L ${dX1},${susY} L ${dX1},${botY} L ${aX1},${botY} Z` },
    { color: '#f59e0b', label: 'S', lx: (dX1 + sX1) / 2,
      d: `M ${dX1},${susY} L ${sX1},${susY} L ${sX1},${botY} L ${dX1},${botY} Z` },
    { color: '#ef4444', label: 'R', lx: (sX1 + rX1) / 2,
      d: `M ${sX1},${susY} L ${rX1},${botY} L ${sX1},${botY} Z` },
  ]

  return (
    <div className="rounded-lg overflow-hidden" style={{ background: '#000' }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: '130px' }}>
        {phases.map(({ color, label, lx, d }) => (
          <g key={label}>
            <path d={d} fill={color} />
            <text x={lx} y={botY - 6} textAnchor="middle" fontSize="12"
              fontFamily="monospace" fontWeight="bold" fill="#000">{label}</text>
          </g>
        ))}
        {/* White baseline */}
        <line x1={aX0} y1={botY} x2={rX1} y2={botY} stroke="#fff" strokeWidth="2" />
      </svg>
    </div>
  )
}

function LFODiagram() {
  const W = 210, H = 100, pad = 12
  const cy = H / 2 - 4, amp = 30

  const wavePts = Array.from({ length: 81 }, (_, i) => {
    const x = pad + (i / 80) * (W - pad * 2)
    const y = cy - Math.sin((i / 80) * Math.PI * 4) * amp
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  // Filled area under the wave — two passes (above/below cy)
  const abovePath = [
    `M ${pad},${cy}`,
    ...wavePts.map(p => `L ${p}`),
    `L ${W - pad},${cy} Z`,
  ].join(' ')

  const waveLine = wavePts.join(' ')

  return (
    <div className="rounded-lg overflow-hidden" style={{ background: '#000' }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: '120px' }}>
        {/* Filled wave area */}
        <path d={abovePath} fill="#7c3aed" opacity="0.25" />
        {/* Bound lines */}
        <line x1={pad} y1={cy - amp} x2={W - pad} y2={cy - amp} stroke="#a78bfa" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <line x1={pad} y1={cy + amp} x2={W - pad} y2={cy + amp} stroke="#a78bfa" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        {/* Wave */}
        <polyline points={waveLine} fill="none" stroke="#a78bfa" strokeWidth="3.5"
          strokeLinejoin="round" strokeLinecap="round" />
        {/* Labels */}
        <text x={pad + 2} y={cy - amp - 5} fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#a78bfa">RATE →</text>
        <text x={W - 56} y={cy - amp - 5} fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#a78bfa">DEPTH</text>
        <line x1={W - 16} y1={cy - amp + 2} x2={W - 16} y2={cy + amp - 2} stroke="#a78bfa" strokeWidth="1.5" markerEnd="url(#arrD)" markerStart="url(#arrU)" />
        <defs>
          <marker id="arrD" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
            <path d="M0,0 L4,2 L0,4 Z" fill="#a78bfa" />
          </marker>
          <marker id="arrU" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto-start-reverse">
            <path d="M0,0 L4,2 L0,4 Z" fill="#a78bfa" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}

function EffectsDiagram() {
  const W = 210, H = 110, pad = 10
  const row1Y = 14   // reverb row baseline
  const row2Y = 62   // delay row baseline
  const rowH = 38    // max bar height

  // Reverb: impulse spike + decaying wash — 14 wider bars with slower decay
  const reverbBars = Array.from({ length: 14 }, (_, i) => {
    const x = pad + 22 + i * 12.5
    const decay = Math.exp(-i * 0.12)
    return { x, h: rowH * decay }
  })

  // Delay: 4 discrete spikes, wider bars
  const delaySpikes = [0, 1, 2, 3].map(i => ({
    x: pad + 10 + i * 46,
    h: rowH * Math.pow(0.65, i),
  }))

  return (
    <div className="rounded-lg overflow-hidden" style={{ background: '#000' }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: '130px' }}>
        {/* ── Reverb row ── */}
        <text x={pad} y={row1Y + rowH / 2 + 4} fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#f87171">REV</text>
        {/* Impulse spike */}
        <rect x={pad + 18} y={row1Y} width={9} height={rowH} fill="#f87171" rx="1" />
        {/* Wash bars */}
        {reverbBars.map((b, i) => (
          <rect key={i} x={b.x} y={row1Y + rowH - b.h} width={8} height={b.h}
            fill="#f87171" opacity={0.2 + 0.7 * Math.exp(-i * 0.12)} rx="1" />
        ))}
        {/* Separator */}
        <line x1={pad} y1={row2Y - 6} x2={W - pad} y2={row2Y - 6} stroke="#1e293b" strokeWidth="1" />

        {/* ── Delay row ── */}
        <text x={pad} y={row2Y + rowH / 2 + 4} fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#fb923c">DLY</text>
        {delaySpikes.map((s, i) => (
          <rect key={i} x={s.x + 18} y={row2Y + rowH - s.h} width={14} height={s.h}
            fill="#fb923c" opacity={1 - i * 0.15} rx="1" />
        ))}
      </svg>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function LearningSection() {
  return (
    <article className="max-w-5xl mx-auto px-4 py-10">

      {/* Header — full width */}
      <header className="mb-8">
        <h2 className="text-lg font-mono font-bold text-hw-strong tracking-widest uppercase mb-1">
          How Synthesis Works
        </h2>
        <p className="text-xs font-sans text-hw-muted">
          A plain-English guide to what you just played with.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-x-12 gap-y-10">

      {/* What is synthesis? */}
      <section>
        <SectionHeader color="bg-hw-body" title="What is synthesis?" />
        <p className="text-sm font-sans text-hw-body leading-relaxed mb-2">
          Sound is air vibrating. A synthesizer creates that vibration from scratch — no strings, no reeds, just math.
        </p>
        <p className="text-sm font-sans text-hw-body leading-relaxed mb-4">
          An analog synth works by generating a raw waveform and then routing it through a chain of shapers — filter, envelope, effects — until it sounds like something interesting. Everything you heard above followed that exact path.
        </p>
        <SignalFlowDiagram />
      </section>

      {/* Waveforms */}
      <section>
        <SectionHeader color="bg-amber-500" title="Waveforms — where sound starts" />
        <p className="text-sm font-sans text-hw-body leading-relaxed mb-2">
          Everything starts with a waveform — the shape of the repeating vibration. Sine waves are the purest sound, a single frequency with nothing extra. Square waves add hollow overtones that give you that classic video-game buzz. Sawtooth waves are the richest — packed with harmonics, they're the workhorse of dance music and leads.
        </p>
        <p className="text-sm font-sans text-hw-body leading-relaxed mb-4">
          The more harmonics a wave has, the more texture it has. A sine is a solo voice; a sawtooth is a whole choir.
        </p>
        <WaveformDiagram />
      </section>

      {/* Filters */}
      <section>
        <SectionHeader color="bg-sky-500" title="Filter — sculpting the tone" />
        <p className="text-sm font-sans text-hw-body leading-relaxed mb-2">
          A filter removes certain frequencies. Low-pass (LP) cuts everything above the cutoff — turn it down and the sound gets darker, like a blanket over a speaker. High-pass (HP) strips out the bass. Band-pass (BP) lets only a narrow slice through.
        </p>
        <p className="text-sm font-sans text-hw-body leading-relaxed mb-4">
          Resonance boosts the frequencies right at the cutoff edge. Crank it up and you get that distinctive wah effect — the sound seems to talk.
        </p>
        <FilterDiagram />
      </section>

      {/* Envelope */}
      <section>
        <SectionHeader color="bg-emerald-500" title="Envelope (ADSR) — shaping sound over time" />
        <p className="text-sm font-sans text-hw-body leading-relaxed mb-2">
          The envelope explains why a piano and an organ sound different at the same note. It's the shape of the volume over time — how quickly it swells, and how long it fades.
        </p>
        <p className="text-sm font-sans text-hw-body leading-relaxed mb-4">
          <span className="text-emerald-700">Attack</span> — time to rise to full volume.{' '}
          <span className="text-emerald-700">Decay</span> — how quickly it drops to the sustain level.{' '}
          <span className="text-emerald-700">Sustain</span> — the level held while the note is playing (not a time, a level).{' '}
          <span className="text-emerald-700">Release</span> — how long the tail fades after you let go.
        </p>
        <ADSRDiagram />
      </section>

      {/* LFO */}
      <section>
        <SectionHeader color="bg-violet-500" title="LFO — adding movement" />
        <p className="text-sm font-sans text-hw-body leading-relaxed mb-2">
          LFO stands for Low Frequency Oscillator. It's a wave that moves too slowly to hear as pitch, but fast enough to wiggle a parameter back and forth automatically. Think of it as a knob that turns itself.
        </p>
        <p className="text-sm font-sans text-hw-body leading-relaxed mb-4">
          Aim it at the filter and you get a wah sweep. Aim it at pitch and you get vibrato. Aim it at volume and you get tremolo. Rate controls how fast it wiggles; depth controls how much.
        </p>
        <LFODiagram />
      </section>

      {/* Effects */}
      <section>
        <SectionHeader color="bg-rose-500" title="Effects — adding space" />
        <p className="text-sm font-sans text-hw-body leading-relaxed mb-2">
          Reverb simulates a room. A short decay sounds like a bathroom; a long decay sounds like a cathedral. Your ears use this kind of spatial information all the time — reverb makes a sound feel like it exists somewhere.
        </p>
        <p className="text-sm font-sans text-hw-body leading-relaxed mb-4">
          Delay creates repeating echoes. The delay time is the gap between repeats; feedback controls how many times the echo bounces before it disappears. Used lightly, effects add depth. Stacked heavily, they turn a simple tone into an evolving soundscape.
        </p>
        <EffectsDiagram />
      </section>

      </div>
    </article>
  )
}
