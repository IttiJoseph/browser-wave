/**
 * LearningSection — Static educational content below the synth.
 *
 * Covers synthesis basics in signal-chain order with inline SVG diagrams.
 * Accent colors match the corresponding synth panels above.
 */

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
  // Three waveforms side by side: sine, square, sawtooth
  const w = 60, h = 40, pad = 8
  const cy = h / 2
  const amp = 14

  // Sine: one full cycle
  const sinePoints = Array.from({ length: 61 }, (_, i) => {
    const x = pad + (i / 60) * (w - pad * 2)
    const y = cy - Math.sin((i / 60) * Math.PI * 2) * amp
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')

  // Square
  const squarePts = [
    `${pad},${cy}`,
    `${pad},${cy - amp}`,
    `${w / 2},${cy - amp}`,
    `${w / 2},${cy + amp}`,
    `${w - pad},${cy + amp}`,
    `${w - pad},${cy}`,
  ].join(' ')

  // Sawtooth
  const sawPts = [
    `${pad},${cy + amp}`,
    `${w - pad},${cy - amp}`,
    `${w - pad},${cy + amp}`,
  ].join(' ')

  const diagrams = [
    { label: 'Sine', pts: sinePoints, type: 'poly', color: '#f59e0b' },
    { label: 'Square', pts: squarePts, type: 'poly', color: '#f59e0b' },
    { label: 'Sawtooth', pts: sawPts, type: 'poly', color: '#f59e0b' },
  ]

  return (
    <div className="rounded bg-stone-950 border border-stone-800 p-3">
      <div className="flex gap-2">
        {diagrams.map(({ label, pts, color }) => (
          <div key={label} className="flex-1 flex flex-col items-center gap-1">
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-10">
              <line x1={pad} y1={cy} x2={w - pad} y2={cy} stroke="#44403c" strokeWidth="0.5" strokeDasharray="2,2" />
              <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5"
                strokeLinejoin="round" strokeLinecap="round" />
            </svg>
            <span className="text-[10px] font-mono text-stone-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FilterDiagram() {
  // Frequency spectrum with LP/HP/BP zones shown as gradient fills + cutoff line
  const W = 200, H = 56, pad = 8
  const cutX = W * 0.45

  return (
    <div className="rounded bg-stone-950 border border-stone-800 p-3">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-14">
        {/* Filled spectrum bars (decreasing left to right to simulate freq content) */}
        {Array.from({ length: 20 }, (_, i) => {
          const x = pad + i * ((W - pad * 2) / 20)
          const barH = 28 - Math.abs(i - 4) * 1.2
          const passed = x < cutX - 2
          return (
            <rect
              key={i}
              x={x}
              y={H - pad - barH}
              width={(W - pad * 2) / 20 - 1}
              height={barH}
              fill={passed ? '#0ea5e9' : '#292524'}
              rx="1"
            />
          )
        })}
        {/* Cutoff line */}
        <line x1={cutX} y1={pad - 2} x2={cutX} y2={H - pad + 2} stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3,2" />
        {/* Labels */}
        <text x={pad + 2} y={H - 2} fontSize="7" fontFamily="monospace" fill="#57534e">Bass</text>
        <text x={W - 30} y={H - 2} fontSize="7" fontFamily="monospace" fill="#57534e">Treble</text>
        <text x={cutX + 3} y={pad + 6} fontSize="7" fontFamily="monospace" fill="#0ea5e9">Cutoff</text>
      </svg>
    </div>
  )
}

function ADSRDiagram() {
  const W = 200, H = 56, pad = 8
  const aX = pad + 28, dX = pad + 58, sX = pad + 128, rX = W - pad
  const peakY = pad + 4, susY = H - pad - 14, botY = H - pad

  const points = [
    `${pad},${botY}`,
    `${aX},${peakY}`,
    `${dX},${susY}`,
    `${sX},${susY}`,
    `${rX},${botY}`,
  ].join(' ')

  const labels = [
    { x: (pad + aX) / 2 - 4, y: peakY + 8, text: 'A' },
    { x: (aX + dX) / 2 - 3, y: susY - 6, text: 'D' },
    { x: (dX + sX) / 2 - 3, y: susY - 6, text: 'S' },
    { x: (sX + rX) / 2 - 3, y: botY - 4, text: 'R' },
  ]

  return (
    <div className="rounded bg-stone-950 border border-stone-800 p-3">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-14">
        <polyline points={points} fill="none" stroke="#10b981" strokeWidth="1.5"
          strokeLinejoin="round" strokeLinecap="round" />
        {labels.map(({ x, y, text }) => (
          <text key={text} x={x} y={y} fontSize="8" fontFamily="monospace" fill="#10b981">{text}</text>
        ))}
      </svg>
    </div>
  )
}

function LFODiagram() {
  const W = 200, H = 48, pad = 8
  const cy = H / 2
  const amp = 14

  // Slow sine (1.5 cycles over the width)
  const lfoPoints = Array.from({ length: 81 }, (_, i) => {
    const x = pad + (i / 80) * (W - pad * 2)
    const y = cy - Math.sin((i / 80) * Math.PI * 3) * amp
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')

  return (
    <div className="rounded bg-stone-950 border border-stone-800 p-3">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-12">
        {/* Center line */}
        <line x1={pad} y1={cy} x2={W - pad} y2={cy} stroke="#44403c" strokeWidth="0.5" strokeDasharray="3,2" />
        {/* LFO wave */}
        <polyline points={lfoPoints} fill="none" stroke="#7c3aed" strokeWidth="1.5"
          strokeLinejoin="round" strokeLinecap="round" />
        {/* Arrows pointing up/down to show "modulating a parameter" */}
        <text x={W - 52} y={cy - amp - 3} fontSize="7" fontFamily="monospace" fill="#7c3aed">filter up</text>
        <text x={W - 58} y={cy + amp + 9} fontSize="7" fontFamily="monospace" fill="#7c3aed">filter down</text>
      </svg>
    </div>
  )
}

function EffectsDiagram() {
  const W = 200, H = 56, pad = 8
  const midY = H / 2

  // Dry: flat line
  const dryY = midY - 12
  // Wet: decaying echoes (3 pulses)
  const wetY = midY + 12

  const echoPoints = [
    `${pad},${wetY}`,
    `${pad + 10},${wetY - 14}`,
    `${pad + 20},${wetY}`,
    `${pad + 36},${wetY - 9}`,
    `${pad + 46},${wetY}`,
    `${pad + 62},${wetY - 5}`,
    `${pad + 72},${wetY}`,
    `${W - pad},${wetY}`,
  ].join(' ')

  return (
    <div className="rounded bg-stone-950 border border-stone-800 p-3">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-14">
        {/* Dry signal */}
        <line x1={pad} y1={dryY} x2={pad + 30} y2={dryY} stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" />
        <line x1={pad + 30} y1={dryY - 10} x2={pad + 30} y2={dryY + 10} stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" />
        <line x1={pad + 30} y1={dryY} x2={W - pad} y2={dryY} stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2,2" />
        <text x={pad + 2} y={dryY - 4} fontSize="7" fontFamily="monospace" fill="#f43f5e">Dry</text>

        {/* Wet / echoes */}
        <polyline points={echoPoints} fill="none" stroke="#f43f5e" strokeWidth="1.5"
          strokeLinejoin="round" strokeLinecap="round" />
        <text x={pad + 2} y={wetY - 17} fontSize="7" fontFamily="monospace" fill="#f43f5e">Wet</text>
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
        <p className="text-sm font-sans text-hw-body leading-relaxed">
          An analog synth works by generating a raw waveform and then routing it through a chain of shapers — filter, envelope, effects — until it sounds like something interesting. Everything you heard above followed that exact path.
        </p>
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
