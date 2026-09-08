import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Maria Ukamaka',
      text: 'Talia did an amazing job. I felt so beautiful and confident, and the makeup lasted beautifully throughout the event.',
      occasion: 'Birthday Glam',
    },
    {
      name: 'chineye Eze',
      text: 'I absolutely loved my makeup. Everything was perfectly done, from the skin preparation to the final look.',
      occasion: 'Special Event',
    },
    {
      name: 'Zainab Aminu',
      text: 'Professional, talented and so easy to work with. I would definitely book Talia again.',
      occasion: 'Photoshoot',
    },
  ]

  return (
    <section className="bg-white py-20 text-black sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-pink-500">
            Client Love
          </p>

          <h2 className="font-display text-4xl font-semibold leading-[0.98] tracking-[-0.02em] sm:text-5xl">
            What my clients
            <span className="block text-pink-500">
              have to say.
            </span>
          </h2>
        </div>

        {/* Testimonials */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.occasion}
             className="rounded-3xl border border-black/10 p-7 transition duration-300 hover:-translate-y-1 hover:border-pink-300 hover:shadow-lg"
            >
              {/* Stars */}
              <div className="text-lg tracking-widest text-pink-500">
                ★★★★★
              </div>

              <p className="mt-6 text-base leading-7 text-gray-600">
                "{testimonial.text}"
              </p>

              <div className="mt-7 border-t border-black/10 pt-5">
                <p className="font-semibold">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {testimonial.occasion}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Testimonials