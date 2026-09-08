import React from 'react'

const About = () => {
  return (
   <section id="about"
    className="bg-white py-20 text-black sm:py-20 sm:py-24 lg:py-28 lg:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* About Text */}
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-pink-500">
              About Talia
            </p>

           <h2 className="max-w-xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.02em] sm:text-5xl">
              Makeup that enhances
              <span className="block text-pink-500">
                who you already are.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Talia is a professional makeup artist passionate about creating
              beautiful, confident and unforgettable looks for every occasion.
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Whether you want soft and natural, elegant bridal makeup or
              full glam, every look is carefully created to complement your
              features, personality and occasion.
            </p>
          </div>

          {/* About Details */}
          <div className="grid gap-5 sm:grid-cols-2">

            <div className="rounded-3xl border border-black/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-pink-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold">
                Personalized
              </h3>

              <p className="mt-3 text-gray-600">
                Every makeup look is tailored to you and your individual style.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-pink-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold">
                Professional
              </h3>

              <p className="mt-3 text-gray-600">
                Quality products, attention to detail and a professional
                experience from start to finish.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-pink-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold">
                Versatile
              </h3>

              <p className="mt-3 text-gray-600">
                From natural beauty to full glam, Talia creates looks for
                every occasion.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-pink-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold">
                Confidence
              </h3>

              <p className="mt-3 text-gray-600">
                The goal isn't to change who you are — it's to help you feel
                your absolute best.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default About
