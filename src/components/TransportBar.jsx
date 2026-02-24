/**
 * TransportBar — Drone toggle + sequence selector.
 *
 * Two mutually exclusive modes:
 *   Drone    — free continuous tone; Play/Stop button in top-right.
 *   Sequence — click a sequence button to start it; click again to stop.
 *              Starting a sequence stops the drone. Starting the drone stops
 *              any playing sequence.
 */
export default function TransportBar({
  isDroning,
  audioReady,
  onPlay,
  onStop,
  sequences,
  activeSequenceIndex,
  isSequencePlaying,
  onStartSequence,
  onStopSequence,
}) {
  return (
    <header className="px-6 pt-4 pb-3 border-b border-stone-800 bg-stone-950">
      {/* Row 1: Title + Drone play/stop */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-base font-mono font-bold tracking-widest text-stone-100 uppercase">
            Synth Explorer
          </h1>
          <p className="text-xs text-stone-500 font-mono tracking-wider mt-0.5">
            Analog Synthesizer
          </p>
        </div>

        <div className="flex items-center gap-4">
          {!audioReady && (
            <span className="text-xs text-stone-500 font-mono">
              Click to activate audio
            </span>
          )}

          <button
            onClick={isDroning ? onStop : onPlay}
            className={`flex items-center gap-2 px-4 py-2 rounded font-mono text-sm font-bold tracking-widest uppercase transition-all duration-150
              ${isDroning
                ? 'bg-red-700 hover:bg-red-600 text-white'
                : 'bg-stone-700 hover:bg-stone-600 text-stone-200'
              }`}
          >
            <span className="text-base leading-none">{isDroning ? '■' : '▶'}</span>
            <span>{isDroning ? 'Stop' : 'Drone'}</span>
          </button>
        </div>
      </div>

      {/* Row 2: Sequence strip */}
      <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {sequences.map((seq, index) => {
          const isActive = activeSequenceIndex === index && isSequencePlaying
          return (
            <button
              key={index}
              onClick={() => isActive ? onStopSequence() : onStartSequence(index)}
              title={`${seq.name} — ${seq.tempo} BPM`}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono tracking-wider whitespace-nowrap transition-colors duration-100
                ${isActive
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-stone-200'
                }`}
            >
              <span className="text-xs leading-none">{isActive ? '■' : '▶'}</span>
              {seq.name}
            </button>
          )
        })}
      </div>
    </header>
  )
}
