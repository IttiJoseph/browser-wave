/**
 * FilterPanel — Filter type, cutoff frequency, and resonance controls.
 *
 * Cutoff uses a logarithmic slider (20–20000 Hz) for natural musical feel.
 * Resonance is linear (0–1), displayed as a percentage.
 */

import Tooltip from './Tooltip.jsx'

// Log scale helpers: 20–20000 Hz (factor of 1000)
const cutoffToSlider = (hz) => (Math.log(hz / 20) / Math.log(1000)) * 100
const sliderToCutoff = (val) => Math.round(20 * Math.pow(1000, val / 100))

const fmtHz = (hz) => hz >= 1000 ? `${(hz / 1000).toFixed(1)} kHz` : `${hz} Hz`

const BTN_BG     = '#ddd5c8'
const BTN_BORDER = '#c8bcaf'
const LED_OFF    = '#a09080'
const SKY        = '#0ea5e9'

const FILTER_TYPES = [
  { value: 'lowpass',  label: 'Low Pass' },
  { value: 'highpass', label: 'High Pass' },
  { value: 'bandpass', label: 'Band Pass' },
]

export default function FilterPanel({ params, onFilterType, onCutoff, onResonance }) {
  const { filterType, filterCutoff, filterResonance } = params

  return (
    <section className="bg-hw-panel border border-hw-border rounded-lg p-5 h-full">
      {/* Panel header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1.5 h-4 rounded-sm bg-sky-500" />
        <h2 className="text-xs font-mono font-bold tracking-widest text-hw-label uppercase">
          Filter
        </h2>
      </div>

      {/* Filter type selector */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Type</span>
          <Tooltip text="Low-pass lets bass through and cuts treble. High-pass does the opposite. Band-pass lets a narrow band through." />
        </div>
        <div className="flex gap-1.5">
          {FILTER_TYPES.map(({ value, label }) => {
            const isActive = filterType === value
            return (
              <button
                key={value}
                onClick={() => onFilterType(value)}
                className="flex-1 flex flex-col items-center gap-1 px-1.5 py-1.5 rounded transition-all duration-75"
                style={{
                  background: isActive ? '#c8bcaf' : BTN_BG,
                  border: `1px solid ${BTN_BORDER}`,
                  boxShadow: isActive
                    ? 'inset 1px 1px 0 rgba(0,0,0,0.15), inset -1px -1px 0 rgba(255,255,255,0.2)'
                    : 'inset 1px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 0 rgba(0,0,0,0.15)',
                  minHeight: '37px',
                }}
              >
                <span style={{
                  width: '5px', height: '5px', borderRadius: '1px', flexShrink: 0, display: 'inline-block',
                  background: isActive ? SKY : LED_OFF,
                  boxShadow: isActive ? `0 0 5px ${SKY}, 0 0 2px ${SKY}` : 'none',
                }} />
                <span className="text-[10px] font-mono tracking-widest uppercase text-center"
                  style={{ color: isActive ? '#2a1f1c' : '#6b5e56' }}>
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Cutoff slider */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Cutoff</span>
            <Tooltip text="The frequency where the filter starts cutting. Lower = darker, higher = brighter." />
          </div>
          <span className="text-sm font-mono text-sky-600 tabular-nums">
            {fmtHz(filterCutoff)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={cutoffToSlider(filterCutoff)}
          onChange={(e) => onCutoff(sliderToCutoff(parseFloat(e.target.value)))}
        />
        <div className="flex justify-between mt-1 text-xs font-mono text-hw-muted">
          <span>20 Hz</span>
          <span>20 kHz</span>
        </div>
      </div>

      {/* Resonance slider */}
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Resonance</span>
            <Tooltip text="Boosts frequencies right at the cutoff point. Crank it up for that classic 'wah' sound." />
          </div>
          <span className="text-sm font-mono text-sky-600 tabular-nums">
            {Math.round(filterResonance * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={filterResonance}
          onChange={(e) => onResonance(parseFloat(e.target.value))}
        />
        <div className="flex justify-between mt-1 text-xs font-mono text-hw-muted">
          <span>Flat</span>
          <span>Squelchy</span>
        </div>
      </div>
    </section>
  )
}
