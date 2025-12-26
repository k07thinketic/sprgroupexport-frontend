'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import AdminAddImageModal from '@/components/AdminAddImageModal'

const mockImages = {
  data: [
    {
      _id: '6939571c5591824835160513',
      originalUrl:
        'https://vos43ibt37cj25fd.public.blob.vercel-storage.com/media/original/1765365531181-shizuka.jpg',
      originalWidth: 738,
      originalHeight: 983,
      thumbnailUrl:
        'https://vos43ibt37cj25fd.public.blob.vercel-storage.com/media/thumbnail/1765365532012-thumbnail_shizuka.jpg',
      thumbnailWidth: 150,
      thumbnailHeight: 150,
      mediumUrl:
        'https://vos43ibt37cj25fd.public.blob.vercel-storage.com/media/medium/1765365532021-medium_shizuka.jpg',
      mediumWidth: 400,
      mediumHeight: 400,
      largeUrl:
        'https://vos43ibt37cj25fd.public.blob.vercel-storage.com/media/large/1765365532028-large_shizuka.jpg',
      largeWidth: 900,
      largeHeight: 900,
      createdAt: '2025-12-10T11:18:52.793Z',
      updatedAt: '2025-12-10T11:18:52.793Z',
      __v: 0,
    },
  ],
}

const fetchImages = async () => {
  try {
    const response = await fetch('/media/get-all')
    const data = await response.json()
    return data?.data || []
  } catch (e) {
    console.error('Get All Images: ', e)
  }
  return mockImages.data
}

export default function MediaListPage() {
  const [images, setImages] = useState([])
  const [selected, setSelected] = useState([])
  const [openAddImage, setOpenAddImage] = useState(false)

  const loadImages = async () => {
    const imgs = await fetchImages()
    setImages(imgs)
    setSelected([])
  }

  useEffect(() => {
    ;(async () => {
      await loadImages()
    })()
  }, [])

  const isSelected = (id) => selected.includes(id)

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  }

  const selectAll = () => setSelected(images.map((i) => i.id))
  const unselectAll = () => setSelected([])

  const handleDelete = async () => {
    if (!selected.length) {
      alert('Select at least one image')
      return
    }

    if (!confirm('Delete selected images?')) return

    await fetch('/media/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selected),
    })

    await loadImages()
  }

  return (
    <div className="space-y-3">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Listing All The Images</h3>

        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded font-semibold"
          >
            Delete
          </button>

          <button
            onClick={selectAll}
            className="px-4 py-2 bg-green-600 text-white rounded font-semibold"
          >
            Select All
          </button>

          <button
            onClick={unselectAll}
            className="px-4 py-2 bg-sky-500 text-white rounded font-semibold"
          >
            UnSelect All
          </button>

          <button
            onClick={() => setOpenAddImage(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded font-semibold"
          >
            Add New
          </button>
        </div>
        <AdminAddImageModal
          open={openAddImage}
          onClose={() => setOpenAddImage(false)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {images.map((img) => (
          <div key={img._id} className="text-center">
            <div
              onClick={() => toggleSelect(img.id)}
              className={`
                cursor-pointer rounded border-2 p-1 transition
                ${
                  isSelected(img.id)
                    ? 'border-2 border-blue-600 opacity-80'
                    : 'border-transparent hover:border-gray-400'
                }
              `}
            >
              <Image
                src={img.thumbnailUrl}
                alt=""
                width={200}
                height={200}
                className="object-contain"
              />
            </div>

            <a
              href={`/admin/media/detail/${img._id}`}
              className="block py-2 bg-sky-600 text-white text-sm rounded"
            >
              View Detail
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
