import React, { useCallback, useEffect, useState } from 'react'
import BookingsTable from './Bookingstable'
import SMTPSettingsManager from './SMTPSettingsManager'
import TelegramSettingsManager from './TelegramSettingsManager'
import { fetchBookings, updateBookingStatus } from '../../api/bookings'

const POLL_INTERVAL_MS = 30000

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white px-5 py-4 shadow-sm">
      <div className="text-2xl font-bold text-stone-900">{value}</div>
      <div className="text-xs font-medium uppercase tracking-wider text-stone-400 mt-1">{label}</div>
    </div>
  )
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('bookings')
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
    let isMounted = true
    const fetchInitial = async () => {
      try {
        const data = await fetchBookings()
        if (isMounted) {
          setBookings(Array.isArray(data) ? data : [])
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load bookings.')
          setLoading(false)
        }
      }
    }
    fetchInitial()

    const id = setInterval(() => {
      loadBookings({ silent: true })
    }, POLL_INTERVAL_MS)

    return () => {
      isMounted = false
      clearInterval(id)
    }
  }, [loadBookings])

  const handleUpdateStatus = async (id, status) => {
    setUpdatingId(id)
    const prev = bookings
    setBookings((curr) => curr.map((b) => (b.id === id ? { ...b, status } : b)))
    try {
      await updateBookingStatus(id, status)
    } catch (err) {
      setBookings(prev)
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
    <main className="min-h-screen bg-stone-50 pb-20">
      <div className="mx-auto max-w-5xl px-6 pt-28">
        
        {/* Dashboard Title & Tabs Header */}
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-stone-900">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-stone-500">
              Manage client appointment bookings, cPanel webmail SMTP, and Telegram alerts.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white p-1.5 shadow-sm">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === 'bookings'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              📅 Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('smtp')}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === 'smtp'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              ⚙️ Webmail & SMTP
            </button>
            <button
              onClick={() => setActiveTab('telegram')}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === 'telegram'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              📱 Telegram Alerts
            </button>
          </div>
        </header>

        {/* Tab 1: Bookings Management */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <StatCard label="Today" value={todayCount} />
              <StatCard label="Pending" value={pendingCount} />
              <StatCard label="Confirmed" value={confirmedCount} />
            </div>

            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            )}

            {loading ? (
              <div className="rounded-2xl border border-stone-200 bg-white px-6 py-16 text-center text-stone-400 shadow-sm">
                Loading appointment bookings…
              </div>
            ) : (
              <BookingsTable
                bookings={bookings}
                onUpdateStatus={handleUpdateStatus}
                updatingId={updatingId}
              />
            )}
          </div>
        )}

        {/* Tab 2: Webmail and SMTP Settings */}
        {activeTab === 'smtp' && (
          <SMTPSettingsManager />
        )}

        {/* Tab 3: Telegram Alerts Settings */}
        {activeTab === 'telegram' && (
          <TelegramSettingsManager />
        )}

      </div>
    </main>
  )
}
