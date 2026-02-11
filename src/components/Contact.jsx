'use client'

import { useState, useEffect, useRef } from 'react'
import anime from 'animejs'
import { Send, Mail, Github, MapPin } from 'lucide-react'

export default function Contact() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle, sending, success

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: titleRef.current,
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 800,
              easing: 'easeOutExpo',
            })

            anime({
              targets: '.form-container',
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: 400,
              easing: 'easeOutExpo',
            })

            anime({
              targets: infoRef.current?.children,
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 600,
              delay: anime.stagger(100, { start: 800 }),
              easing: 'easeOutExpo',
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    
    // Redirigir a mailto
    setTimeout(() => {
      window.location.href = `mailto:gustavocerdas@gcwarecr.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}%0A%0AFrom: ${formData.email}`
      setStatus('success')
      
      setTimeout(() => {
        setStatus('idle')
        setFormData({ name: '', email: '', message: '' })
      }, 2000)
    }, 1000)
  }

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen px-6 py-32">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="mb-16">
          <h2 
            ref={titleRef}
            className="text-6xl md:text-7xl lg:text-8xl font-bold opacity-0 leading-tight mb-6"
          >
            Let's work<br />together
          </h2>
          <p className="text-white/40 text-lg">Have a project in mind? Let's make it happen.</p>
        </div>

        {/* FORMULARIO */}
        <div className="form-container opacity-0 mb-20">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-yellow-400 transition-all duration-300 placeholder:text-white/30 text-lg hover:bg-white/10"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-yellow-400 transition-all duration-300 placeholder:text-white/30 text-lg hover:bg-white/10"
              />
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project"
                required
                rows={6}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-yellow-400 transition-all duration-300 resize-none placeholder:text-white/30 text-lg hover:bg-white/10"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`w-full group flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-medium text-lg transition-all duration-300 transform hover:scale-[1.02] ${
                  status === 'success'
                    ? 'bg-green-400 text-black'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-black'
                } disabled:opacity-50 shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40`}
              >
                {status === 'sending' && (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                )}
                {status === 'success' && (
                  <>
                    <Send size={20} />
                    <span>Message Sent!</span>
                  </>
                )}
                {status === 'idle' && (
                  <>
                    <span>Send Message</span>
                    <Send size={20} className="transform group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* INFORMACIÓN DE CONTACTO ABAJO */}
        <div ref={infoRef} className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="opacity-0 text-center p-6 border border-white/5 rounded-2xl hover:border-yellow-400/30 transition-all duration-300">
            <Mail className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
            <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Email</p>
            <a 
              href="mailto:gustavocerdas@gcwarecr.com"
              className="text-sm text-white/80 hover:text-yellow-400 transition-colors break-all"
            >
              gustavocerdas@gcwarecr.com
            </a>
          </div>

          <div className="opacity-0 text-center p-6 border border-white/5 rounded-2xl hover:border-yellow-400/30 transition-all duration-300">
            <Github className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
            <p className="text-xs uppercase tracking-widest text-white/40 mb-2">GitHub</p>
            <a 
              href="https://github.com/gcerdas16"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/80 hover:text-yellow-400 transition-colors"
            >
              github.com/gcerdas16
            </a>
          </div>

          <div className="opacity-0 text-center p-6 border border-white/5 rounded-2xl hover:border-yellow-400/30 transition-all duration-300">
            <MapPin className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
            <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Location</p>
            <p className="text-sm text-white/80">San José, Costa Rica</p>
          </div>
        </div>

        {/* Disponibilidad */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-white/5 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className="text-sm text-white/60">Available for freelance projects</p>
          </div>
        </div>
      </div>
    </section>
  )
}
