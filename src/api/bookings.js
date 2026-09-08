const BASE_URL = import.meta.env.VITE_API_URL || ''

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    const message = await res.text().catch(() => '')
    throw new Error(`API error ${res.status}: ${message || res.statusText}`)
  }

  if (res.status === 204) return null
  return res.json()
}

export function fetchBookings() {
  return request('/api/bookings')
}

export function updateBookingStatus(id, status) {
  return request(`/api/bookings/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}