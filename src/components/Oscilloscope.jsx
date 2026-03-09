/**
 * Oscilloscope — real-time waveform display at 60fps via Canvas + requestAnimationFrame.
 *
 * Reads Float32Array waveform data from Tone.Analyser (1024 samples, -1 to 1).
 * Renders with a retro military green CRT aesthetic: dark green bg, grid, phosphor glow.
 *
 * Grid is data-accurate:
 *   - Horizontal lines at every 10% of amplitude range (-1 to 1 mapped to 0–100% height)
 *   - Vertical lines at every 10% of the time window
 */

import { useEffect, useRef } from 'react'

const BG       = '#31461D'
const GRID     = '#3D582E'
const GRID_MID = '#4D6E3A'   // slightly brighter center line
const WAVE     = '#6edd6e'
const GLOW     = '#4ade80'

export default function Oscilloscope({ getAnalyser }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const cssW = canvas.offsetWidth
    const cssH = canvas.offsetHeight
    canvas.width  = cssW * dpr
    canvas.height = cssH * dpr

    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)

    let rafId

    const draw = () => {
      rafId = requestAnimationFrame(draw)

      const analyser = getAnalyser()
      const data = analyser ? analyser.getValue() : null
      const w = cssW
      const h = cssH

      // ── Background ──────────────────────────────────────────────────────────
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, w, h)

      // ── Grid — 10×10 divisions ───────────────────────────────────────────────
      ctx.lineWidth = 0.5
      for (let i = 0; i <= 10; i++) {
        const isMid = i === 5
        ctx.strokeStyle = isMid ? GRID_MID : GRID

        // Horizontal (amplitude axis: data 1→top, -1→bottom, 0→center)
        const y = (i / 10) * h
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()

        // Vertical (time axis)
        const x = (i / 10) * w
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }

      // ── Waveform ─────────────────────────────────────────────────────────────
      const isIdle = !data || data.every(v => v === 0)

      ctx.lineWidth = 1.5
      ctx.lineJoin = 'round'
      ctx.lineCap  = 'round'

      // Outer glow pass
      ctx.strokeStyle = GLOW
      ctx.shadowColor = GLOW
      ctx.shadowBlur  = 8
      ctx.globalAlpha = 0.4
      ctx.beginPath()
      if (isIdle) {
        ctx.moveTo(0, h / 2)
        ctx.lineTo(w, h / 2)
      } else {
        const sw = w / data.length
        for (let i = 0; i < data.length; i++) {
          const x = i * sw
          const y = ((1 - data[i]) / 2) * h
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      // Sharp foreground pass
      ctx.strokeStyle = WAVE
      ctx.shadowBlur  = 0
      ctx.globalAlpha = 1
      ctx.beginPath()
      if (isIdle) {
        ctx.moveTo(0, h / 2)
        ctx.lineTo(w, h / 2)
      } else {
        const sw = w / data.length
        for (let i = 0; i < data.length; i++) {
          const x = i * sw
          const y = ((1 - data[i]) / 2) * h
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
    }

    draw()
    return () => cancelAnimationFrame(rafId)
  }, [getAnalyser])

  return (
    <section style={{
      background: 'linear-gradient(150deg, #3a3835 0%, #252320 55%, #1f1d1b 100%)',
      borderRadius: '14px',
      padding: '18px',
      boxShadow:
        '0 2px 6px rgba(0,0,0,0.5),' +
        'inset 0 3px 0 rgba(255,255,255,0.20),' +
        'inset 0 -4px 0 rgba(0,0,0,0.55),' +
        'inset 3px 0 0 rgba(255,255,255,0.08),' +
        'inset -3px 0 0 rgba(0,0,0,0.4)',
    }}>
      {/* Screen */}
      <div style={{
        borderRadius: '10px',
        overflow: 'hidden',
        background: BG,
        border: '1px solid #3D582E',
        boxShadow: 'inset 0 0 24px rgba(0,0,0,0.55)',
      }}>
        <canvas
          ref={canvasRef}
          className="w-full block"
          style={{ height: '108px', display: 'block' }}
        />
      </div>
    </section>
  )
}
