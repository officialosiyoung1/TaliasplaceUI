import React, { useState, useEffect, useCallback } from 'react'
import {
  fetchTelegramSettings,
  createTelegramSettings,
  updateTelegramSettings,
  deleteTelegramSettings,
  testTelegramConnection,
} from '../../api/telegramSettings'

export default function TelegramSettingsManager() {
  const [profiles, setProfiles] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [statusMessage, setStatusMessage] = useState(null)
  const [testResult, setTestResult] = useState(null)
  const [showToken, setShowToken] = useState(false)
  const [showGuide, setShowGuide] = useState(false)

  const emptyForm = {
    title: "Talia's Place Alerts Bot",
    bot_token: '',
    chat_id: '',
    notify_on_contact: true,
    notify_on_booking: true,
    is_active: true,
  }

  const [formData, setFormData] = useState(emptyForm)

  const loadSettings = useCallback(async () => {
    setLoading(true)
    setStatusMessage(null)
    try {
      const data = await fetchTelegramSettings()
      const list = Array.isArray(data) ? data : []
      setProfiles(list)

      if (list.length > 0) {
        const active = list.find((p) => p.is_active) || list[0]
        setSelectedId(active.id)
        setFormData({
          title: active.title || "Talia's Place Alerts Bot",
          bot_token: active.bot_token || '',
          chat_id: active.chat_id || '',
          notify_on_contact: active.notify_on_contact ?? true,
          notify_on_booking: active.notify_on_booking ?? true,
          is_active: active.is_active ?? true,
        })
      } else {
        setSelectedId(null)
        setFormData(emptyForm)
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to load Telegram settings from server.',
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
      bot_token: profile.bot_token || '',
      chat_id: profile.chat_id || '',
      notify_on_contact: profile.notify_on_contact ?? true,
      notify_on_booking: profile.notify_on_booking ?? true,
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
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setStatusMessage(null)
    setTestResult(null)

    try {
      if (selectedId) {
        const updated = await updateTelegramSettings(selectedId, formData)
        setStatusMessage({
          type: 'success',
          text: `Telegram configuration "${updated.title}" updated successfully!`,
        })
      } else {
        const created = await createTelegramSettings(formData)
        setSelectedId(created.id)
        setStatusMessage({
          type: 'success',
          text: `New Telegram bot "${created.title}" saved and activated!`,
        })
      }
      await loadSettings()
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to save Telegram settings.',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedId) return
    if (!window.confirm('Are you sure you want to delete this Telegram configuration?')) return

    setSaving(true)
    setStatusMessage(null)
    try {
      await deleteTelegramSettings(selectedId)
      setStatusMessage({
        type: 'success',
        text: 'Telegram configuration deleted.',
      })
      await loadSettings()
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to delete configuration.',
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
        bot_token: formData.bot_token,
        chat_id: formData.chat_id,
      }
      const res = await testTelegramConnection(payload)
      setTestResult({
        success: true,
        message: res.message || 'Verification message delivered to your Telegram chat successfully!',
      })
    } catch (err) {
      setTestResult({
        success: false,
        message: err.message || 'Telegram test failed. Please check your Bot Token and Chat ID.',
      })
    } finally {
      setTesting(false)
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center text-stone-500 shadow-sm">
        <p className="animate-pulse">Loading Telegram configuration...</p>
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
              Telegram Bot Push Notifications
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Receive real-time alerts on your phone whenever a client messages or books an appointment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowGuide(!showGuide)}
              className="inline-flex items-center justify-center rounded-xl border border-sky-200 bg-sky-50 px-3.5 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-100"
            >
              {showGuide ? 'Hide Setup Guide' : '📖 Setup Guide'}
            </button>
            <button
              type="button"
              onClick={handleNewProfile}
              className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
            >
              + New Bot Profile
            </button>
          </div>
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
                  {p.title || `Chat: ${p.chat_id}`}
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

      {/* Setup Guide Card */}
      {showGuide && (
        <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-6 sm:p-7 text-sky-950 shadow-sm transition">
          <div className="flex items-center justify-between border-b border-sky-200 pb-3 mb-4">
            <h3 className="text-base font-bold text-sky-900 flex items-center gap-2">
              <span>🚀</span> 3-Minute Telegram Setup Instructions
            </h3>
            <button
              onClick={() => setShowGuide(false)}
              className="text-xs font-semibold text-sky-700 hover:text-sky-900"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 text-sm">
            <div className="rounded-xl bg-white p-4 border border-sky-100 shadow-xs">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-700 text-xs font-bold mb-2">
                1
              </span>
              <h4 className="font-semibold text-stone-900">Create your Bot</h4>
              <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                Open Telegram, search for{' '}
                <span className="font-mono font-bold text-sky-800">@BotFather</span>, and send{' '}
                <span className="font-mono bg-stone-100 px-1 py-0.5 rounded text-stone-800">/newbot</span>.
                Follow the prompts and copy the given <strong>Bot Token</strong>.
              </p>
            </div>

            <div className="rounded-xl bg-white p-4 border border-sky-100 shadow-xs">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-700 text-xs font-bold mb-2">
                2
              </span>
              <h4 className="font-semibold text-stone-900">Get your Chat ID</h4>
              <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                Search for{' '}
                <span className="font-mono font-bold text-sky-800">@userinfobot</span> on Telegram, press{' '}
                <span className="font-mono bg-stone-100 px-1 py-0.5 rounded text-stone-800">/start</span>,
                and copy your numeric <strong>Id</strong> (e.g. <span className="font-mono text-stone-800">123456789</span>).
              </p>
            </div>

            <div className="rounded-xl bg-white p-4 border border-sky-100 shadow-xs">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-700 text-xs font-bold mb-2">
                3
              </span>
              <h4 className="font-semibold text-stone-900">Start the Bot & Test</h4>
              <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                Open your new bot in Telegram and press <strong>Start</strong> at the bottom. Then enter your token and Chat ID below and click <strong>Test Telegram Bot</strong>!
              </p>
            </div>
          </div>
        </div>
      )}

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
                {testResult.success ? 'Telegram Handshake Succeeded' : 'Telegram Connection Error'}
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
              {selectedId ? 'Edit Telegram Configuration' : 'Connect New Telegram Bot'}
            </h3>
            <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-500"
              />
              <span className="font-medium text-stone-700">Active Bot Profile</span>
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
              placeholder="e.g. Talia's Place Alerts Bot"
              required
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white focus:ring-1 focus:ring-stone-400 text-sm"
            />
          </div>

          {/* Bot Token */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
              Telegram Bot Token (from @BotFather)
            </label>
            <div className="relative">
              <input
                type={showToken ? 'text' : 'password'}
                name="bot_token"
                value={formData.bot_token}
                onChange={handleChange}
                placeholder="e.g. 7123456789:AAHABC123def456_xyz"
                required={!selectedId}
                className="w-full font-mono rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 pr-16 text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white focus:ring-1 focus:ring-stone-400 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-500 hover:text-stone-800"
              >
                {showToken ? 'Hide' : 'Show'}
              </button>
            </div>
            <p className="mt-1 text-xs text-stone-400">
              {selectedId
                ? 'Leave masked (••••••••) if you do not want to change it.'
                : 'Obtained by chatting with @BotFather on Telegram.'}
            </p>
          </div>

          {/* Chat ID */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
              Your Telegram Chat ID / Channel ID
            </label>
            <input
              type="text"
              name="chat_id"
              value={formData.chat_id}
              onChange={handleChange}
              placeholder="e.g. 123456789 or -100123456789"
              required
              className="w-full font-mono rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white focus:ring-1 focus:ring-stone-400 text-sm"
            />
            <p className="mt-1 text-xs text-stone-400">
              The ID of the Telegram chat or channel where alerts should be delivered. Get it easily from{' '}
              <span className="font-semibold text-stone-600">@userinfobot</span>.
            </p>
          </div>

          {/* Alert Toggles */}
          <div className="sm:col-span-2 pt-2 border-t border-stone-100">
            <span className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-3">
              Notification Events
            </span>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex items-start gap-3 rounded-xl border border-stone-200 bg-stone-50 p-4 cursor-pointer hover:bg-stone-100/70 transition">
                <input
                  type="checkbox"
                  name="notify_on_contact"
                  checked={formData.notify_on_contact}
                  onChange={handleChange}
                  className="h-4 w-4 mt-0.5 rounded border-stone-300 text-stone-900 focus:ring-stone-500"
                />
                <div>
                  <span className="text-sm font-semibold text-stone-800">
                    Contact Form Messages
                  </span>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Receive an instant phone alert whenever a visitor submits an inquiry.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 rounded-xl border border-stone-200 bg-stone-50 p-4 cursor-pointer hover:bg-stone-100/70 transition">
                <input
                  type="checkbox"
                  name="notify_on_booking"
                  checked={formData.notify_on_booking}
                  onChange={handleChange}
                  className="h-4 w-4 mt-0.5 rounded border-stone-300 text-stone-900 focus:ring-stone-500"
                />
                <div>
                  <span className="text-sm font-semibold text-stone-800">
                    BookMe Appointments
                  </span>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Receive complete booking details (date, time, service, contact) instantly.
                  </p>
                </div>
              </label>
            </div>
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
              {saving ? 'Saving...' : selectedId ? 'Update Bot Settings' : 'Save & Connect Bot'}
            </button>

            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testing || saving || (!formData.bot_token && !selectedId) || !formData.chat_id}
              className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50 disabled:opacity-50"
            >
              {testing ? 'Sending Verification Ping...' : '⚡ Test Telegram Bot'}
            </button>
          </div>

          {selectedId && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving || testing}
              className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:opacity-50"
            >
              Delete Bot Profile
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
