import React, { useCallback, useEffect, useState } from 'react'
import BookingsTable from './BookingsTable'
import { fetchBookings, updateBookingStatus } from '../../api/bookings'

// Polls for new bookings every 30s. Bump or remove this if you'd rather
// wire up websockets/SSE for real-time updates later.
const POLL_INTERVAL_MS = 30000

function StatCard({ label, value }) {
  return (
    <div className="rounded border border-stone-200 bg-white px-5 py-4">
      <div className="text-2xl font-semibold text-stone-800">{value}</div>
      <div className="text-sm text-stone-500">{label}</div>
    </div>
  )
}

export default function Dashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)

  const loadBookings = useCallback(async ({ silent } = {}) => {
    if (!silent) setLoading(true)
    setError(null)
    try {
      const data = await fetchBookings()
      setBookings(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Failed to load bookings.')
    } finally {
      if (!silent) setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadBookings()
    const id = setInterval(() => loadBookings({ silent: true }), POLL_INTERVAL_MS)
    return () => clearInterval(id)
  }, [loadBookings])

  const handleUpdateStatus = async (id, status) => {
    setUpdatingId(id)
    // optimistic update
    const prev = bookings
    setBookings((curr) => curr.map((b) => (b.id === id ? { ...b, status } : b)))
    try {
      await updateBookingStatus(id, status)
    } catch (err) {
      setBookings(prev) // roll back on failure
      setError(err.message || 'Failed to update booking.')
    } finally {
      setUpdatingId(null)
    }
  }

  const pendingCount = bookings.filter((b) => b.status === 'pending').length
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length
  const todayCount = bookings.filter((b) => {
    const today = new Date().toISOString().slice(0, 10)
    return b.date === today
  }).length

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-stone-800">Bookings</h1>
          <p className="mt-1 text-stone-500">
            Requests submitted from your site land here.
          </p>
        </header>

        <div className="mb-6 grid grid-cols-3 gap-4">
          <StatCard label="Today" value={todayCount} />
          <StatCard label="Pending" value={pendingCount} />
          <StatCard label="Confirmed" value={confirmedCount} />
        </div>

        {error && (
          <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded border border-stone-200 bg-white px-6 py-16 text-center text-stone-400">
            Loading bookings…
          </div>
        ) : (
          <BookingsTable
            bookings={bookings}
            onUpdateStatus={handleUpdateStatus}
            updatingId={updatingId}
          />
        )}
      </div>
    </main>
  )
}
