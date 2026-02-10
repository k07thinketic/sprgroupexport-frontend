'use client'

import React, { useState, useEffect } from 'react'
import { toast } from '@/utils/toastConfig'
import api from '@/lib/axios'

const ShippingDetailsSection = ({
  orderId,
  initialCourier,
  onCourierUpdated,
}) => {
  const [courier, setCourier] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (initialCourier) {
      setCourier(initialCourier)
    }
  }, [initialCourier])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const payload = { shippingCourier: courier.trim() || null }
      await api.put(`/orders/update-status/${orderId}`, payload)
      toast.success('Shipping courier updated successfully')
      onCourierUpdated?.(courier.trim() || null)
    } catch (err) {
      console.error('Error updating shipping courier:', err)
      toast.error(
        err.response?.data?.message || 'Failed to update shipping courier',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Shipping Courier Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="shippingCourier"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Shipping Courier
          </label>
          <textarea
            id="shippingCourier"
            rows={6}
            value={courier}
            onChange={(e) => setCourier(e.target.value)}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
            placeholder="e.g., FedEx, Blue Dart, Delhivery"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Courier'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ShippingDetailsSection
