# Sequence Reference: Note Patterns for Synth Explorer

These are the note sequences for Claude Code to implement in `src/audio/sequences.js`.
Each sequence is 1–2 bars of the main synth riff, designed to loop.

All sequences use Tone.js note format: `"NoteOctave"` (e.g., `"C4"` = middle C).
Durations use Tone.js shorthand: `"4n"` = quarter note, `"8n"` = eighth note, `"16n"` = sixteenth note.

---

## 1. Nightcall — Kavinsky
- **Key:** A minor
- **Tempo:** 97 BPM
- **Character:** Dark arpeggiated synthwave. 8-note arpeggio per chord.
- **Best with:** Sawtooth, low-pass filter, reverb

```javascript
{
  name: "Nightcall",
  tempo: 97,
  notes: [
    // Am arpeggio
    { note: "A2", duration: "8n", time: "0:0:0" },
    { note: "E3", duration: "8n", time: "0:0:2" },
    { note: "A3", duration: "8n", time: "0:1:0" },
    { note: "C4", duration: "8n", time: "0:1:2" },
    // G/B arpeggio
    { note: "B2", duration: "8n", time: "0:2:0" },
    { note: "D3", duration: "8n", time: "0:2:2" },
    { note: "G3", duration: "8n", time: "0:3:0" },
    { note: "B3", duration: "8n", time: "0:3:2" },
    // F arpeggio
    { note: "F2", duration: "8n", time: "1:0:0" },
    { note: "C3", duration: "8n", time: "1:0:2" },
    { note: "F3", duration: "8n", time: "1:1:0" },
    { note: "A3", duration: "8n", time: "1:1:2" },
    // Dm arpeggio
    { note: "D2", duration: "8n", time: "1:2:0" },
    { note: "A2", duration: "8n", time: "1:2:2" },
    { note: "D3", duration: "8n", time: "1:3:0" },
    { note: "F3", duration: "8n", time: "1:3:2" },
  ]
}
```

---

## 2. Blue Monday — New Order
- **Key:** D minor (Dorian)
- **Tempo:** 130 BPM
- **Character:** Pulsing synth bass with alternating octaves. Punchy and rhythmic.
- **Best with:** Square wave, short decay, low-pass filter

```javascript
{
  name: "Blue Monday",
  tempo: 130,
  notes: [
    // Bar 1 — D minor pulse
    { note: "D2", duration: "16n", time: "0:0:0" },
    { note: "D3", duration: "16n", time: "0:0:2" },
    { note: "D2", duration: "16n", time: "0:1:0" },
    { note: "D3", duration: "16n", time: "0:1:2" },
    { note: "D2", duration: "16n", time: "0:2:0" },
    { note: "D3", duration: "16n", time: "0:2:2" },
    { note: "D2", duration: "16n", time: "0:3:0" },
    { note: "D3", duration: "16n", time: "0:3:2" },
    // Bar 2 — F and C movement
    { note: "F2", duration: "16n", time: "1:0:0" },
    { note: "F3", duration: "16n", time: "1:0:2" },
    { note: "F2", duration: "16n", time: "1:1:0" },
    { note: "F3", duration: "16n", time: "1:1:2" },
    { note: "C2", duration: "16n", time: "1:2:0" },
    { note: "C3", duration: "16n", time: "1:2:2" },
    { note: "C2", duration: "16n", time: "1:3:0" },
    { note: "C3", duration: "16n", time: "1:3:2" },
  ]
}
```

---

## 3. Jump — Van Halen
- **Key:** C major
- **Tempo:** 129 BPM
- **Character:** Big, bright synth stabs. Iconic keyboard intro.
- **Best with:** Sawtooth, bright filter, fast attack

```javascript
{
  name: "Jump",
  tempo: 129,
  notes: [
    // Bar 1 — opening stabs
    { note: "C4", duration: "4n", time: "0:0:0" },
    { note: "E4", duration: "4n", time: "0:0:0" },
    { note: "G4", duration: "4n", time: "0:0:0" },
    { note: "F4", duration: "8n", time: "0:1:2" },
    { note: "A4", duration: "8n", time: "0:1:2" },
    { note: "C5", duration: "8n", time: "0:1:2" },
    { note: "G4", duration: "4n.", time: "0:2:0" },
    { note: "B4", duration: "4n.", time: "0:2:0" },
    { note: "D5", duration: "4n.", time: "0:2:0" },
    // Bar 2 — resolution
    { note: "F4", duration: "4n", time: "1:0:0" },
    { note: "A4", duration: "4n", time: "1:0:0" },
    { note: "C5", duration: "4n", time: "1:0:0" },
    { note: "C4", duration: "2n", time: "1:1:0" },
    { note: "E4", duration: "2n", time: "1:1:0" },
    { note: "G4", duration: "2n", time: "1:1:0" },
  ]
}
```

**Note:** Jump uses chords (multiple simultaneous notes). Since the synth is monophonic, Claude Code should either play the top note only, or use `Tone.PolySynth` for this sequence. Simplest approach: play only the top note of each chord for a monophonic version.

---

## 4. Take On Me — a-ha
- **Key:** A major
- **Tempo:** 169 BPM
- **Character:** Fast, bright, bouncy synth melody. Instantly recognizable.
- **Best with:** Square wave, no filter, short staccato notes

