const BASE_URL = import.meta.env.VITE_API_URL || ''

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    let errorDetail = ''
    try {
      const data = await res.json()
      if (typeof data === 'object') {
        errorDetail = data.message || Object.values(data).flat().join(' ')
      }
    } catch {
      errorDetail = await res.text().catch(() => '')
    }
    throw new Error(errorDetail || `API error ${res.status}: ${res.statusText}`)
  }

  if (res.status === 204) return null
  return res.json()
}

/**
 * Fetch all saved Telegram bot configurations
 */
export function fetchTelegramSettings() {
  return request('/api/telegram-settings/')
}

/**
 * Create a new Telegram bot configuration
 */
export function createTelegramSettings(data) {
  return request('/api/telegram-settings/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Update an existing Telegram configuration
 */
export function updateTelegramSettings(id, data) {
  return request(`/api/telegram-settings/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

/**
 * Delete a Telegram configuration
 */
export function deleteTelegramSettings(id) {
  return request(`/api/telegram-settings/${id}/`, {
    method: 'DELETE',
  })
}

/**
 * Test Telegram bot connection and send an instant test ping
 */
export function testTelegramConnection(data) {
  return request('/api/telegram-settings/test-connection/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
