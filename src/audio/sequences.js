/**
 * sequences.js — Note sequences for Synth Explorer
 *
 * Each sequence is 2 bars of an iconic synth riff, looping via Tone.Part.
 * Jump's chords are reduced to the top note only (monophonic synth).
 *
 * Architecture rule: NO React, NO DOM, NO state management here.
 * Pure Tone.js. Imports engine.js for note triggering.
 */

import * as Tone from 'tone';
import { triggerNote } from './engine.js';

// ─── Sequence data ──────────────────────────────────────────────────────────

const SEQUENCE_DATA = [
  {
    name: 'Nightcall',
    tempo: 97,
    loopEnd: '2m',
    notes: [
      // Am arpeggio
      { note: 'A2',  duration: '8n', time: '0:0:0' },
      { note: 'E3',  duration: '8n', time: '0:0:2' },
      { note: 'A3',  duration: '8n', time: '0:1:0' },
      { note: 'C4',  duration: '8n', time: '0:1:2' },
      // G/B arpeggio
      { note: 'B2',  duration: '8n', time: '0:2:0' },
      { note: 'D3',  duration: '8n', time: '0:2:2' },
      { note: 'G3',  duration: '8n', time: '0:3:0' },
      { note: 'B3',  duration: '8n', time: '0:3:2' },
      // F arpeggio
      { note: 'F2',  duration: '8n', time: '1:0:0' },
      { note: 'C3',  duration: '8n', time: '1:0:2' },
      { note: 'F3',  duration: '8n', time: '1:1:0' },
      { note: 'A3',  duration: '8n', time: '1:1:2' },
      // Dm arpeggio
      { note: 'D2',  duration: '8n', time: '1:2:0' },
      { note: 'A2',  duration: '8n', time: '1:2:2' },
      { note: 'D3',  duration: '8n', time: '1:3:0' },
      { note: 'F3',  duration: '8n', time: '1:3:2' },
    ],
  },
  {
    name: 'Blue Monday',
    tempo: 130,
    loopEnd: '2m',
    notes: [
      // Bar 1 — D minor pulse
      { note: 'D2', duration: '16n', time: '0:0:0' },
      { note: 'D3', duration: '16n', time: '0:0:2' },
      { note: 'D2', duration: '16n', time: '0:1:0' },
      { note: 'D3', duration: '16n', time: '0:1:2' },
      { note: 'D2', duration: '16n', time: '0:2:0' },
      { note: 'D3', duration: '16n', time: '0:2:2' },
      { note: 'D2', duration: '16n', time: '0:3:0' },
      { note: 'D3', duration: '16n', time: '0:3:2' },
      // Bar 2 — F and C movement
      { note: 'F2', duration: '16n', time: '1:0:0' },
      { note: 'F3', duration: '16n', time: '1:0:2' },
      { note: 'F2', duration: '16n', time: '1:1:0' },
      { note: 'F3', duration: '16n', time: '1:1:2' },
      { note: 'C2', duration: '16n', time: '1:2:0' },
      { note: 'C3', duration: '16n', time: '1:2:2' },
      { note: 'C2', duration: '16n', time: '1:3:0' },
      { note: 'C3', duration: '16n', time: '1:3:2' },
    ],
  },
  {
    name: 'Jump',
    tempo: 129,
    loopEnd: '2m',
    // Monophonic: top note of each chord only
    notes: [
      { note: 'G4', duration: '4n',  time: '0:0:0' },
      { note: 'C5', duration: '8n',  time: '0:1:2' },
      { note: 'D5', duration: '4n.', time: '0:2:0' },
      { note: 'C5', duration: '4n',  time: '1:0:0' },
      { note: 'G4', duration: '2n',  time: '1:1:0' },
    ],
  },
  {
    name: 'Take On Me',
    tempo: 169,
    loopEnd: '2m',
    notes: [
      // Bar 1
      { note: 'F#4', duration: '8n', time: '0:0:0' },
      { note: 'F#4', duration: '8n', time: '0:0:2' },
      { note: 'D4',  duration: '8n', time: '0:1:0' },
      { note: 'B3',  duration: '8n', time: '0:1:2' },
      { note: 'B3',  duration: '8n', time: '0:2:2' },
      { note: 'E4',  duration: '8n', time: '0:3:0' },
      { note: 'E4',  duration: '8n', time: '0:3:2' },
      // Bar 2
      { note: 'E4',  duration: '8n', time: '1:0:2' },
      { note: 'G#4', duration: '8n', time: '1:1:0' },
      { note: 'G#4', duration: '8n', time: '1:1:2' },
      { note: 'A4',  duration: '8n', time: '1:2:0' },
      { note: 'B4',  duration: '8n', time: '1:2:2' },
      { note: 'A4',  duration: '8n', time: '1:3:0' },
      { note: 'A4',  duration: '8n', time: '1:3:2' },
    ],
  },
  {
    name: 'Chamber of Reflection',
    tempo: 131,
    loopEnd: '8m',
    notes: [
      // Bar 1: half rest, then —
      { note: 'Gb5', duration: '4n',  time: '0:2:0' },
      { note: 'Eb5', duration: '4n',  time: '0:3:0' },
      // Bar 2
      { note: 'Bb4', duration: '4n.', time: '1:0:0' },
      { note: 'Cb5', duration: '16n', time: '1:1:2' },
      { note: 'Bb4', duration: '16n', time: '1:1:3' },
      { note: 'Ab4', duration: '2n',  time: '1:2:0' },
      // Bar 3: half rest, then —
      { note: 'Bb4', duration: '4n',  time: '2:2:0' },
      { note: 'Cb5', duration: '4n',  time: '2:3:0' },
      // Bar 4
      { note: 'Db5', duration: '4n.', time: '3:0:0' },
      { note: 'Bb4', duration: '8n',  time: '3:1:2' },
      { note: 'Ab4', duration: '2n',  time: '3:2:0' },
      // Bar 5
      { note: 'F4',  duration: '4n.', time: '4:0:0' },
      { note: 'Gb4', duration: '16n', time: '4:1:2' },
      { note: 'Eb4', duration: '16n', time: '4:1:3' },
      { note: 'Db4', duration: '2n',  time: '4:2:0' },
      // Bar 6: dotted half rest, eighth rest, then —
      { note: 'Db4', duration: '8n',  time: '5:3:2' },
      // Bar 7
      { note: 'Eb4', duration: '8n',  time: '6:0:0' },
      { note: 'Bb3', duration: '8n',  time: '6:0:2' },
      // Bar 8: whole rest (loop restarts)
    ],
  },
  {
    name: 'Giorgio',
    tempo: 114,
    loopEnd: '2m',
    notes: [
      // Bar 1 — Gm pulsing sequence
      { note: 'G2',  duration: '16n', time: '0:0:0' },
      { note: 'G3',  duration: '16n', time: '0:0:2' },
      { note: 'Bb2', duration: '16n', time: '0:1:0' },
      { note: 'D3',  duration: '16n', time: '0:1:2' },
      { note: 'G3',  duration: '16n', time: '0:2:0' },
      { note: 'D3',  duration: '16n', time: '0:2:2' },
      { note: 'Bb2', duration: '16n', time: '0:3:0' },
      { note: 'G2',  duration: '16n', time: '0:3:2' },
      // Bar 2 — Cm variation
      { note: 'C3',  duration: '16n', time: '1:0:0' },
      { note: 'C4',  duration: '16n', time: '1:0:2' },
      { note: 'Eb3', duration: '16n', time: '1:1:0' },
      { note: 'G3',  duration: '16n', time: '1:1:2' },
      { note: 'C4',  duration: '16n', time: '1:2:0' },
      { note: 'G3',  duration: '16n', time: '1:2:2' },
      { note: 'Eb3', duration: '16n', time: '1:3:0' },
      { note: 'C3',  duration: '16n', time: '1:3:2' },
    ],
  },
  {
    name: 'Flashing Lights',
    tempo: 102,
    loopEnd: '2m',
    notes: [
      // Bar 1
      { note: 'G#4', duration: '8n', time: '0:0:0' },
      { note: 'F#4', duration: '8n', time: '0:0:2' },
      { note: 'E4',  duration: '4n', time: '0:1:0' },
      { note: 'C#4', duration: '8n', time: '0:2:0' },
      { note: 'B3',  duration: '4n', time: '0:2:2' },
      { note: 'A3',  duration: '8n', time: '0:3:2' },
      // Bar 2
      { note: 'G#3', duration: '4n', time: '1:0:0' },
      { note: 'A3',  duration: '4n', time: '1:1:0' },
      { note: 'B3',  duration: '4n', time: '1:2:0' },
      { note: 'E4',  duration: '4n', time: '1:3:0' },
    ],
  },
];

// ─── Public metadata (name + tempo only — no note data needed in UI) ─────────

export const SEQUENCE_META = SEQUENCE_DATA.map(({ name, tempo }) => ({ name, tempo }));

// ─── Internal state ──────────────────────────────────────────────────────────

let activePart = null;

// ─── Playback control ────────────────────────────────────────────────────────

/**
 * Start a sequence by index. Stops any currently playing sequence first.
 * Requires AudioContext to be running (call engine.init() first via user gesture).
 * @param {number} index  0–6, matching SEQUENCE_META order
 */
export function startSequence(index) {
  stopSequence();

  const seq = SEQUENCE_DATA[index];
  Tone.getTransport().bpm.value = seq.tempo;

  activePart = new Tone.Part((time, event) => {
    triggerNote(event.note, event.duration, time);
  }, seq.notes.map(n => [n.time, { note: n.note, duration: n.duration }]));

  activePart.loop    = true;
  activePart.loopEnd = seq.loopEnd;
  activePart.start(0);

  Tone.getTransport().start();
}

/**
 * Stop the currently playing sequence and halt the Transport.
 */
export function stopSequence() {
  if (activePart) {
    activePart.stop();
    activePart.dispose();
    activePart = null;
  }
  Tone.getTransport().stop();
}
