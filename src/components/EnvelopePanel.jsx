/**
 * EnvelopePanel — ADSR controls + reactive SVG envelope shape preview.
 *
 * Attack, Decay, Release use logarithmic sliders (0.001–2s / 0.001–5s) for
 * natural feel — small values (5ms) and large values (2s) both get meaningful
 * travel. Sustain is linear 0–1. The SVG preview reflects changes instantly.
 */

import Tooltip from './Tooltip.jsx'

// Log scale helpers for time parameters
const timeToSlider = (s, min, max) => (Math.log(s / min) / Math.log(max / min)) * 100
const sliderToTime = (v, min, max) =>
  parseFloat((min * Math.pow(max / min, v / 100)).toFixed(4))

const fmtTime = (s) => s < 1 ? `${Math.round(s * 1000)}ms` : `${s.toFixed(2)}s`

// Compute SVG polyline points from ADSR values
// viewBox: 0 0 200 56
// Layout: A+D+R segments share 140px (proportional, log-weighted); S holds 60px
function envelopePoints(attack, decay, sustain, release) {
  const aLog = timeToSlider(attack,  0.001, 2) / 100
  const dLog = timeToSlider(decay,   0.001, 2) / 100
  const rLog = timeToSlider(release, 0.001, 5) / 100
  const total = aLog + dLog + rLog || 1

  const timeW = 140
  const susW  = 60
  const aW = (aLog / total) * timeW
  const dW = (dLog / total) * timeW
  const rW = (rLog / total) * timeW

  // Y: 4 = top (peak), 52 = bottom (silence), sY = sustain level
  const sY = (1 - sustain) * 48 + 4

  return [
    [0,                    52],  // start: silence
    [aW,                    4],  // end of attack: peak
    [aW + dW,             sY],  // end of decay: sustain level
    [aW + dW + susW,      sY],  // end of sustain: still at sustain level
    [aW + dW + susW + rW, 52],  // end of release: silence
  ].map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
}

export default function EnvelopePanel({ params, onAttack, onDecay, onSustain, onRelease }) {
  const { attack, decay, sustain, release } = params
  const points = envelopePoints(attack, decay, sustain, release)

  return (
    <section className="bg-hw-panel border border-hw-border rounded-lg p-5">
      {/* Panel header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1.5 h-4 rounded-sm bg-emerald-500" />
        <h2 className="text-xs font-mono font-bold tracking-widest text-hw-label uppercase">
          Envelope
        </h2>
      </div>

      {/* SVG envelope shape preview */}
      <div className="mb-6">
        <div style={{
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid #3D582E',
          boxShadow:
            'inset 0 5px 12px rgba(0,0,0,0.4),' +
            'inset 3px 0 8px rgba(0,0,0,0.25),' +
            'inset 0 0 24px rgba(0,0,0,0.55)',
          position: 'relative',
        }}>
        <svg
          viewBox="0 0 200 56"
          className="w-full h-14"
          preserveAspectRatio="none"
          style={{ background: '#31461D', display: 'block' }}
        >
          <defs>
            <filter id="envGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Horizontal gridlines — y=4 (peak), 16, 28 (50%), 40, 52 (silence) */}
          {[4, 16, 28, 40, 52].map(y => (
            <line key={y} x1="0" y1={y} x2="200" y2={y}
              stroke={y === 28 ? '#4D6E3A' : '#3D582E'} strokeWidth="0.5" />
          ))}

          {/* Vertical gridlines — 4 evenly spaced */}
          {[40, 80, 120, 160].map(x => (
            <line key={x} x1={x} y1="0" x2={x} y2="56"
              stroke="#3D582E" strokeWidth="0.5" />
          ))}

          {/* Envelope curve with phosphor glow */}
          <polyline
            points={points}
            fill="none"
            stroke="#6edd6e"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#envGlow)"
          />
        </svg>
        </div>
      </div>

      {/* Attack */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Attack</span>
            <Tooltip text="How long it takes for the note to reach full volume after you trigger it." />
          </div>
          <span className="text-sm font-mono text-emerald-700 tabular-nums">
            {fmtTime(attack)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={timeToSlider(attack, 0.001, 2)}
          onChange={(e) => onAttack(sliderToTime(parseFloat(e.target.value), 0.001, 2))}
        />
        <div className="flex justify-between mt-1 text-xs font-mono text-hw-muted">
          <span>1ms</span>
          <span>2s</span>
        </div>
      </div>

      {/* Decay */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Decay</span>
            <Tooltip text="How quickly the volume drops from peak down to the sustain level." />
          </div>
          <span className="text-sm font-mono text-emerald-700 tabular-nums">
            {fmtTime(decay)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={timeToSlider(decay, 0.001, 2)}
          onChange={(e) => onDecay(sliderToTime(parseFloat(e.target.value), 0.001, 2))}
        />
        <div className="flex justify-between mt-1 text-xs font-mono text-hw-muted">
          <span>1ms</span>
          <span>2s</span>
        </div>
      </div>

      {/* Sustain */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Sustain</span>
            <Tooltip text="The volume level held while the note is held. (Not a time — it's a level.)" />
          </div>
          <span className="text-sm font-mono text-emerald-700 tabular-nums">
            {Math.round(sustain * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={sustain}
          onChange={(e) => onSustain(parseFloat(e.target.value))}
        />
        <div className="flex justify-between mt-1 text-xs font-mono text-hw-muted">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Release */}
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Release</span>
            <Tooltip text="How long the sound takes to fade out after the note is released." />
          </div>
          <span className="text-sm font-mono text-emerald-700 tabular-nums">
            {fmtTime(release)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={timeToSlider(release, 0.001, 5)}
          onChange={(e) => onRelease(sliderToTime(parseFloat(e.target.value), 0.001, 5))}
        />
        <div className="flex justify-between mt-1 text-xs font-mono text-hw-muted">
          <span>1ms</span>
          <span>5s</span>
        </div>
      </div>
    </section>
  )
}
