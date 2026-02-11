'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'

export default function About() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)

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
              targets: contentRef.current?.children,
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 600,
              delay: anime.stagger(100, { start: 300 }),
              easing: 'easeOutExpo',
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="min-h-screen flex items-center px-6 py-32">
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          {/* Left - Título */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40 mb-4">About</p>
            <h2 
              ref={titleRef}
              className="text-5xl md:text-6xl font-bold opacity-0 leading-tight"
            >
              Transforming ideas into efficient solutions
            </h2>
          </div>

          {/* Right - Contenido */}
          <div ref={contentRef} className="space-y-8">
            <div className="opacity-0 space-y-6 text-white/60 leading-relaxed text-lg">
              <p>
                <span className="text-white">AI Engineer & Automation Specialist</span> based in <span className="text-white">San José, Costa Rica</span>, 
                with over <span className="text-white">3 years</span> of experience building digital products 
                that solve real problems.
              </p>
              
              <p>
                My philosophy: <span className="text-yellow-400">automate the repetitive, elevate the human</span>. 
                From meteorological monitoring systems to B2B platforms, I specialize in creating solutions 
                that free people to focus on high-value work.
              </p>
            </div>

            <div className="opacity-0 pt-8 border-t border-white/5">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Experience</p>
                  <p className="text-3xl font-bold">3+ Years</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Projects</p>
                  <p className="text-3xl font-bold">7+ Delivered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
