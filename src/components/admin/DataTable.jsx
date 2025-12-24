'use client'

import { useMemo } from 'react'

export default function DataTable({
  columns = [],
  data = [],
  sortBy,
  sortDir = 'asc',
  onSortChange,
  page = 1,
  pageSize = 10,
  total,
  onPageChange,
  mode = 'client',
  emptyText = 'No data available',
}) {
  /* -----------------------------
   Pagination calculations
  ------------------------------ */
  const isServer = mode === 'server'
  const resolvedTotal = isServer ? total || 0 : data.length
  const pageCount = Math.max(1, Math.ceil(resolvedTotal / pageSize))

  const start = (page - 1) * pageSize
  const end = start + pageSize

  /* -----------------------------
   Client-side sorting
  ------------------------------ */
  const sortedData = useMemo(() => {
    if (isServer || !sortBy) return data

    const column = columns.find((c) => c.key === sortBy)
    if (!column) return data

    return [...data].sort((a, b) => {
      const aVal = a[sortBy]
      const bVal = b[sortBy]

      if (aVal == null) return 1
      if (bVal == null) return -1

      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortBy, sortDir, isServer, columns])

  /* -----------------------------
   Client-side pagination
  ------------------------------ */
  const paginatedData = useMemo(() => {
    if (isServer) return data
    return sortedData.slice(start, end)
  }, [sortedData, start, end, isServer, data])

  /* -----------------------------
   Render rows
  ------------------------------ */
  const rows = paginatedData.length ? (
    paginatedData.map((row) => (
      <tr key={row.id} className="border-b hover:bg-gray-50">
        {columns.map((col) => (
          <td
            key={col.key}
            className={`px-3 py-2 text-sm ${
              col.align === 'center'
                ? 'text-center'
                : col.align === 'right'
                  ? 'text-right'
                  : 'text-left'
            }`}
          >
            {col.renderCell ? col.renderCell(row[col.key], row) : row[col.key]}
          </td>
        ))}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={columns.length} className="text-center py-8 text-gray-500">
        {emptyText}
      </td>
    </tr>
  )

  /* -----------------------------
   Header
  ------------------------------ */
  const header = (
    <thead className="bg-gray-50">
      <tr>
        {columns.map((col) => (
          <th
            key={col.key}
            style={{ width: col.width }}
            className={`px-3 py-2 text-xs font-medium uppercase tracking-wider ${
              col.align === 'center'
                ? 'text-center'
                : col.align === 'right'
                  ? 'text-right'
                  : 'text-left'
            }`}
          >
            <button
              disabled={!col.sortable}
              onClick={() =>
                col.sortable &&
                onSortChange?.(
                  col.key,
                  sortBy === col.key && sortDir === 'asc' ? 'desc' : 'asc',
                )
              }
              className={`inline-flex items-center gap-1 ${
                col.sortable ? 'hover:underline' : ''
              }`}
            >
              {col.header}
              {col.sortable && (
                <span
                  className={`text-xs ${
                    sortBy === col.key ? '' : 'opacity-30'
                  }`}
                >
                  {sortDir === 'asc' ? '▲' : '▼'}
                </span>
              )}
            </button>
          </th>
        ))}
      </tr>
    </thead>
  )

  /* -----------------------------
   UI
  ------------------------------ */
  return (
    <div className="border rounded overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        {header}
        <tbody className="divide-y divide-gray-200">{rows}</tbody>
      </table>

      <div className="flex items-center justify-between p-2 bg-gray-50 text-sm">
        <div>
          Showing <b>{resolvedTotal ? start + 1 : 0}</b> to{' '}
          <b>{Math.min(end, resolvedTotal)}</b> of <b>{resolvedTotal}</b>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => onPageChange?.(page - 1)}
          >
            Prev
          </button>

          <span>
            Page {page} / {pageCount}
          </span>

          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            disabled={page >= pageCount}
            onClick={() => onPageChange?.(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
