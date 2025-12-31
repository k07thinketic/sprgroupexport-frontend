import { Arrow, getDeepestActivePath } from '@/utils/adminRouteUtils'

const { default: Link } = require('next/link')

export function SidebarItem({
  item,
  collapsed,
  open,
  toggle,
  activePaths,
  pathname,
}) {
  const deepestActivePath = getDeepestActivePath(activePaths)

  if (item.children?.length) {
    return (
      <div>
        <button
          onClick={() => toggle(item.key)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded
          hover:bg-slate-800 ${open ? 'bg-slate-800' : ''}`}
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            {!collapsed && item.label}
          </span>

          <Arrow open={open} collapsed={collapsed} />
        </button>

        {open && !collapsed && (
          <div className="ml-6 space-y-1">
            {item.children.map((child) => {
              const active = child.href === deepestActivePath

              return (
                <Link
                  key={child.key}
                  href={child.href}
                  className={`block px-3 py-1.5 rounded hover:bg-slate-800
                  ${active ? 'bg-slate-800 text-white' : 'text-slate-300'}`}
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

  function isSidebarItemActive(itemHref, pathname, activePaths) {
    if (itemHref === '/admin') {
      return pathname === '/admin'
    }

    return activePaths.includes(itemHref)
  }

  const active =
    item.href && isSidebarItemActive(item.href, pathname, activePaths)

  return (
    <Link
      href={item.href || '#'}
      className={`flex items-center gap-2 px-3 py-2 rounded
      hover:bg-slate-800 ${active ? 'bg-slate-800' : ''}`}
    >
      <span className="w-2 h-2 rounded-full bg-slate-500" />
      {!collapsed && item.label}
    </Link>
  )
}
