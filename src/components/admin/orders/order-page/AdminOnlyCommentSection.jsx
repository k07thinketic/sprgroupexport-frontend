'use client'

import React, { useState, useEffect } from 'react'
import { toast } from '@/utils/toastConfig'
import api from '@/lib/axios'

const AdminOnlyCommentSection = ({
  orderId,
  initialComment,
  onCommentUpdated,
}) => {
  const [adminComment, setAdminComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (initialComment && initialComment.message) {
      setAdminComment(initialComment.message)
    }
  }, [initialComment])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!adminComment.trim()) {
      toast.error('Please enter a comment')
      return
    }

    setIsSubmitting(true)
    try {
      const payload = {
        onlyAdminComment: [{ message: adminComment.trim() }],
      }

      await api.put(`/orders/update-status/${orderId}`, payload)
      toast.success('Admin comment updated successfully')
      onCommentUpdated?.({
        message: adminComment.trim(),
        updatedAt: new Date(),
      })
    } catch (err) {
      console.error('Error updating admin comment:', err)
      toast.error(
        err.response?.data?.message || 'Failed to update admin comment',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        Admin-only Comment ( Admin Notes)
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="adminComment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Comment (Internal)
          </label>
          <textarea
            id="adminComment"
            rows="4"
            value={adminComment}
            onChange={(e) => setAdminComment(e.target.value)}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
            placeholder="Add an internal note about this order (visible only to admins)"
          />
          {initialComment?.updatedAt && (
            <p className="mt-1 text-xs text-gray-500">
              Last updated:{' '}
              {new Date(initialComment.updatedAt).toLocaleString()}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Comment'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminOnlyCommentSection
