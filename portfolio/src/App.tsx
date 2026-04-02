import { memo } from 'react'
import { Header } from './components/layout/Header'
import { ScrollSpy } from './components/layout/ScrollSpy'
import { ThemeBridge } from './components/layout/ThemeBridge'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Experience } from './components/sections/Experience'
import { Footer } from './components/sections/Footer'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'

const App = memo(function App() {
  return (
    <div className="bg-page relative min-h-svh overflow-x-hidden">
      <ThemeBridge />
      <ScrollSpy />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
})

export default App
