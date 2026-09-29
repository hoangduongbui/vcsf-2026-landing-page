import About from './components/About/About'
import Agenda from './components/Agenda/Agenda'
import BackToTop from './components/BackToTop/BackToTop'
import Documents from './components/Documents/Documents'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import History from './components/History/History'
import Library from './components/Library/Library'
import LiveStream from './components/LiveStream/LiveStream'
import Partners from './components/Partners/Partners'
import SdgMarquee from './components/SdgMarquee/SdgMarquee'
import Speakers from './components/Speakers/Speakers'
import { useMotion } from './hooks/useMotion'
import { useParallax } from './hooks/useParallax'
import { useReveal } from './hooks/useReveal'
import { LocaleProvider } from './i18n/LocaleContext'

function Page() {
  useMotion()
  useReveal()
  useParallax()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <SdgMarquee />
        <LiveStream />
        <div className="zone-light">
          <History />
          <About />
        </div>
        <Speakers />
        <Agenda />
        <Library />
        <Documents />
        <Partners />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

export default function App() {
  return (
    <LocaleProvider initial="vi">
      <Page />
    </LocaleProvider>
  )
}
