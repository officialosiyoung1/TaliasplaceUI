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

        const bookingData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      date: formData.date,
      time: formData.time,
      appointment_type: formData.appointmentType,
      message: formData.message,
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/bookings/`,
      bookingData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

      console.log('Booking created:', response.data)

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
    } catch (error) {
      console.error('Booking error:', error)

      setSuccessMessage(
        'We could not submit your appointment request. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

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
                      value={formData.date}
                      onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition duration-300 focus:border-pink-400 focus:bg-white/[0.07] focus:ring-1 focus:ring-pink-400/30"
                  />
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
                </div>

              </div>

              {/* Location */}
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
                {isSubmitting ? 'Sending Request...' : 'Request Appointment'}
              </button>

            </form>
          </div>

        </div>
      </section>
    </main>
  )
}

export default BookMe