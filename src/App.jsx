import Background          from './components/Background'
import Navbar              from './components/Navbar'
import CustomCursor        from './components/CustomCursor'
import AiChat              from './components/AiChat'
import ScrollProgress      from './components/ScrollProgress'
import Hero                from './sections/Hero'
import About               from './sections/About'
import Services            from './sections/Services'
import Projects            from './sections/Projects'
import Skills              from './sections/Skills'
import Contact             from './sections/Contact'
import PlaceholderSection  from './sections/PlaceholderSection'

export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <AiChat />
      <Background>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </Background>
    </>
  )
}
