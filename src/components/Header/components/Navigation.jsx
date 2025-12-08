'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaChevronDown } from 'react-icons/fa'

const Navigation = () => {
  const [showCatalogDropdown, setShowCatalogDropdown] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState(null)

  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'CATALOG', href: '/catalog' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'CONTACT US', href: '/contact' },
  ]

  return (
    <nav className="hidden md:block text-white pb-[20px]">
      <div className="max-w-7xl mx-auto h-16 justify-center items-center px-4 bg-[#BA8B4E]">
        <ul className="flex justify-start space-x-8 py-3">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="p-2 relative group"
              onMouseEnter={() =>
                item.name === 'CATALOG' && setShowCatalogDropdown(true)
              }
              onMouseLeave={() => {
                if (item.name === 'CATALOG') {
                  setShowCatalogDropdown(false)
                  setActiveSubmenu(null)
                }
              }}
            >
              <Link
                href={item.href}
                className="text-[14px] font-semibold uppercase hover:opacity-90 flex items-center tracking-wide"
              >
                {item.name}
                {item.name === 'CATALOG' && (
                  <FaChevronDown className="ml-1 text-[10px] mt-0.5" />
                )}
              </Link>

              {item.name === 'CATALOG' && (
                <div
                  className={`absolute left-0 mt-0 w-48 bg-white shadow-lg z-50 border border-gray-200 ${
                    showCatalogDropdown ? 'block' : 'hidden'
                  }`}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  {/* Women with submenu */}
                  <div
                    className="relative group"
                    onMouseEnter={() => setActiveSubmenu('women')}
                  >
                    <Link
                      href="/catalog/women"
                      className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span>Women</span>
                      <FaChevronDown className="text-xs text-gray-400" />
                    </Link>

                    {activeSubmenu === 'women' && (
                      <div className="absolute left-full top-0 w-48 bg-white border-l-0 border border-gray-200 shadow-lg">
                        <Link
                          href="/catalog/women/platinum"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Platinum
                        </Link>
                        <Link
                          href="/catalog/women/diamond"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Diamond
                        </Link>
                        <Link
                          href="/catalog/women/gold"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Gold
                        </Link>
                        <Link
                          href="/catalog/women/necklace"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Necklace
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Men with submenu */}
                  <div
                    className="relative group"
                    onMouseEnter={() => setActiveSubmenu('men')}
                  >
                    <Link
                      href="/catalog/men"
                      className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span>Men</span>
                      <FaChevronDown className="text-xs text-gray-400" />
                    </Link>

                    {activeSubmenu === 'men' && (
                      <div className="absolute left-full top-0 w-48 bg-white border-l-0 border border-gray-200 shadow-lg">
                        <Link
                          href="/catalog/men/gold"
                          className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <span>Gold</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
