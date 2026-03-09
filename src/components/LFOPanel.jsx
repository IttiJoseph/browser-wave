/**
 * LFOPanel — LFO waveform, rate, depth, and target controls.
 *
 * Rate uses a logarithmic slider (0.1–20 Hz) — doubling slider travel
 * feels like equal perceptual speed changes. Depth is linear 0–1.
 * Target selects which audio parameter the LFO modulates.
 * Waveform selector shows SVG wave shapes instead of text labels.
 */

import Tooltip from './Tooltip.jsx'

// Log scale for rate: 0.1–20 Hz (factor of 200)
const rateToSlider = (hz) => (Math.log(hz / 0.1) / Math.log(200)) * 100
const sliderToRate = (v) => parseFloat((0.1 * Math.pow(200, v / 100)).toFixed(2))

// SVG wave path points — viewBox 0 0 48 24, cy=12, amp=8
const W = 48, cy = 12, amp = 8, pad = 4

const sinePts = Array.from({ length: 33 }, (_, i) => {
  const x = pad + (i / 32) * (W - pad * 2)
  const y = cy - Math.sin((i / 32) * Math.PI * 2) * amp
  return `${x.toFixed(1)},${y.toFixed(1)}`
}).join(' ')

const triPts  = `${pad},${cy + amp} ${W / 3},${cy - amp} ${W * 2 / 3},${cy + amp} ${W - pad},${cy - amp}`
const sqrPts  = `${pad},${cy} ${pad},${cy - amp} ${W / 2},${cy - amp} ${W / 2},${cy + amp} ${W - pad},${cy + amp} ${W - pad},${cy}`
const sawPts  = `${pad},${cy + amp} ${W - pad},${cy - amp} ${W - pad},${cy + amp}`

const LFO_WAVEFORMS = [
  { value: 'sine',     label: 'Sine',     pts: sinePts },
  { value: 'triangle', label: 'Triangle', pts: triPts },
  { value: 'square',   label: 'Square',   pts: sqrPts },
  { value: 'sawtooth', label: 'Sawtooth', pts: sawPts },
]

const LFO_TARGETS = [
  { value: 'filter',    label: 'Filter' },
  { value: 'pitch',     label: 'Pitch' },
  { value: 'amplitude', label: 'Amp' },
]

const IDLE_COLOR = '#9e8f84'  // hw-muted

export default function LFOPanel({ params, onLFOWaveform, onLFORate, onLFODepth, onLFOTarget }) {
  const { lfoWaveform, lfoRate, lfoDepth, lfoTarget } = params

  return (
    <section className="bg-hw-panel border border-hw-border rounded-lg p-5">
      {/* Panel header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1.5 h-4 rounded-sm bg-violet-500" />
        <h2 className="text-xs font-mono font-bold tracking-widest text-hw-label uppercase">
          LFO
        </h2>
      </div>

      {/* Waveform selector — SVG wave shapes */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Waveform</span>
          <Tooltip text="The shape of the LFO's modulation cycle. Sine = smooth sweep, square = on/off gate, triangle = linear ramp, sawtooth = one-sided ramp." />
        </div>
        <div className="flex rounded overflow-hidden border border-hw-border">
          {LFO_WAVEFORMS.map(({ value, label, pts }) => {
            const isActive = lfoWaveform === value
            return (
              <button
                key={value}
                onClick={() => onLFOWaveform(value)}
                title={label}
                className={`flex-1 py-2 flex justify-center items-center transition-colors duration-100
                  ${isActive
                    ? 'bg-violet-600'
                    : 'bg-hw-raised hover:bg-hw-border'
                  }`}
              >
                <svg viewBox="0 0 48 24" className="w-8 h-4">
                  <polyline
                    points={pts}
                    fill="none"
                    stroke={isActive ? '#fff' : IDLE_COLOR}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )
          })}
        </div>
      </div>

      {/* Rate slider */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Rate</span>
            <Tooltip text="How fast the LFO oscillates, in cycles per second (Hz)." />
          </div>
          <span className="text-sm font-mono text-violet-600 tabular-nums">
            {lfoRate.toFixed(2)} Hz
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={rateToSlider(lfoRate)}
          onChange={(e) => onLFORate(sliderToRate(parseFloat(e.target.value)))}
        />
        <div className="flex justify-between mt-1 text-xs font-mono text-hw-muted">
          <span>0.1 Hz</span>
          <span>20 Hz</span>
        </div>
      </div>

      {/* Depth slider */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Depth</span>
            <Tooltip text="How much the LFO affects the target. 0 = off, 1 = full modulation range." />
          </div>
          <span className="text-sm font-mono text-violet-600 tabular-nums">
            {Math.round(lfoDepth * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={lfoDepth}
          onChange={(e) => onLFODepth(parseFloat(e.target.value))}
        />
        <div className="flex justify-between mt-1 text-xs font-mono text-hw-muted">
          <span>Off</span>
          <span>Full</span>
        </div>
      </div>

      {/* Target selector */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Target</span>
          <Tooltip text="Which parameter the LFO modulates — filter cutoff, oscillator pitch, or volume." />
        </div>
        <div className="flex rounded overflow-hidden border border-hw-border">
          {LFO_TARGETS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onLFOTarget(value)}
              className={`flex-1 py-2 text-xs font-mono tracking-wider uppercase transition-colors duration-100
                ${lfoTarget === value
                  ? 'bg-violet-600 text-white font-bold'
                  : 'bg-hw-raised text-hw-body hover:bg-hw-border hover:text-hw-strong'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
