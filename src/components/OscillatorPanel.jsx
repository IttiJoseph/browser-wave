/**
 * OscillatorPanel — Waveform selector, frequency, and amplitude controls.
 *
 * Frequency uses a logarithmic slider (20–2000 Hz) so the control feels
 * natural — equal slider travel = equal musical intervals.
 */

// Log scale helpers: 20–2000 Hz
const freqToSlider = (hz) => (Math.log(hz / 20) / Math.log(100)) * 100
const sliderToFreq = (val) => Math.round(20 * Math.pow(100, val / 100))

const fmtHz = (hz) => hz >= 1000 ? `${(hz / 1000).toFixed(2)} kHz` : `${hz} Hz`

const WAVEFORMS = [
  { value: 'sine',     label: 'Sine' },
  { value: 'square',   label: 'Square' },
  { value: 'sawtooth', label: 'Saw' },
]

export default function OscillatorPanel({ params, onWaveform, onFrequency, onAmplitude }) {
  const { waveform, frequency, amplitude } = params

  return (
    <section className="bg-stone-900 border border-stone-800 rounded-lg p-5">
      {/* Panel header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1.5 h-4 rounded-sm bg-amber-500" />
        <h2 className="text-xs font-mono font-bold tracking-widest text-stone-400 uppercase">
          Oscillator
        </h2>
      </div>

      {/* Waveform selector */}
      <div className="mb-6">
        <label className="block text-xs font-mono text-stone-500 mb-2 tracking-wider uppercase">
          Waveform
        </label>
        <div className="flex rounded overflow-hidden border border-stone-700">
          {WAVEFORMS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onWaveform(value)}
              className={`flex-1 py-2 text-xs font-mono tracking-wider uppercase transition-colors duration-100
                ${waveform === value
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-stone-200'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Frequency slider */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <label className="text-xs font-mono text-stone-500 tracking-wider uppercase">
            Frequency
          </label>
          <span className="text-sm font-mono text-amber-400 tabular-nums">
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
        <div className="flex justify-between mt-1 text-xs font-mono text-stone-600">
          <span>20 Hz</span>
          <span>2 kHz</span>
        </div>
      </div>

      {/* Amplitude slider */}
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <label className="text-xs font-mono text-stone-500 tracking-wider uppercase">
            Amplitude
          </label>
          <span className="text-sm font-mono text-amber-400 tabular-nums">
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
        <div className="flex justify-between mt-1 text-xs font-mono text-stone-600">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </section>
  )
}
