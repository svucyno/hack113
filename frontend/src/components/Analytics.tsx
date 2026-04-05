import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { TrendingUp, AlertTriangle, CreditCard, Activity } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Analytics } from '../types'

const Analytics: React.FC = () => {
  const { token } = useAuth()
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return

    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/analytics', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data: Analytics = await response.json()
          setAnalytics(data)
        } else {
          setError('Failed to fetch analytics')
        }
      } catch (err) {
        console.error('Analytics fetch error:', err)
        setError('Failed to load analytics')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
    
    // Set up polling for real-time updates
    const interval = setInterval(fetchAnalytics, 30000) // Update every 30 seconds
    return () => clearInterval(interval)

  }, [token])

  // Sample data for charts (in real app, this would come from API)
  const fraudTrendData = [
    { name: 'Mon', fraud: 4, safe: 96 },
    { name: 'Tue', fraud: 7, safe: 93 },
    { name: 'Wed', fraud: 3, safe: 97 },
    { name: 'Thu', fraud: 9, safe: 91 },
    { name: 'Fri', fraud: 5, safe: 95 },
    { name: 'Sat', fraud: 2, safe: 98 },
    { name: 'Sun', fraud: 6, safe: 94 },
  ]

  const categoryData = [
    { name: 'Retail', value: 35, risk: 5 },
    { name: 'Crypto', value: 15, risk: 45 },
    { name: 'Travel', value: 20, risk: 15 },
    { name: 'P2P Transfer', value: 18, risk: 25 },
    { name: 'Gambling', value: 8, risk: 65 },
    { name: 'Other', value: 4, risk: 10 },
  ]

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h1>
          <p className="text-gray-600 mb-4">Please login to view analytics</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-t-2 border-r-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 border border-red-300 rounded-md bg-red-50">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
              <div className="text-sm text-red-700">{error}</div>
            </div>
          </div>
        )}

        {/* Key Metrics */}
        {analytics && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CreditCard className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Transactions</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {analytics.total_transactions.toLocaleString()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-6 w-6 text-red-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Fraud Transactions</dt>
                      <dd className="text-lg font-medium text-red-600">
                        {analytics.fraud_transactions.toLocaleString()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Fraud Rate</dt>
                      <dd className="text-lg font-medium text-yellow-600">
                        {analytics.fraud_rate.toFixed(1)}%
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Activity className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Amount</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        ₹{analytics.total_amount.toLocaleString()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fraud Trend Chart */}
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Fraud Detection Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={fraudTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="safe" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Safe Transactions"
                />
                <Line 
                  type="monotone" 
                  dataKey="fraud" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Fraud Attempts"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3b82f6" name="Total Transactions" />
                <Bar dataKey="risk" fill="#ef4444" name="High Risk" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Stats */}
        {analytics && (
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">System Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Database Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{analytics.database_type}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">System Status</dt>
                  <dd className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      analytics.system_status === 'healthy' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {analytics.system_status}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Active Users</dt>
                  <dd className="mt-1 text-sm text-gray-900">{analytics.total_users || 0}</dd>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Analytics
