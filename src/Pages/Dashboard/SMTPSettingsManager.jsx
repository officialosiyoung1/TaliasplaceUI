import React, { useState, useEffect, useCallback } from 'react'
import {
  fetchEmailSettings,
  createEmailSettings,
  updateEmailSettings,
  deleteEmailSettings,
  testSMTPConnection,
} from '../../api/emailSettings'

export default function SMTPSettingsManager() {
  const [profiles, setProfiles] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [statusMessage, setStatusMessage] = useState(null)
  const [testResult, setTestResult] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const emptyForm = {
    title: 'cPanel Webmail SMTP',
    smtp_host: '',
    smtp_port: 465,
    security_mode: 'SSL',
    webmail_user: '',
    webmail_password: '',
    default_from_email: '',
    notification_recipient_email: 'perpetualasadueze@gmail.com',
    is_active: true,
  }

  const [formData, setFormData] = useState(emptyForm)

  const loadSettings = useCallback(async () => {
    setLoading(true)
    setStatusMessage(null)
    try {
      const data = await fetchEmailSettings()
      const list = Array.isArray(data) ? data : []
      setProfiles(list)

      if (list.length > 0) {
        // Pick active profile or first profile
        const active = list.find((p) => p.is_active) || list[0]
        setSelectedId(active.id)
        setFormData({
          title: active.title || 'cPanel Webmail SMTP',
          smtp_host: active.smtp_host || '',
          smtp_port: active.smtp_port || 465,
          security_mode: active.security_mode || 'SSL',
          webmail_user: active.webmail_user || '',
          webmail_password: active.webmail_password || '',
          default_from_email: active.default_from_email || '',
          notification_recipient_email:
            active.notification_recipient_email || 'perpetualasadueze@gmail.com',
          is_active: active.is_active ?? true,
        })
      } else {
        setSelectedId(null)
        setFormData(emptyForm)
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to load SMTP settings from server.',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadSettings()
  }, [loadSettings])

  const handleSelectProfile = (profile) => {
    setSelectedId(profile.id)
    setTestResult(null)
    setStatusMessage(null)
    setFormData({
      title: profile.title || '',
      smtp_host: profile.smtp_host || '',
      smtp_port: profile.smtp_port || 465,
      security_mode: profile.security_mode || 'SSL',
      webmail_user: profile.webmail_user || '',
      webmail_password: profile.webmail_password || '',
      default_from_email: profile.default_from_email || '',
      notification_recipient_email: profile.notification_recipient_email || '',
      is_active: profile.is_active ?? true,
    })
  }

  const handleNewProfile = () => {
    setSelectedId(null)
    setTestResult(null)
    setStatusMessage(null)
    setFormData(emptyForm)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => {
      const next = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }
      // Auto adjust port when security mode changes if on standard defaults
      if (name === 'security_mode') {
        if (value === 'SSL' && prev.smtp_port === 587) next.smtp_port = 465
        if (value === 'TLS' && prev.smtp_port === 465) next.smtp_port = 587
      }
      return next
    })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setStatusMessage(null)
    setTestResult(null)

    try {
      if (selectedId) {
        // Update existing profile
        const updated = await updateEmailSettings(selectedId, formData)
        setStatusMessage({
          type: 'success',
          text: `SMTP Configuration "${updated.title}" updated successfully!`,
        })
      } else {
        // Create new profile
        const created = await createEmailSettings(formData)
        setSelectedId(created.id)
        setStatusMessage({
          type: 'success',
          text: `New SMTP profile "${created.title}" created successfully!`,
        })
      }
      await loadSettings()
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to save SMTP settings.',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedId) return
    if (!window.confirm('Are you sure you want to delete this SMTP profile?')) return

    setSaving(true)
    setStatusMessage(null)
    try {
      await deleteEmailSettings(selectedId)
      setStatusMessage({
        type: 'success',
        text: 'SMTP configuration profile deleted.',
      })
      await loadSettings()
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to delete profile.',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleTestConnection = async () => {
    setTesting(true)
    setTestResult(null)
    try {
      const payload = {
        id: selectedId,
        smtp_host: formData.smtp_host,
        smtp_port: formData.smtp_port,
        security_mode: formData.security_mode,
        webmail_user: formData.webmail_user,
        webmail_password: formData.webmail_password,
        notification_recipient_email: formData.notification_recipient_email,
      }
      const res = await testSMTPConnection(payload)
      setTestResult({
        success: true,
        message: res.message || 'Connection successful! Verification email sent.',
      })
    } catch (err) {
      setTestResult({
        success: false,
        message: err.message || 'SMTP Connection test failed. Check host, port, and credentials.',
      })
    } finally {
      setTesting(false)
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center text-stone-500 shadow-sm">
        <p className="animate-pulse">Loading SMTP configuration...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Info Banner */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold text-stone-900">
              cPanel Webmail & SMTP Configuration
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Manage outgoing mail servers for Contact Inquiries and Appointment Bookings.
            </p>
          </div>

          <button
            type="button"
            onClick={handleNewProfile}
            className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
          >
            + New SMTP Profile
          </button>
        </div>

        {/* Existing profiles pill selector */}
        {profiles.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-stone-100 pt-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Profiles:
            </span>
            {profiles.map((p) => {
              const isSelected = p.id === selectedId
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectProfile(p)}
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      p.is_active ? 'bg-emerald-400' : 'bg-stone-300'
                    }`}
                  />
                  {p.title || p.smtp_host}
                  {p.is_active && (
                    <span className="text-[10px] uppercase opacity-75 font-semibold">
                      (Active)
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Status Alerts */}
      {statusMessage && (
        <div
          className={`rounded-xl border p-4 text-sm font-medium ${
            statusMessage.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-rose-200 bg-rose-50 text-rose-800'
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Test Connection Output Alert */}
      {testResult && (
        <div
          className={`rounded-xl border p-5 text-sm ${
            testResult.success
              ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900'
              : 'border-rose-200 bg-rose-50/70 text-rose-900'
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="text-lg">
              {testResult.success ? '🎉' : '⚠️'}
            </span>
            <div>
              <p className="font-semibold">
                {testResult.success ? 'Verification Succeeded' : 'Verification Error'}
              </p>
              <p className="mt-1 leading-relaxed opacity-90">{testResult.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Form */}
      <form onSubmit={handleSave} className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-stone-100 pb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-stone-800">
              {selectedId ? 'Edit SMTP Profile' : 'Create New SMTP Profile'}
            </h3>
            <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-500"
              />
              <span className="font-medium text-stone-700">Active Profile</span>
            </label>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Profile Title */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
              Profile Label
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. cPanel Webmail Primary"
              required
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white focus:ring-1 focus:ring-stone-400 text-sm"
            />
          </div>

          {/* SMTP Host */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
              SMTP Domain Link / Host
            </label>
            <input
              type="text"
              name="smtp_host"
              value={formData.smtp_host}
              onChange={handleChange}
              placeholder="e.g. mail.taliasplace.com"
              required
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white focus:ring-1 focus:ring-stone-400 text-sm"
            />
            <p className="mt-1 text-xs text-stone-400">
              Usually <span className="font-mono text-stone-600">mail.yourdomain.com</span> in cPanel.
            </p>
          </div>

          {/* Port & Security */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                SMTP Port
              </label>
              <input
                type="number"
                name="smtp_port"
                value={formData.smtp_port}
                onChange={handleChange}
                placeholder="465"
                required
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white focus:ring-1 focus:ring-stone-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
                Encryption
              </label>
              <select
                name="security_mode"
                value={formData.security_mode}
                onChange={handleChange}
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white focus:ring-1 focus:ring-stone-400 text-sm"
              >
                <option value="SSL">SSL (Port 465)</option>
                <option value="TLS">TLS (Port 587)</option>
              </select>
            </div>
          </div>

          {/* Webmail User / Username */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
              Webmail Email Address (Username)
            </label>
            <input
              type="email"
              name="webmail_user"
              value={formData.webmail_user}
              onChange={handleChange}
              placeholder="e.g. bookings@taliasplace.com"
              required
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white focus:ring-1 focus:ring-stone-400 text-sm"
            />
            <p className="mt-1 text-xs text-stone-400">
              The full email account created in your cPanel.
            </p>
          </div>

          {/* Webmail Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
              Webmail Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="webmail_password"
                value={formData.webmail_password}
                onChange={handleChange}
                placeholder="Enter password"
                required={!selectedId}
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 pr-14 text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white focus:ring-1 focus:ring-stone-400 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-500 hover:text-stone-800"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <p className="mt-1 text-xs text-stone-400">
              {selectedId && 'Leave masked if you do not want to change it.'}
            </p>
          </div>

          {/* Default From Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
              Sender Header (From)
            </label>
            <input
              type="text"
              name="default_from_email"
              value={formData.default_from_email}
              onChange={handleChange}
              placeholder="Talia's Place <bookings@taliasplace.com>"
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white focus:ring-1 focus:ring-stone-400 text-sm"
            />
            <p className="mt-1 text-xs text-stone-400">
              Optional display name and email address.
            </p>
          </div>

          {/* Notification Recipient */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
              Alert Destination Email
            </label>
            <input
              type="email"
              name="notification_recipient_email"
              value={formData.notification_recipient_email}
              onChange={handleChange}
              placeholder="e.g. perpetualasadueze@gmail.com"
              required
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white focus:ring-1 focus:ring-stone-400 text-sm"
            />
            <p className="mt-1 text-xs text-stone-400">
              All Contact messages and BookMe requests will be sent here.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-stone-100 pt-6">
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving || testing}
              className="rounded-xl bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800 disabled:opacity-60"
            >
              {saving ? 'Saving...' : selectedId ? 'Update Settings' : 'Create Profile'}
            </button>

            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testing || saving || !formData.smtp_host || !formData.webmail_user}
              className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50 disabled:opacity-50"
            >
              {testing ? 'Testing Handshake...' : '⚡ Test Connection'}
            </button>
          </div>

          {selectedId && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving || testing}
              className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:opacity-50"
            >
              Delete Profile
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
