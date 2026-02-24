/**
 * FilterPanel — Filter type, cutoff frequency, and resonance controls.
 *
 * Cutoff uses a logarithmic slider (20–20000 Hz) for natural musical feel.
 * Resonance is linear (0–1), displayed as a percentage.
 */

// Log scale helpers: 20–20000 Hz (factor of 1000)
const cutoffToSlider = (hz) => (Math.log(hz / 20) / Math.log(1000)) * 100
const sliderToCutoff = (val) => Math.round(20 * Math.pow(1000, val / 100))

const fmtHz = (hz) => hz >= 1000 ? `${(hz / 1000).toFixed(1)} kHz` : `${hz} Hz`

const FILTER_TYPES = [
  { value: 'lowpass',  label: 'LP' },
  { value: 'highpass', label: 'HP' },
  { value: 'bandpass', label: 'BP' },
]

export default function FilterPanel({ params, onFilterType, onCutoff, onResonance }) {
  const { filterType, filterCutoff, filterResonance } = params

  return (
    <section className="bg-stone-900 border border-stone-800 rounded-lg p-5">
      {/* Panel header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1.5 h-4 rounded-sm bg-sky-500" />
        <h2 className="text-xs font-mono font-bold tracking-widest text-stone-400 uppercase">
          Filter
        </h2>
      </div>

      {/* Filter type selector */}
      <div className="mb-6">
        <label className="block text-xs font-mono text-stone-500 mb-2 tracking-wider uppercase">
          Type
        </label>
        <div className="flex rounded overflow-hidden border border-stone-700">
          {FILTER_TYPES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onFilterType(value)}
              className={`flex-1 py-2 text-xs font-mono tracking-wider uppercase transition-colors duration-100
                ${filterType === value
                  ? 'bg-sky-600 text-white font-bold'
                  : 'bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-stone-200'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Cutoff slider */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <label className="text-xs font-mono text-stone-500 tracking-wider uppercase">
            Cutoff
          </label>
          <span className="text-sm font-mono text-sky-400 tabular-nums">
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
          style={{ '--thumb-color': '#0ea5e9' }}
        />
        <div className="flex justify-between mt-1 text-xs font-mono text-stone-600">
          <span>20 Hz</span>
          <span>20 kHz</span>
        </div>
      </div>

      {/* Resonance slider */}
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <label className="text-xs font-mono text-stone-500 tracking-wider uppercase">
            Resonance
          </label>
          <span className="text-sm font-mono text-sky-400 tabular-nums">
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
        <div className="flex justify-between mt-1 text-xs font-mono text-stone-600">
          <span>Flat</span>
          <span>Squelchy</span>
        </div>
      </div>
    </section>
  )
}
