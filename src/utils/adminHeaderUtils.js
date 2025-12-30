export function getAdminBreadcrumbs(menu, pathname) {
  const breadcrumbs = [{ label: 'Dashboard', href: '/admin' }]

  function traverse(items, parents = []) {
    for (const item of items) {
      const currentTrail = [...parents, item]

      if (item.href === pathname) {
        breadcrumbs.push(
          ...currentTrail.map(({ label, href }) => ({ label, href })),
        )
        return true
      }

      if (item.children) {
        if (traverse(item.children, currentTrail)) {
          return true
        }
      }
    }
    return false
  }

  traverse(menu)

  return breadcrumbs.filter((val) => Boolean(val.href))
}
