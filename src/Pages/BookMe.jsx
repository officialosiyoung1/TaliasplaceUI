import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

const BookMe = () => {
  const [searchParams] = useSearchParams()

  const selectedService = searchParams.get('service') || ''

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: selectedService,
    date: '',
    time: '',
    appointmentType: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))

    // Remove the error for the field once the user starts correcting it
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

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.'
    }

    if (!formData.service) {
      newErrors.service = 'Please select a makeup service.'
    }

    if (!formData.date) {
      newErrors.date = 'Please select your preferred date.'
    }

    if (!formData.time) {
      newErrors.time = 'Please select your preferred time.'
    }

    if (!formData.appointmentType) {
      newErrors.appointmentType = 'Please select an appointment type.'
    }

    return newErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setSuccessMessage('')

    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    // Convert the frontend field name to the Django backend field name
    const bookingData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      service: formData.service,
      date: formData.date,
      time: formData.time,
      appointment_type: formData.appointmentType,
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
        `${apiUrl}/api/bookings/`,
        bookingData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      console.log('Booking created:', response.data)

      if (response.status === 201) {
        setSuccessMessage(
          'Your appointment request has been received. Talia will get back to you soon.'
        )

        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          time: '',
          appointmentType: '',
          message: '',
        })

        setErrors({})
      }
    } catch (error) {
      console.error('Booking error:', error)

      if (error.response) {
        console.error('Backend status:', error.response.status)
        console.error('Backend response:', error.response.data)

        const backendErrors = error.response.data

        if (typeof backendErrors === 'object' && backendErrors !== null) {
          const formattedErrors = {}

          Object.keys(backendErrors).forEach((field) => {
            const message = backendErrors[field]

            if (Array.isArray(message)) {
              formattedErrors[field] = message[0]
            } else if (typeof message === 'string') {
              formattedErrors[field] = message
            }
          })

          // Convert Django's appointment_type error back to the frontend field
          if (formattedErrors.appointment_type) {
            formattedErrors.appointmentType =
              formattedErrors.appointment_type

            delete formattedErrors.appointment_type
          }

          if (Object.keys(formattedErrors).length > 0) {
            setErrors(formattedErrors)
          }
        }

        setSuccessMessage(
          'We could not submit your appointment request. Please check the form and try again.'
        )
      } else if (error.request) {
        console.error('No response received from backend:', error.request)

        setSuccessMessage(
          'We could not connect to the booking server. Please try again.'
        )
      } else {
        console.error('Request error:', error.message)

        setSuccessMessage(
          'Something went wrong. Please try again.'
        )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Prevent users from selecting a date in the past
  const today = new Date().toISOString().split('T')[0]

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="px-6 pb-20 pt-32 sm:px-10 lg:px-16 lg:pb-28 lg:pt-40">
        <div className="mx-auto grid w-full max-w-[1400px] gap-16 lg:grid-cols-2 lg:items-start">

          {/* Intro */}
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-pink-500">
              Book an Appointment
            </p>

            <h1 className="max-w-xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.02em] sm:text-6xl lg:text-7xl">
              Let's create your
              <span className="block text-pink-500">
                perfect look.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Ready to get glammed? Fill out the booking form and tell Talia
              what you have in mind. Your appointment details will be reviewed
              and confirmed with you.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <p className="text-sm font-semibold">
                  01 — Choose your service
                </p>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Select the makeup service that best fits your occasion.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold">
                  02 — Tell us about your appointment
                </p>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Share your preferred date, time and any details Talia should
                  know.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold">
                  03 — Get confirmation
                </p>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Talia will review your request and get back to you.
                </p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="rounded-[2rem] bg-black p-6 text-white shadow-xl sm:p-8 lg:p-10">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Appointment Details
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Tell Talia a little about the appointment you would like to book.
            </p>

            {successMessage && (
              <div className="mt-6 rounded-2xl border border-pink-400/20 bg-pink-400/10 p-4">
                <p className="text-sm leading-6 text-pink-200">
                  {successMessage}
                </p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition duration-300 placeholder:text-gray-500 focus:border-pink-400 focus:bg-white/[0.07] focus:ring-1 focus:ring-pink-400/30"
                  value={formData.name}
                  onChange={handleChange}
                />

                {errors.name && (
                  <p className="mt-2 text-sm text-pink-400">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition duration-300 placeholder:text-gray-500 focus:border-pink-400 focus:bg-white/[0.07] focus:ring-1 focus:ring-pink-400/30"
                  value={formData.email}
                  onChange={handleChange}
                />

                {errors.email && (
                  <p className="mt-2 text-sm text-pink-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition duration-300 placeholder:text-gray-500 focus:border-pink-400 focus:bg-white/[0.07] focus:ring-1 focus:ring-pink-400/30"
                  value={formData.phone}
                  onChange={handleChange}
                />

                {errors.phone && (
                  <p className="mt-2 text-sm text-pink-400">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Service */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Makeup Service
                </label>

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition duration-300 focus:border-pink-400 focus:bg-white/[0.07] focus:ring-1 focus:ring-pink-400/30"
                >
                  <option value="" disabled className="bg-black">
                    Select a service
                  </option>

                  <option value="bridal" className="bg-black">
                    Bridal Makeup
                  </option>

                  <option value="birthday_events" className="bg-black">
                    Birthday & Events
                  </option>

                  <option value="photoshoot" className="bg-black">
                    Photoshoot Makeup
                  </option>

                  <option value="natural" className="bg-black">
                    Natural Makeup
                  </option>

                  <option value="full_glam" className="bg-black">
                    Full Glam
                  </option>

                  <option value="training" className="bg-black">
                    Makeup Training
                  </option>
                </select>

                {errors.service && (
                  <p className="mt-2 text-sm text-pink-400">
                    {errors.service}
                  </p>
                )}
              </div>

              {/* Date & Time */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Preferred Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    min={today}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition duration-300 focus:border-pink-400 focus:bg-white/[0.07] focus:ring-1 focus:ring-pink-400/30"
                  />

                  {errors.date && (
                    <p className="mt-2 text-sm text-pink-400">
                      {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Preferred Time
                  </label>

                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition duration-300 focus:border-pink-400 focus:bg-white/[0.07] focus:ring-1 focus:ring-pink-400/30"
                  />

                  {errors.time && (
                    <p className="mt-2 text-sm text-pink-400">
                      {errors.time}
                    </p>
                  )}
                </div>

              </div>

              {/* Appointment Type */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Appointment Type
                </label>

                <select
                  name="appointmentType"
                  value={formData.appointmentType}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition duration-300 focus:border-pink-400 focus:bg-white/[0.07] focus:ring-1 focus:ring-pink-400/30"
                >
                  <option value="" disabled className="bg-black">
                    Select appointment type
                  </option>

                  <option value="studio" className="bg-black">
                    Studio Appointment
                  </option>

                  <option value="home" className="bg-black">
                    Home Service
                  </option>
                </select>

                {errors.appointmentType && (
                  <p className="mt-2 text-sm text-pink-400">
                    {errors.appointmentType}
                  </p>
                )}
              </div>

              {/* Additional Details */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Additional Details
                </label>

                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell Talia anything she should know about your appointment..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition duration-300 placeholder:text-gray-500 focus:border-pink-400 focus:bg-white/[0.07] focus:ring-1 focus:ring-pink-400/30"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-pink-500 px-6 py-3 font-medium text-white shadow-lg shadow-pink-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-pink-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? 'Sending Request...'
                  : 'Request Appointment'}
              </button>

            </form>
          </div>

        </div>
      </section>
    </main>
  )
}

export default BookMe