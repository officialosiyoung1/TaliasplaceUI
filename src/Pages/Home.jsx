import React from 'react'
import About from '../components/About'
import Services from '../components/Service'
import Hero from '../components/Hero'
import Portfolio from '../components/Portfolio'
import WhyTalia from '../components/WhyTalia'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import Contact from '../components/Contact'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <WhyTalia />
      <Testimonials />
      <Pricing />
      <Contact />
      <CTA />
      <Footer />
    </main>
  )
}

export default Home

// https://dribbble.com/shots/25571331-Etail-landing-page-web-design-3D-animation