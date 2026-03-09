/**
 * OscillatorPanel — Waveform selector, frequency, and amplitude controls.
 *
 * Frequency uses a logarithmic slider (20–2000 Hz) so the control feels
 * natural — equal slider travel = equal musical intervals.
 * Waveform selector shows SVG wave shapes instead of text labels.
 */

import Tooltip from './Tooltip.jsx'

// Log scale helpers: 20–2000 Hz
const freqToSlider = (hz) => (Math.log(hz / 20) / Math.log(100)) * 100
const sliderToFreq = (val) => Math.round(20 * Math.pow(100, val / 100))

const fmtHz = (hz) => hz >= 1000 ? `${(hz / 1000).toFixed(2)} kHz` : `${hz} Hz`

// SVG wave path points — viewBox 0 0 48 24, cy=12, amp=8
const W = 48, cy = 12, amp = 8, pad = 4

const sinePts = Array.from({ length: 33 }, (_, i) => {
  const x = pad + (i / 32) * (W - pad * 2)
  const y = cy - Math.sin((i / 32) * Math.PI * 2) * amp
  return `${x.toFixed(1)},${y.toFixed(1)}`
}).join(' ')

const squarePts = `${pad},${cy} ${pad},${cy - amp} ${W / 2},${cy - amp} ${W / 2},${cy + amp} ${W - pad},${cy + amp} ${W - pad},${cy}`

const sawPts = `${pad},${cy + amp} ${W - pad},${cy - amp} ${W - pad},${cy + amp}`

const WAVEFORMS = [
  { value: 'sine',     label: 'Sine',   pts: sinePts },
  { value: 'square',   label: 'Square', pts: squarePts },
  { value: 'sawtooth', label: 'Saw',    pts: sawPts },
]

const IDLE_COLOR = '#9e8f84'  // hw-muted

export default function OscillatorPanel({ params, onWaveform, onFrequency, onAmplitude }) {
  const { waveform, frequency, amplitude } = params

  return (
    <section className="bg-hw-panel border border-hw-border rounded-lg p-5 h-full">
      {/* Panel header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1.5 h-4 rounded-sm bg-amber-500" />
        <h2 className="text-xs font-mono font-bold tracking-widest text-hw-label uppercase">
          Oscillator
        </h2>
      </div>

      {/* Waveform selector — SVG wave shapes */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Waveform</span>
          <Tooltip text="The shape of the sound wave. Sine is pure and smooth, square is buzzy and hollow, sawtooth is bright and cutting." />
        </div>
        <div className="flex rounded overflow-hidden border border-hw-border">
          {WAVEFORMS.map(({ value, label, pts }) => {
            const isActive = waveform === value
            return (
              <button
                key={value}
                onClick={() => onWaveform(value)}
                title={label}
                className={`flex-1 py-2 flex justify-center items-center transition-colors duration-100
                  ${isActive
                    ? 'bg-amber-500'
                    : 'bg-hw-raised hover:bg-hw-border'
                  }`}
              >
                <svg viewBox="0 0 48 24" className="w-10 h-5">
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

      {/* Frequency slider */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Frequency</span>
            <Tooltip text="The pitch of the oscillator in Hz. 440 Hz is concert A." />
          </div>
          <span className="text-sm font-mono text-amber-600 tabular-nums">
            {fmtHz(frequency)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={freqToSlider(frequency)}
          onChange={(e) => onFrequency(sliderToFreq(parseFloat(e.target.value)))}
        />
        <div className="flex justify-between mt-1 text-xs font-mono text-hw-muted">
          <span>20 Hz</span>
          <span>2 kHz</span>
        </div>
      </div>

      {/* Amplitude slider */}
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Amplitude</span>
            <Tooltip text="How loud the oscillator is before it hits the filter and effects." />
          </div>
          <span className="text-sm font-mono text-amber-600 tabular-nums">
            {Math.round(amplitude * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={amplitude}
          onChange={(e) => onAmplitude(parseFloat(e.target.value))}
        />
        <div className="flex justify-between mt-1 text-xs font-mono text-hw-muted">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </section>
  )
}
