'use client'

import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import { ArrowDown, ArrowUp } from 'lucide-react'

export default function Hero() {
  const nameRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const canvasRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    // Mostrar botón de scroll cuando baje
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)

    // Canvas animation para fondo dinámico
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = 100

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.opacity = Math.random() * 0.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw() {
        ctx.fillStyle = `rgba(255, 214, 10, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Animación BRUTAL del nombre con efecto explosivo
    const timeline = anime.timeline({
      complete: () => setIsLoaded(true)
    })

    // Primero: Flash blanco
    timeline.add({
      targets: '.hero-flash',
      opacity: [0, 0.3, 0],
      duration: 600,
      easing: 'easeOutQuad',
    })

    // Segundo: Primera línea (Gustavo) explota
    timeline.add({
      targets: line1Ref.current?.children,
      opacity: [0, 1],
      scale: [3, 1],
      translateY: [100, 0],
      translateZ: 0,
      rotateZ: [15, 0],
      duration: 1200,
      delay: anime.stagger(40),
      easing: 'easeOutExpo',
    }, '-=400')

    // Tercero: Segunda línea (Cerdas) explota
    timeline.add({
      targets: line2Ref.current?.children,
      opacity: [0, 1],
      scale: [3, 1],
      translateY: [100, 0],
      translateZ: 0,
      rotateZ: [-15, 0],
      duration: 1200,
      delay: anime.stagger(40),
      easing: 'easeOutExpo',
    }, '-=1000')

    // Cuarto: Glitch effect
    timeline.add({
      targets: nameRef.current,
      translateX: [
        { value: -5, duration: 100 },
        { value: 5, duration: 100 },
        { value: -3, duration: 100 },
        { value: 0, duration: 100 },
      ],
      easing: 'easeInOutQuad',
    }, '-=800')

    // Quinto: Título con wave effect
    timeline.add({
      targets: titleRef.current?.children,
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 800,
      delay: anime.stagger(30),
      easing: 'easeOutExpo',
    }, '-=600')

    // Sexto: Descripción fade in dramático
    timeline.add({
      targets: descRef.current,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1000,
      easing: 'easeOutExpo',
    }, '-=400')

    // Séptimo: CTA con bounce
    timeline.add({
      targets: ctaRef.current,
      opacity: [0, 1],
      scale: [0.8, 1.05, 1],
      duration: 800,
      easing: 'easeOutElastic(1, .6)',
    }, '-=400')

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden py-32">
        {/* Canvas para partículas de fondo */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 pointer-events-none opacity-40"
        />

        {/* Flash blanco inicial */}
        <div className="hero-flash absolute inset-0 bg-white opacity-0 pointer-events-none" />

        {/* Grid animado de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 hero-grid"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 214, 10, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 214, 10, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
            }}
          />
        </div>

        {/* Gradient orbs - AMARILLO */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Contenido con MUCHO MÁS ESPACIO */}
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Nombre gigante - MÁS ESPACIO ABAJO */}
          <div ref={nameRef} className="relative mb-32">
            <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold leading-[0.9] tracking-tighter hero-title">
              <div ref={line1Ref} className="mb-6">
                <span className="inline-block opacity-0">G</span>
                <span className="inline-block opacity-0">u</span>
                <span className="inline-block opacity-0">s</span>
                <span className="inline-block opacity-0">t</span>
                <span className="inline-block opacity-0">a</span>
                <span className="inline-block opacity-0">v</span>
                <span className="inline-block opacity-0">o</span>
              </div>
              <div ref={line2Ref}>
                <span className="inline-block opacity-0 text-yellow-400">C</span>
                <span className="inline-block opacity-0 text-yellow-400">e</span>
                <span className="inline-block opacity-0 text-yellow-400">r</span>
                <span className="inline-block opacity-0 text-yellow-400">d</span>
                <span className="inline-block opacity-0 text-yellow-400">a</span>
                <span className="inline-block opacity-0 text-yellow-400">s</span>
              </div>
            </h1>

            {/* Glitch overlay - AMARILLO */}
            {isLoaded && (
              <div className="absolute inset-0 pointer-events-none opacity-0 hero-glitch">
                <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold leading-[0.9] tracking-tighter text-yellow-400">
                  <div className="mb-6">Gustavo</div>
                  <div>Cerdas</div>
                </h1>
              </div>
            )}
          </div>

          {/* Título - MÁS ESPACIO */}
          <p 
            ref={titleRef}
            className="text-xl md:text-2xl lg:text-3xl font-medium text-white/40 mb-32"
          >
            <span className="inline-block opacity-0">AI</span>{' '}
            <span className="inline-block opacity-0">Engineer</span>{' '}
            <span className="inline-block opacity-0">&</span>{' '}
            <span className="inline-block opacity-0">Automation</span>{' '}
            <span className="inline-block opacity-0">Specialist</span>
          </p>

          {/* Descripción - MÁS ESPACIO */}
          <p 
            ref={descRef}
            className="text-sm md:text-base text-white/20 max-w-2xl mx-auto mb-32 opacity-0 hero-desc uppercase tracking-wider leading-loose"
          >
            Building digital solutions that automate the mundane,<br className="hidden md:block" />
            empowering people to focus on what truly matters
          </p>

          {/* CTA - AMARILLO */}
          <div ref={ctaRef} className="opacity-0">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 text-sm font-medium px-8 py-4 border border-yellow-400/30 hover:border-yellow-400 hover:bg-yellow-400/10 rounded-full transition-all duration-300 group"
            >
              <span className="text-white/60 group-hover:text-yellow-400 transition-colors">View my work</span>
              <ArrowDown size={16} className="text-yellow-400 transform group-hover:translate-y-1 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Scroll indicator - AMARILLO */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-20 bg-gradient-to-b from-yellow-400/50 to-transparent"></div>
        </div>
      </section>

      {/* Botón Scroll to Top - AMARILLO */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full shadow-lg transition-all duration-300 transform ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </>
  )
}
