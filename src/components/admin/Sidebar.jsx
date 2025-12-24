'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function AdminSidebar({ collapsed = false, menu = [] }) {
  const pathname = usePathname()
  const [open, setOpen] = useState({})

  const toggle = (key) => setOpen((s) => ({ ...s, [key]: !s[key] }))

  return (
    <aside
      className={`${collapsed ? 'w-14' : 'w-64'} transition-all duration-200 bg-slate-900 text-slate-100 h-[calc(100vh-48px)] sticky top-12 overflow-y-auto`}
    >
      <div className="px-3 py-2 text-xs uppercase tracking-wider text-slate-400">
        Navigation
      </div>
      <nav className="px-2 pb-4 space-y-1">
        {menu.map((item) => {
          if (item.children?.length) {
            const isOpen = open[item.key]
            return (
              <div key={item.key}>
                <button
                  onClick={() => toggle(item.key)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded hover:bg-slate-800 ${isOpen ? 'bg-slate-800' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-slate-500" />
                    <span className={`${collapsed ? 'hidden' : ''}`}>
                      {item.label}
                    </span>
                  </span>
                  {!collapsed && (
                    <svg
                      className={`w-4 h-4 transform ${isOpen ? 'rotate-90' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 111.06-1.06l4.24 4.24a.75.75 0 010 1.06l-4.24 4.24a.75.75 0 01-1.06 0z" />
                    </svg>
                  )}
                </button>
                {isOpen && !collapsed && (
                  <div className="ml-6 space-y-1">
                    {item.children.map((child) => {
                      const active = pathname === child.href
                      return (
                        <Link
                          key={child.key}
                          href={child.href}
                          className={`block px-3 py-1.5 rounded hover:bg-slate-800 ${active ? 'bg-slate-800 text-white' : 'text-slate-300'}`}
                        >
                          {child.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }

          const active = pathname === item.href
          return (
            <Link
              key={item.key}
              href={item.href || '#'}
              className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-800 ${active ? 'bg-slate-800' : ''}`}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-slate-500" />
              <span className={`${collapsed ? 'hidden' : ''}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
