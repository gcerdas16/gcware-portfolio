'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'

export default function TechStack() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const techRef = useRef(null)

  const technologies = [
    'React', 'Next.js', 'TypeScript', 'JavaScript',
    'Node.js', 'Express', 'Python', 'PostgreSQL',
    'Tailwind CSS', 'Git', 'Railway', 'Docker',
    'Selenium', 'Telegram Bots', 'REST APIs', 'JWT',
  ]

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
              targets: '.tech-item',
              opacity: [0, 1],
              scale: [0.95, 1],
              duration: 400,
              delay: anime.stagger(30, { start: 400 }),
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
    <section id="tech-stack" ref={sectionRef} className="min-h-screen px-6 py-32">
      {/* ALINEADO A LA IZQUIERDA como Projects */}
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold opacity-0 leading-tight mb-8"
          >
            Tech Stack
          </h2>
        </div>

        {/* Tech grid - ALINEADO A LA IZQUIERDA */}
        <div ref={techRef} className="flex flex-wrap gap-3">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="tech-item opacity-0 px-5 py-2.5 border border-white/10 text-white/60 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 rounded-full text-sm font-medium cursor-default"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
