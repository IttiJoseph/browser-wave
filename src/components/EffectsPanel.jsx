/**
 * EffectsPanel — Reverb and delay controls.
 *
 * Reverb decay uses a logarithmic slider (0.1–10s) for natural feel.
 * All mix and feedback sliders are linear 0–1.
 */

import Tooltip from './Tooltip.jsx'

const fmtTime = (s) => s < 1 ? `${Math.round(s * 1000)}ms` : `${s.toFixed(2)}s`

// Log scale for reverb decay: 0.1–10s (factor of 100)
const decayToSlider = (s) => (Math.log(s / 0.1) / Math.log(100)) * 100
const sliderToDecay = (v) => parseFloat((0.1 * Math.pow(100, v / 100)).toFixed(2))

export default function EffectsPanel({
  params,
  onReverbMix,
  onReverbDecay,
  onDelayMix,
  onDelayTime,
  onDelayFeedback,
}) {
  const { reverbMix, reverbDecay, delayMix, delayTime, delayFeedback } = params

  return (
    <section className="bg-hw-panel border border-hw-border rounded-lg p-5 h-full">
      {/* Panel header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1.5 h-4 rounded-sm bg-rose-500" />
        <h2 className="text-xs font-mono font-bold tracking-widest text-hw-label uppercase">
          Effects
        </h2>
      </div>

      {/* ── Reverb ─────────────────────────────────────────────────────────── */}

      <div className="mb-2">
        <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Reverb</span>
      </div>

      {/* Reverb Mix */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Mix</span>
            <Tooltip text="How much reverb (room ambience) is blended into the signal." />
          </div>
          <span className="text-sm font-mono text-rose-600 tabular-nums">
            {Math.round(reverbMix * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={reverbMix}
          onChange={(e) => onReverbMix(parseFloat(e.target.value))}
        />
        <div className="flex justify-between mt-1 text-xs font-mono text-hw-muted">
          <span>Dry</span>
          <span>Wet</span>
        </div>
      </div>

      {/* Reverb Decay */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Decay</span>
            <Tooltip text="How long the reverb tail rings out — like the size of the room." />
          </div>
          <span className="text-sm font-mono text-rose-600 tabular-nums">
            {fmtTime(reverbDecay)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={decayToSlider(reverbDecay)}
          onChange={(e) => onReverbDecay(sliderToDecay(parseFloat(e.target.value)))}
        />
        <div className="flex justify-between mt-1 text-xs font-mono text-hw-muted">
          <span>0.1s</span>
          <span>10s</span>
        </div>
      </div>

      {/* ── Delay ──────────────────────────────────────────────────────────── */}

      <div className="border-t border-hw-border pt-5 mb-2">
        <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Delay</span>
      </div>

      {/* Delay Mix */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Mix</span>
            <Tooltip text="How much of the echo effect is blended in." />
          </div>
          <span className="text-sm font-mono text-rose-600 tabular-nums">
            {Math.round(delayMix * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={delayMix}
          onChange={(e) => onDelayMix(parseFloat(e.target.value))}
        />
        <div className="flex justify-between mt-1 text-xs font-mono text-hw-muted">
          <span>Dry</span>
          <span>Wet</span>
        </div>
      </div>

      {/* Delay Time */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Time</span>
            <Tooltip text="The gap between the original signal and each echo repeat." />
          </div>
          <span className="text-sm font-mono text-rose-600 tabular-nums">
            {fmtTime(delayTime)}
          </span>
        </div>
        <input
          type="range"
          min="0.05"
          max="1"
          step="0.01"
          value={delayTime}
          onChange={(e) => onDelayTime(parseFloat(e.target.value))}
        />
        <div className="flex justify-between mt-1 text-xs font-mono text-hw-muted">
          <span>50ms</span>
          <span>1s</span>
        </div>
      </div>

      {/* Delay Feedback */}
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-hw-label tracking-wider uppercase">Feedback</span>
            <Tooltip text="How many times the echo repeats before it fades. High values = long echo trail." />
          </div>
          <span className="text-sm font-mono text-rose-600 tabular-nums">
            {Math.round(delayFeedback * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="0.8"
          step="0.01"
          value={delayFeedback}
          onChange={(e) => onDelayFeedback(parseFloat(e.target.value))}
        />
        <div className="flex justify-between mt-1 text-xs font-mono text-hw-muted">
          <span>None</span>
          <span>Max</span>
        </div>
      </div>
    </section>
  )
}
