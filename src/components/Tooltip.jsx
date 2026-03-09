import { useState } from 'react'

export default function Tooltip({ text }) {
  const [visible, setVisible] = useState(false)
  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible(v => !v)}
        className="w-4 h-4 rounded-full border border-stone-600 text-stone-500
                   hover:border-stone-400 hover:text-stone-300 text-[10px]
                   font-mono font-bold leading-none flex items-center justify-center
                   transition-colors duration-100"
        aria-label="More info"
      >
        ?
      </button>
      {visible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50
                         w-48 bg-stone-800 border border-stone-600 rounded
                         px-2.5 py-2 text-xs font-mono text-stone-300 leading-snug
                         pointer-events-none shadow-lg">
          {text}
        </span>
      )}
    </span>
  )
}
