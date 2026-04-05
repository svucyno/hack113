import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Shield, CreditCard, BarChart3, AlertTriangle, Home, Settings } from 'lucide-react'
import Dashboard from './components/Dashboard'
import PaymentForm from './components/PaymentForm'
import Transactions from './components/Transactions'
import Analytics from './components/Analytics'
import Navbar from './components/Navbar'
import { AuthProvider } from './contexts/AuthContext'
import { WebSocketProvider } from './contexts/WebSocketContext'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <AuthProvider>
        <WebSocketProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/payment" element={<PaymentForm />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </main>
          </div>
        </WebSocketProvider>
      </AuthProvider>
    </div>
  )
}

export default App
