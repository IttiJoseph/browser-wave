import { useState } from 'react'
import { useAudioEngine } from './hooks/useAudioEngine.js'
import { PRESETS } from './audio/presets.js'
import TransportBar from './components/TransportBar.jsx'
import OscillatorPanel from './components/OscillatorPanel.jsx'
import FilterPanel from './components/FilterPanel.jsx'
import EnvelopePanel from './components/EnvelopePanel.jsx'
import LFOPanel from './components/LFOPanel.jsx'
import EffectsPanel from './components/EffectsPanel.jsx'
import Oscilloscope from './components/Oscilloscope.jsx'
import SignalFlowDiagram from './components/SignalFlowDiagram.jsx'
import LearningSection from './components/LearningSection.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [activePanel, setActivePanel] = useState(null)
  const [activePreset, setActivePreset] = useState(null)

  const {
    params,
    isDroning,
    audioReady,
    startDrone,
    stopDrone,
    sequences,
    activeSequenceIndex,
    isSequencePlaying,
    startSequence,
    stopSequence,
    setWaveform,
    setFrequency,
    setAmplitude,
    setFilterType,
    setFilterCutoff,
    setFilterResonance,
    setAttack,
    setDecay,
    setSustain,
    setRelease,
    setLFOWaveform,
    setLFORate,
    setLFODepth,
    setLFOTarget,
    setReverbMix,
    setReverbDecay,
    setDelayMix,
    setDelayTime,
    setDelayFeedback,
    getAnalyser,
    loadPreset,
  } = useAudioEngine()

  return (
    <div className="min-h-screen bg-hw-bg text-hw-body">
      <main className="max-w-5xl mx-auto px-4 py-6">

        {/* Row 1: Hero + Oscilloscope + Signal Flow */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          {/* Hero */}
          <div className="bg-hw-panel border border-hw-border rounded-lg p-5 flex flex-col justify-center">
            <h1 className="text-lg font-mono font-bold tracking-widest text-hw-strong uppercase mb-1">
              Synth Explorer
            </h1>
            <p className="text-xs font-mono text-hw-muted tracking-wider">
              Learn synthesis by playing with it
            </p>
          </div>

          <Oscilloscope getAnalyser={getAnalyser} />

          <SignalFlowDiagram activePanel={activePanel} />
        </div>

        {/* Row 2: Transport+Presets + Oscillator + Filter */}
        <div className="grid grid-cols-3 gap-3 mb-3" style={{ height: '440px' }}>
          <TransportBar
            isDroning={isDroning}
            audioReady={audioReady}
            onPlay={startDrone}
            onStop={stopDrone}
            sequences={sequences}
            activeSequenceIndex={activeSequenceIndex}
            isSequencePlaying={isSequencePlaying}
            onStartSequence={startSequence}
            onStopSequence={stopSequence}
            presets={PRESETS}
            activePresetId={activePreset}
            onSelectPreset={(preset) => { loadPreset(preset); setActivePreset(preset.id) }}
          />

          <div
            className="h-full"
            onPointerEnter={() => setActivePanel('osc')}
            onPointerLeave={() => setActivePanel(null)}
          >
            <OscillatorPanel
              params={params}
              onWaveform={setWaveform}
              onFrequency={setFrequency}
              onAmplitude={setAmplitude}
            />
          </div>

          <div
            className="h-full"
            onPointerEnter={() => setActivePanel('filter')}
            onPointerLeave={() => setActivePanel(null)}
          >
            <FilterPanel
              params={params}
              onFilterType={setFilterType}
              onCutoff={setFilterCutoff}
              onResonance={setFilterResonance}
            />
          </div>
        </div>

        {/* Row 3: Envelope + LFO + Effects */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div
            onPointerEnter={() => setActivePanel('env')}
            onPointerLeave={() => setActivePanel(null)}
          >
            <EnvelopePanel
              params={params}
              onAttack={setAttack}
              onDecay={setDecay}
              onSustain={setSustain}
              onRelease={setRelease}
            />
          </div>

          <div
            onPointerEnter={() => setActivePanel('lfo')}
            onPointerLeave={() => setActivePanel(null)}
          >
            <LFOPanel
              params={params}
              onLFOWaveform={setLFOWaveform}
              onLFORate={setLFORate}
              onLFODepth={setLFODepth}
              onLFOTarget={setLFOTarget}
            />
          </div>

          <div
            onPointerEnter={() => setActivePanel('fx')}
            onPointerLeave={() => setActivePanel(null)}
          >
            <EffectsPanel
              params={params}
              onReverbMix={setReverbMix}
              onReverbDecay={setReverbDecay}
              onDelayMix={setDelayMix}
              onDelayTime={setDelayTime}
              onDelayFeedback={setDelayFeedback}
            />
          </div>
        </div>

      </main>

      <div className="border-t border-hw-border" />
      <LearningSection />
      <Footer />
    </div>
  )
}
