import React, { useState } from 'react'
import axios from 'axios'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: '',
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.'
    }

    return newErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setSuccessMessage('')
    setErrorMessage('')

    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    const contactData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL

      if (!apiUrl) {
        throw new Error(
          'VITE_API_URL is not configured. Please check the frontend environment variables.'
        )
      }

      const response = await axios.post(
        `${apiUrl}/api/contact/send-message/`,
        contactData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      console.log('Contact message sent:', response.data)

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage(
          'Your message has been sent successfully. Talia will get back to you soon.'
        )

        setFormData({
          name: '',
          email: '',
          message: '',
        })

        setErrors({})
      }
    } catch (error) {
      console.error('Contact form error:', error)

      if (error.response) {
        console.error('Backend status:', error.response.status)
        console.error('Backend response:', error.response.data)

        const backendErrors = error.response.data

        if (
          typeof backendErrors === 'object' &&
          backendErrors !== null
        ) {
          const formattedErrors = {}

          Object.keys(backendErrors).forEach((field) => {
            const message = backendErrors[field]

            if (Array.isArray(message)) {
              formattedErrors[field] = message[0]
            } else if (typeof message === 'string') {
              formattedErrors[field] = message
            }
          })

          if (Object.keys(formattedErrors).length > 0) {
            setErrors(formattedErrors)
          }
        }

        setErrorMessage(
          'We could not send your message. Please check the form and try again.'
        )
      } else if (error.request) {
        console.error(
          'No response received from backend:',
          error.request
        )

        setErrorMessage(
          'We could not connect to the server. Please try again.'
        )
      } else {
        console.error('Request error:', error.message)

        setErrorMessage(
          'Something went wrong. Please try again.'
        )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Success Message */}
              {successMessage && (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
                  <p className="text-sm leading-6 text-green-700">
                    {successMessage}
                  </p>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                  <p className="text-sm leading-6 text-red-600">
                    {errorMessage}
                  </p>
                </div>
              )}

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-black outline-none transition duration-300 placeholder:text-gray-400 focus:border-pink-400 focus:bg-white focus:ring-1 focus:ring-pink-400/30"
                />

                {errors.name && (
                  <p className="mt-2 text-sm text-pink-500">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-black outline-none transition duration-300 placeholder:text-gray-400 focus:border-pink-400 focus:bg-white focus:ring-1 focus:ring-pink-400/30"
                />

                {errors.email && (
                  <p className="mt-2 text-sm text-pink-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell Talia how she can help..."
                  className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-black outline-none transition duration-300 placeholder:text-gray-400 focus:border-pink-400 focus:bg-white focus:ring-1 focus:ring-pink-400/30"
                />

                {errors.message && (
                  <p className="mt-2 text-sm text-pink-500">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-pink-500 px-6 py-3 font-medium text-white shadow-lg shadow-pink-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-pink-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? 'Sending Message...'
                  : 'Send Message'}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact