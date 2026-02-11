'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { ArrowUpRight } from 'lucide-react'

export default function Projects() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  const projects = [
    {
      title: 'VHelicopters',
      description: 'Automated meteorological monitoring system with satellite images and METAR reports via Telegram.',
      tech: ['Python', 'Selenium', 'Telegram Bot'],
      link: 'https://github.com/gcerdas16/VH-Weather-Bot',
      year: '2025',
    },
    {
      title: 'Expense Tracker',
      description: 'Financial management platform with Gmail integration, authentication, and real-time data visualization.',
      tech: ['Next.js', 'TypeScript', 'Tailwind'],
      link: 'https://github.com/gcerdas16/expense-tracking-dashboard-',
      year: '2025',
    },
    {
      title: 'Corporación Argom',
      description: 'B2B purchase order system with REST API and PDF generation.',
      tech: ['Node.js', 'PostgreSQL', 'JWT'],
      link: null,
      year: '2024',
    },
    {
      title: 'WWT Pricing Strategy',
      description: 'Multi-step data collection platform feeding AI pricing engine.',
      tech: ['React', 'Vite', 'Tailwind'],
      link: null,
      year: '2025',
    },
    {
      title: 'CAROLA',
      description: 'Cost control system for bakery with inventory, production tracking, and FIFO costing.',
      tech: ['Fastify', 'React', 'PostgreSQL', 'Prisma'],
      link: null,
      year: '2026',
    },
    {
      title: 'DSD Billing System',
      description: 'Electronic invoicing system for Costa Rica with CRLibre integration and barcode scanner.',
      tech: ['React', 'PHP', 'PWA', 'CRLibre'],
      link: null,
      year: '2026',
    },
    {
      title: 'Distribuidora San Diego',
      description: 'Corporate website with SEO optimization.',
      tech: ['WordPress', 'PHP'],
      link: 'https://www.distribuidorasandiego.com',
      year: '2024',
    },
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
              targets: '.project-item',
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 600,
              delay: anime.stagger(100, { start: 400 }),
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

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen px-6 py-32">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-24">
          <h2 
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold opacity-0"
          >
            Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-item opacity-0 group"
            >
              <a
                href={project.link || '#'}
                target={project.link ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className={`block p-8 border border-white/5 rounded-2xl hover:border-yellow-400/30 transition-all duration-500 h-full ${
                  project.link ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/30">{project.year}</p>
                  </div>
                  {project.link && (
                    <ArrowUpRight 
                      className="text-white/30 group-hover:text-yellow-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0" 
                      size={20} 
                    />
                  )}
                </div>

                {/* Description */}
                <p className="text-white/60 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 border border-white/10 text-white/40 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/gcerdas16"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-yellow-400 transition-colors duration-300 group"
          >
            View more on GitHub
            <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  )
}
