/**
 * TransportBar — Play/Stop drone toggle.
 *
 * The onClick on the PLAY button triggers the first user gesture,
 * which allows Tone.start() to unlock the AudioContext (browser autoplay policy).
 */
export default function TransportBar({ isDroning, audioReady, onPlay, onStop }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950">
      {/* App title */}
      <div>
        <h1 className="text-base font-mono font-bold tracking-widest text-stone-100 uppercase">
          Synth Explorer
        </h1>
        <p className="text-xs text-stone-500 font-mono tracking-wider mt-0.5">
          Analog Synthesizer
        </p>
      </div>

      {/* Transport controls */}
      <div className="flex items-center gap-4">
        {!audioReady && (
          <span className="text-xs text-stone-500 font-mono">
            Click PLAY to activate audio
          </span>
        )}

        <button
          onClick={isDroning ? onStop : onPlay}
          className={`flex items-center gap-2 px-5 py-2 rounded font-mono text-sm font-bold tracking-widest uppercase transition-all duration-150
            ${isDroning
              ? 'bg-red-700 hover:bg-red-600 text-white'
              : 'bg-amber-600 hover:bg-amber-500 text-stone-950'
            }`}
        >
          <span className="text-base leading-none">
            {isDroning ? '■' : '▶'}
          </span>
          <span>{isDroning ? 'Stop' : 'Play Drone'}</span>
        </button>
      </div>
    </header>
  )
}
