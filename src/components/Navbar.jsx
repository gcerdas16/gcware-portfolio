'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Github } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold hover:text-yellow-400 transition-colors duration-300">
            GC
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-12">
            <Link
              href="#projects"
              className="text-sm text-white/60 hover:text-white transition-colors duration-300 relative group"
            >
              Work
              <span className="absolute bottom-0 left-0 w-0 h-px bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#about"
              className="text-sm text-white/60 hover:text-white transition-colors duration-300 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-px bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#contact"
              className="text-sm text-white/60 hover:text-white transition-colors duration-300 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-px bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a
              href="https://github.com/gcerdas16"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm px-4 py-2 border border-white/10 hover:border-yellow-400 hover:text-yellow-400 rounded-full transition-all duration-300"
            >
              <Github size={16} />
              GitHub
            </a>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <a
              href="https://github.com/gcerdas16"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-yellow-400 transition-colors duration-300"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
