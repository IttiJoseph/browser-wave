/**
 * TransportBar — transport controls, preset buttons, and Winamp-style riff playlist.
 *
 * Layout (top to bottom):
 *   1. Transport row: play/stop button + LCD "now playing" display (cream section)
 *   2. Preset buttons: Winamp SHUFFLE-style with LED dot (cream section)
 *   3. Riff playlist: dark Winamp aesthetic, Drone as first item
 */

// Playlist colors
const DARK_BG    = '#31461D'
const HEADER_BG  = '#263D14'
const GREEN      = '#6edd6e'
const GREEN_DIM  = '#8edd8e'

// Preset button colors (cream section, Winamp-style button shape)
const BTN_BG     = '#ddd5c8'
const BTN_BORDER = '#c8bcaf'
const LED_OFF    = '#a09080'

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
  presets,
  activePresetId,
  onSelectPreset,
}) {
  // Derive "now playing" label
  let nowPlaying = '— — —'
  if (isDroning) nowPlaying = 'DRONE MODE'
  else if (isSequencePlaying && sequences[activeSequenceIndex]) {
    nowPlaying = sequences[activeSequenceIndex].name.toUpperCase()
  }

  const isPlaying = isDroning || isSequencePlaying

  function handlePlayStop() {
    if (isDroning) { onStop(); return }
    if (isSequencePlaying) { onStopSequence(); return }
    onPlay()
  }

  function handleRowClick(rowIndex) {
    if (rowIndex === 0) {
      if (isDroning) onStop()
      else { if (isSequencePlaying) onStopSequence(); onPlay() }
    } else {
      const seqIndex = rowIndex - 1
      const isActiveSeq = isSequencePlaying && activeSequenceIndex === seqIndex
      if (isActiveSeq) onStopSequence()
      else { if (isDroning) onStop(); onStartSequence(seqIndex) }
    }
  }

  const rows = [
    { label: 'DRONE MODE', active: isDroning },
    ...sequences.map((s, i) => ({
      label: s.name,
      active: isSequencePlaying && activeSequenceIndex === i,
    })),
  ]

  return (
    <section className="bg-hw-panel border border-hw-border rounded-lg overflow-hidden h-full flex flex-col">

      {/* ── Transport + LCD display ───────────────────────────────────── */}
      <div className="p-3 flex items-stretch gap-3 border-b border-hw-border">
        {/* Play / Stop button */}
        <button
          onClick={handlePlayStop}
          className="shrink-0 px-3 rounded flex items-center justify-center text-sm font-bold transition-all duration-100"
          style={{
            background: isPlaying ? '#c8bcaf' : BTN_BG,
            border: `1px solid ${BTN_BORDER}`,
            boxShadow: isPlaying
              ? 'inset 1px 1px 0 rgba(0,0,0,0.15), inset -1px -1px 0 rgba(255,255,255,0.2)'
              : 'inset 1px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 0 rgba(0,0,0,0.15)',
            color: isPlaying ? '#2a1f1c' : '#6b5e56',
          }}
          title={isPlaying ? 'Stop' : 'Play'}
        >
          {isPlaying ? '■' : '▶'}
        </button>

        {/* LCD-style now-playing display */}
        <div
          className="flex-1 min-w-0 rounded px-2.5 py-1.5"
          style={{
            background: '#0a0c08',
            border: '1px solid #1a1c18',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(0,0,0,0.3)',
          }}
        >
          <div className="text-[8px] font-mono tracking-widest uppercase mb-0.5" style={{ color: '#2d4a2d' }}>
            Now Playing
          </div>
          <div className="text-xs font-mono font-bold tracking-wider truncate" style={{ color: GREEN }}>
            {nowPlaying}
          </div>
        </div>
      </div>

      {/* ── Presets ───────────────────────────────────────────────────── */}
      <div className="p-3 border-b border-hw-border">
        <div className="text-[9px] font-mono text-hw-label tracking-widest uppercase mb-2">Presets</div>
        <div className="grid grid-cols-3 gap-1.5">
          {presets.map((preset) => {
            const isActive = preset.id === activePresetId
            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                title={preset.description}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded text-left transition-all duration-75"
                style={{
                  background: isActive ? '#c8bcaf' : BTN_BG,
                  border: `1px solid ${BTN_BORDER}`,
                  boxShadow: isActive
                    ? 'inset 1px 1px 0 rgba(0,0,0,0.15), inset -1px -1px 0 rgba(255,255,255,0.2)'
                    : 'inset 1px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 0 rgba(0,0,0,0.15)',
                }}
              >
                {/* LED */}
                <span
                  className="shrink-0"
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '1px',
                    background: isActive ? GREEN : LED_OFF,
                    boxShadow: isActive ? `0 0 5px ${GREEN}, 0 0 2px ${GREEN}` : 'none',
                    display: 'inline-block',
                  }}
                />
                <span
                  className="text-[10px] font-mono tracking-widest uppercase truncate"
                  style={{ color: isActive ? '#2a1f1c' : '#6b5e56' }}
                >
                  {preset.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Playlist ──────────────────────────────────────────────────── */}
      <div
        className="overflow-y-scroll playlist-scroll"
        style={{ background: DARK_BG, scrollbarWidth: 'thin', scrollbarColor: '#456335 #1e2d0f', maxHeight: '125px' }}
      >
        <div
          className="px-3 py-1 text-[9px] font-mono tracking-widest uppercase border-b sticky top-0"
          style={{ background: HEADER_BG, color: GREEN, borderColor: '#1e2128', zIndex: 1 }}
        >
          Playlist
        </div>

        {rows.map((row, i) => (
          <button
            key={i}
            onClick={() => handleRowClick(i)}
            className="w-full text-left flex items-center gap-2 px-3 py-1.5 transition-colors duration-75"
            style={{
              background: row.active ? '#1f2a1f' : 'transparent',
              color: row.active ? GREEN_DIM : GREEN,
              opacity: row.active ? 1 : 0.75,
            }}
          >
            <span className="shrink-0 w-4 text-right text-[10px] font-mono" style={{ color: GREEN }}>
              {i + 1}.
            </span>
            <span className="flex-1 truncate text-xs font-mono tracking-wide">{row.label}</span>
            {row.active && (
              <span className="shrink-0 text-xs" style={{ color: GREEN }}>▶</span>
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
