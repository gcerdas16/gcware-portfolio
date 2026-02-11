import './globals.css'

export const metadata = {
  title: 'Gustavo Cerdas | Full Stack Developer',
  description: 'Portafolio profesional de Gustavo Cerdas Campos - Full Stack Developer & Automation Specialist',
  keywords: ['Full Stack Developer', 'Next.js', 'React', 'Node.js', 'Python', 'Automation', 'Costa Rica'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
