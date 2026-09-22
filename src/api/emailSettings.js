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
 * Fetch all saved SMTP configurations
 */
export function fetchEmailSettings() {
  return request('/api/email-settings/')
}

/**
 * Create a new SMTP configuration
 */
export function createEmailSettings(data) {
  return request('/api/email-settings/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Update an existing SMTP configuration
 */
export function updateEmailSettings(id, data) {
  return request(`/api/email-settings/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

/**
 * Delete an SMTP configuration
 */
export function deleteEmailSettings(id) {
  return request(`/api/email-settings/${id}/`, {
    method: 'DELETE',
  })
}

/**
 * Test SMTP connection and send a verification test email
 */
export function testSMTPConnection(data) {
  return request('/api/email-settings/test-connection/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
