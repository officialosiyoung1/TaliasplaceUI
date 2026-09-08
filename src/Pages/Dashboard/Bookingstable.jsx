import React from 'react'

const STATUS_STYLES = {
  pending: {
    border: 'border-l-amber-400',
    label: 'Pending',
    text: 'text-amber-700',
    dot: 'bg-amber-400',
  },
  confirmed: {
    border: 'border-l-teal-500',
    label: 'Confirmed',
    text: 'text-teal-700',
    dot: 'bg-teal-500',
  },
  cancelled: {
    border: 'border-l-stone-300',
    label: 'Cancelled',
    text: 'text-stone-400',
    dot: 'bg-stone-300',
  },
}

function formatDate(dateStr, timeStr) {
  if (!dateStr) return '—'
  try {
    const d = new Date(timeStr ? `${dateStr}T${timeStr}` : dateStr)
    const dateLabel = d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    })
    const timeLabel = timeStr
      ? d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
      : null
    return timeLabel ? `${dateLabel} · ${timeLabel}` : dateLabel
  } catch {
    return dateStr
  }
}

export default function BookingsTable({ bookings, onUpdateStatus, updatingId }) {
  if (bookings.length === 0) {
    return (
      <div className="rounded border border-stone-200 bg-white px-6 py-16 text-center">
        <p className="text-stone-500">No bookings yet.</p>
        <p className="mt-1 text-sm text-stone-400">
          New bookings from your site will show up here.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded border border-stone-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-stone-200 text-stone-500">
            <th className="px-5 py-3 font-medium">Client</th>
            <th className="px-5 py-3 font-medium">Service</th>
            <th className="px-5 py-3 font-medium">When</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const style = STATUS_STYLES[booking.status] || STATUS_STYLES.pending
            const isUpdating = updatingId === booking.id

            return (
              <tr
                key={booking.id}
                className={`border-b border-stone-100 border-l-2 last:border-b-0 ${style.border}`}
              >
                <td className="px-5 py-4">
                  <div className="font-medium text-stone-800">{booking.name}</div>
                  <div className="text-stone-400">{booking.email}</div>
                </td>
                <td className="px-5 py-4 text-stone-600">{booking.service}</td>
                <td className="px-5 py-4 text-stone-600">
                  {formatDate(booking.date, booking.time)}
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center gap-1.5 ${style.text}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                    {style.label}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    {booking.status !== 'confirmed' && (
                      <button
                        onClick={() => onUpdateStatus(booking.id, 'confirmed')}
                        disabled={isUpdating}
                        className="rounded border border-teal-600 px-3 py-1 text-teal-700 transition hover:bg-teal-50 disabled:opacity-50"
                      >
                        Confirm
                      </button>
                    )}
                    {booking.status !== 'cancelled' && (
                      <button
                        onClick={() => onUpdateStatus(booking.id, 'cancelled')}
                        disabled={isUpdating}
                        className="rounded border border-stone-300 px-3 py-1 text-stone-500 transition hover:bg-stone-50 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}