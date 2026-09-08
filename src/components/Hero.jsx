import React from 'react'
import { Link } from 'react-router-dom'
import HeroImage from '../assets/Taliasplace hero.jpeg'

const Hero = () => {
  return (
    <section className="min-h-screen bg-black text-white flex items-center">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16">

        <div className="grid min-h-screen grid-cols-1 items-center gap-12 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:py-0">

          {/* Hero Text */}
          <div className="max-w-2xl pt-28 lg:pt-0">

         <p className="mb-5 text-xs font-medium uppercase tracking-[0.4em] text-pink-500 sm:text-sm">
            Professional Makeup Artistry
          </p>

           <h1 className="text-5xl font-medium leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              Beauty that makes
              <span className="block font-display font-semibold text-pink-400">
                you unforgettable.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
              From bridal elegance to full glam, natural beauty and
              unforgettable special moments, Talia creates makeup looks
              designed uniquely for you.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                to="/book-me"
               className="rounded-full bg-pink-600 px-7 py-3 font-medium text-white shadow-lg shadow-pink-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-pink-500"
              >
                Book Me
              </Link>

              <a
                href="#portfolio"
                className="rounded-full border border-white/30 px-7 py-3 font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:border-pink-500 hover:text-pink-500"
              >
                View My Work
              </a>

            </div>

          </div>

          {/* Hero Image */}
          <div className="flex justify-center lg:justify-end lg:pr-4">
            <div className="h-[420px] w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 bg-gray-900 sm:h-[500px]">
                <img
                  src={HeroImage}
                  alt="Talia, professional makeup artist"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Hero