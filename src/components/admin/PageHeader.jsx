'use client'

import { getAdminBreadcrumbs } from '@/utils/adminHeaderUtils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function PageHeader({ menu }) {
  const pathname = usePathname()
  const breadcrumbs =
    pathname !== '/admin'
      ? [...getAdminBreadcrumbs(menu, pathname)]
      : [{ label: 'Dashboard', href: '/admin' }]
  const title = breadcrumbs.at(-1)?.label
  const description = breadcrumbs.at(-1)?.description

  return (
    <div className="mb-4 pb-3">
      <div className="lg:flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {title}
          {description && (
            <span className="ml-2 text-sm text-gray-500">{description}</span>
          )}
        </h2>

        <div className="text-xs text-gray-600 bg-gray-300 rounded p-2 lg:bg-transparent lg:p-0">
          {breadcrumbs.map((b, i) => (
            <span key={i}>
              {i !== 0 && ' > '}
              {b.href !== pathname ? (
                <Link href={b.href} className="hover:underline">
                  {b.label}
                </Link>
              ) : (
                <span className="cursor-not-allowed">{b.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
