export default function Footer() {
  return (
    <footer className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between border-t border-hw-border">
      <div>
        <span className="text-xs font-mono font-bold text-hw-body tracking-widest uppercase">
          Synth Explorer
        </span>
        <span className="text-xs font-mono text-hw-muted ml-3">
          An interactive guide to analog synthesis
        </span>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://github.com/IttiJoseph/synth-explorer"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-hw-label hover:text-hw-strong tracking-wider uppercase transition-colors duration-100"
        >
          GitHub
        </a>
        <a
          href="https://itti.framer.website/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-hw-label hover:text-hw-strong tracking-wider uppercase transition-colors duration-100"
        >
          Portfolio
        </a>
      </div>
    </footer>
  )
}
