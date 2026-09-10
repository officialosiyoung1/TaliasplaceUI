import React from 'react'


const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-white py-20 text-black sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16">

        <div className="grid gap-16 lg:grid-cols-2">

          {/* Contact Information */}
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-pink-500">
              Contact
            </p>

            <h2 className="max-w-xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.02em] sm:text-5xl">
              Let's create your
              <span className="block text-pink-500">
                perfect look.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Have a question, need more information or want to discuss your
              appointment? Send Talia a message and she'll be happy to help.
            </p>

            <div className="mt-10 space-y-6">

              <div className="transition duration-300 hover:translate-x-1">
                <p className="text-sm uppercase tracking-wider text-gray-500">
                  Email
                </p>
                <p className="mt-1 text-lg font-medium">
                  perpetualasadueze@gmail.com
                </p>
              </div>

              <div className="transition duration-300 hover:translate-x-1">
                <p className="text-sm uppercase tracking-wider text-gray-500">
                  Phone
                </p>
                <p className="mt-1 text-lg font-medium">
                  +234 8165827008
                </p>
              </div>

              <div className="transition duration-300 hover:translate-x-1">
                <p className="text-sm uppercase tracking-wider text-gray-500">
                  Location
                </p>
                <p className="mt-1 text-lg font-medium">
                  Abuja, Nigeria
                </p>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form className="space-y-5">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Your Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-black outline-none transition duration-300 placeholder:text-gray-400 focus:border-pink-400 focus:bg-white focus:ring-1 focus:ring-pink-400/30"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-black outline-none transition duration-300 placeholder:text-gray-400 focus:border-pink-400 focus:bg-white focus:ring-1 focus:ring-pink-400/30"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Message
                </label>

                <textarea
                  rows={5}
                  placeholder="Tell Talia how she can help..."
                  className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-black outline-none transition duration-300 placeholder:text-gray-400 focus:border-pink-400 focus:bg-white focus:ring-1 focus:ring-pink-400/30"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-full bg-pink-500 px-6 py-3 font-medium text-white shadow-lg shadow-pink-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-pink-400"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Contact