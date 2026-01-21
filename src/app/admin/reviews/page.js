'use client'

import { useEffect, useMemo, useCallback } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchReviews,
  deleteReview,
  selectAllReviews,
} from '@/features/reviews/reviewsSlice'
import toast from 'react-hot-toast'
import {
  TanstackTable,
  useTableQueryParams,
} from '@/components/admin/TanStackTable'

const columnHelper = createColumnHelper()

const ReviewsTable = () => {
  const dispatch = useDispatch()
  const { params } = useTableQueryParams()

  const getReviews = useCallback(async () => {
    try {
      dispatch(
        fetchReviews({
          search: params?.search ?? undefined,
          sortBy: params?.sortBy,
          direction: params?.sortBy ? params.direction : undefined,
          page: params?.pageIndex + 1,
          limit: params?.pageSize ?? 10,
          filterBy: params?.filterBy || undefined,
        }),
      )
    } catch (error) {
      console.error(error)
    }
  }, [dispatch, params])

  const handleDelete = useCallback(
    async (review) => {
      if (!window.confirm('Are you sure you want to delete this review?')) {
        return
      }
      try {
        await dispatch(
          deleteReview({
            productId: review.productId,
            reviewId: review._id,
          }),
        ).unwrap()
        toast.success('Review deleted successfully')
        getReviews()
      } catch (error) {
        toast.error(error?.message || 'Failed to delete review')
      }
    },
    [dispatch, getReviews],
  )

  const columns = useMemo(
    () => [
      columnHelper.accessor('_id', {
        header: 'ID',
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor('productName', {
        header: 'Product Name',
        cell: (info) => (
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-medium text-gray-900">{info.getValue()}</div>
            </div>
          </div>
        ),
        enableSorting: true,
        sortingFn: 'text',
      }),
      columnHelper.accessor('comment', {
        header: 'Review Text',
        cell: (info) => (
          <div className="max-w-md">
            <p className="text-sm text-gray-700 line-clamp-3">
              {info.getValue()}
            </p>
            {info.row.original.updatedAt &&
              info.row.original.updatedAt !== info.row.original.createdAt && (
                <div className="text-xs text-blue-600 mt-1">
                  Edited{' '}
                  {new Date(info.row.original.updatedAt).toLocaleDateString()}
                </div>
              )}
          </div>
        ),
        enableSorting: true,
        sortingFn: 'text',
      }),
      columnHelper.accessor('createdAt', {
        header: 'Date',
        cell: (info) => (
          <div className="text-sm">
            <div className="font-medium text-gray-900">
              {new Date(info.getValue()).toLocaleDateString()}
            </div>
            <div className="text-gray-500">
              {new Date(info.getValue()).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        ),
        enableSorting: true,
        sortingFn: 'datetime',
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <button
            onClick={() => handleDelete(row.original)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-full hover:text-red-700 transition-colors"
            title="Delete Review"
          >
            <FaTrash className="w-4 h-4" />
          </button>
        ),
        enableSorting: false,
      }),
    ],
    [handleDelete],
  )

  const {
    data: reviewsData,
    pagination: apiPagination,
    isLoading,
    error,
  } = useSelector(selectAllReviews)

  useEffect(() => {
    getReviews()
  }, [getReviews])

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">List of Reviews</h2>
      <TanstackTable
        columns={columns}
        data={reviewsData || []}
        isLoading={isLoading}
        mode="server"
        pageCount={apiPagination?.totalPages || 1}
      />
    </div>
  )
}

export default ReviewsTable