```javascript
{
  name: "Take On Me",
  tempo: 169,
  notes: [
    // Bar 1
    { note: "F#4", duration: "8n", time: "0:0:0" },
    { note: "F#4", duration: "8n", time: "0:0:2" },
    { note: "D4", duration: "8n", time: "0:1:0" },
    { note: "B3", duration: "8n", time: "0:1:2" },
    { note: "B3", duration: "8n", time: "0:2:2" },
    { note: "E4", duration: "8n", time: "0:3:0" },
    { note: "E4", duration: "8n", time: "0:3:2" },
    // Bar 2
    { note: "E4", duration: "8n", time: "1:0:2" },
    { note: "G#4", duration: "8n", time: "1:1:0" },
    { note: "G#4", duration: "8n", time: "1:1:2" },
    { note: "A4", duration: "8n", time: "1:2:0" },
    { note: "B4", duration: "8n", time: "1:2:2" },
    { note: "A4", duration: "8n", time: "1:3:0" },
    { note: "A4", duration: "8n", time: "1:3:2" },
  ]
}
```

---

## 5. Chamber of Reflection — Mac DeMarco
- **Key:** E♭ major
- **Tempo:** 78 BPM
- **Character:** Dreamy, slow, FM-style keyboard melody. Hypnotic and melancholic.
- **Best with:** Sine wave, reverb, slow attack

```javascript
{
  name: "Chamber of Reflection",
  tempo: 78,
  notes: [
    // Bar 1
    { note: "Eb4", duration: "4n", time: "0:0:0" },
    { note: "Bb3", duration: "4n", time: "0:1:0" },
    { note: "Ab3", duration: "4n", time: "0:2:0" },
    { note: "Bb3", duration: "4n", time: "0:3:0" },
    // Bar 2
    { note: "Eb4", duration: "4n", time: "1:0:0" },
    { note: "Bb3", duration: "4n", time: "1:1:0" },
    { note: "Ab3", duration: "2n", time: "1:2:0" },
  ]
}
```

---

## 6. Giorgio by Moroder — Daft Punk
- **Key:** G minor
- **Tempo:** 114 BPM
- **Character:** Driving modular synth sequence. Repetitive, hypnotic, builds energy.
- **Best with:** Sawtooth, resonant filter sweep, LFO on filter

```javascript
{
  name: "Giorgio",
  tempo: 114,
  notes: [
    // Bar 1 — Gm pulsing sequence
    { note: "G2", duration: "16n", time: "0:0:0" },
    { note: "G3", duration: "16n", time: "0:0:2" },
    { note: "Bb2", duration: "16n", time: "0:1:0" },
    { note: "D3", duration: "16n", time: "0:1:2" },
    { note: "G3", duration: "16n", time: "0:2:0" },
    { note: "D3", duration: "16n", time: "0:2:2" },
    { note: "Bb2", duration: "16n", time: "0:3:0" },
    { note: "G2", duration: "16n", time: "0:3:2" },
    // Bar 2 — Cm variation
    { note: "C3", duration: "16n", time: "1:0:0" },
    { note: "C4", duration: "16n", time: "1:0:2" },
    { note: "Eb3", duration: "16n", time: "1:1:0" },
    { note: "G3", duration: "16n", time: "1:1:2" },
    { note: "C4", duration: "16n", time: "1:2:0" },
    { note: "G3", duration: "16n", time: "1:2:2" },
    { note: "Eb3", duration: "16n", time: "1:3:0" },
    { note: "C3", duration: "16n", time: "1:3:2" },
  ]
}
```

---

## 7. Flashing Lights — Kanye West
- **Key:** E major
- **Tempo:** 102 BPM
- **Character:** Smooth, descending synth melody with a wistful quality. Slightly detuned feel.
- **Best with:** Sawtooth, low-pass filter with medium cutoff, reverb + delay

```javascript
{
  name: "Flashing Lights",
  tempo: 102,
  notes: [
    // Bar 1
    { note: "G#4", duration: "8n", time: "0:0:0" },
    { note: "F#4", duration: "8n", time: "0:0:2" },
    { note: "E4", duration: "4n", time: "0:1:0" },
    { note: "C#4", duration: "8n", time: "0:2:0" },
    { note: "B3", duration: "4n", time: "0:2:2" },
    { note: "A3", duration: "8n", time: "0:3:2" },
    // Bar 2
    { note: "G#3", duration: "4n", time: "1:0:0" },
    { note: "A3", duration: "4n", time: "1:1:0" },
    { note: "B3", duration: "4n", time: "1:2:0" },
    { note: "E4", duration: "4n", time: "1:3:0" },
  ]
}
```

---

## Implementation Notes for Claude Code

1. **Use `Tone.Part`** (not `Tone.Sequence`) since notes have specific timing and durations.
2. **Set `loop: true`** on each Part.
3. **Set `Tone.getTransport().bpm.value`** to match the sequence's tempo when selected.
4. **Jump has chords** — since the synth is monophonic (`Tone.MonoSynth`), play only the top note of each chord. Or switch to `Tone.PolySynth` for that sequence only.
5. **These are approximations.** They capture the recognizable character of each riff but are not exact transcriptions. Tweak by ear during testing.
6. **Copyright reminder:** These patterns are from copyrighted songs, used for personal/educational purposes only.
