import { Link } from 'react-router-dom'
import React from 'react'


const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 text-white sm:px-10 sm:py-28 lg:px-16 lg:py-32">

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] text-center">

        {/* Eyebrow */}
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-pink-400 sm:text-sm">
          Ready when you are
        </p>

        {/* Heading */}
        <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl xl:text-7xl">
          Your perfect look
          <span className="mt-1 block text-pink-400">
            starts here.
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
          Whether it's your big day, a special event or simply a moment
          to feel beautiful, Talia is ready to create a look you'll love.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link
            to="/book-me"
            className="group inline-flex min-w-[210px] items-center justify-center rounded-full bg-pink-500 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-pink-400 hover:shadow-xl hover:shadow-pink-500/30"
          >
            Book Your Appointment
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <a
            href="#portfolio"
            className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:border-pink-400 hover:bg-pink-500/10 hover:text-pink-400"
          >
            View Portfolio
          </a>

        </div>

      </div>
    </section>
  )
}

export default CTA