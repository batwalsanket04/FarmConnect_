import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_BASE_URL } from '../../utils/api'

const ForgotPassword = () => {
  const [role, setRole] = useState('buyer')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Email and new password are required')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    try {
      setLoading(true)
      const url =
        role === 'farmer'
          ? `${API_BASE_URL}/api/farmer/forgot-password/`
          : `${API_BASE_URL}/api/user/forgot-password/`

      const res = await axios.post(url, {
        email,
        new_password: password,
      })

      toast.success(res.data.message || 'Password updated successfully')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      navigate(role === 'farmer' ? '/farmer' : '/buyer')
    } catch (err) {
      const message = err.response?.data?.error || 'Unable to reset password'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-green-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 border border-emerald-100">
        <div className="text-center mb-5">
          <h1 className="text-2xl font-bold text-emerald-700">Reset Password</h1>
          <p className="text-gray-500 mt-2">Choose your account type and update your password.</p>
        </div>

        <div className="flex gap-2 mb-5">
          <button
            type="button"
            onClick={() => setRole('buyer')}
            className={`w-1/2 py-2 rounded-xl font-semibold transition ${
              role === 'buyer' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            Buyer
          </button>
          <button
            type="button"
            onClick={() => setRole('farmer')}
            className={`w-1/2 py-2 rounded-xl font-semibold transition ${
              role === 'farmer' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            Farmer
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 border border-emerald-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 border border-emerald-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-2 border border-emerald-300 p-2 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Confirm new password"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-2 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Updating...
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-gray-500">
          <button
            type="button"
            onClick={() => navigate(role === 'farmer' ? '/farmer' : '/buyer')}
            className="text-emerald-700 font-semibold"
          >
            Back to {role === 'farmer' ? 'Farmer' : 'Buyer'} Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
