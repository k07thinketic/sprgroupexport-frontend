'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from './store'
import { AuthProvider } from '@/context/AuthContext'
import Header from '@/components/Header'
import { Toaster } from 'react-hot-toast'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function ClientLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-gray-50">
        <Provider store={store}>
          <AuthProvider>
            <Header />
            <main className="min-h-[calc(100vh-300px)]">{children}</main>
            <Toaster position="top-right" />
          </AuthProvider>
        </Provider>
      </body>
    </html>
  )
}
