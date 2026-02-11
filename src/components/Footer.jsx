export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left - Copyright */}
          <p className="text-sm text-white/30">
            © {currentYear} Gustavo Cerdas. All rights reserved.
          </p>

          {/* Right - Links */}
          <div className="flex gap-8">
            <a
              href="https://github.com/gcerdas16"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/40 hover:text-white transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href="mailto:gustavocerdas@gcwarecr.com"
              className="text-sm text-white/40 hover:text-white transition-colors duration-300"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
