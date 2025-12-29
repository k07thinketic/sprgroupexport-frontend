import api from '@/lib/axios'
import Image from 'next/image'
import React from 'react'

const image = {
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
}

const getImageDetails = async (id) => {
  try {
    const resp = await api.get(`/media/${id}`)
    return resp.data
  } catch (e) {
    console.error('Get Image Details: ', e)
    return image
  }
}

const page = async ({ params }) => {
  const { _id } = params
  const image = await getImageDetails(_id)
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-semibold">{`ACTUAL (${image.originalHeight} X ${image.originalWidth})`}</h2>
      <Image
        src={image.originalUrl}
        alt=""
        width={image.originalWidth}
        height={image.originalHeight}
        className="object-contain"
      />

      <div className="flex justify-center">
        <div className="w-full max-w-xl">
          <div className="flex rounded border overflow-hidden">
            <span className="bg-gray-100 px-3 flex items-center text-sm font-medium border-r">
              Path
            </span>

            <input
              type="text"
              name="path"
              readOnly
              value={image.originalUrl}
              className="flex-1 px-3 py-2 text-sm outline-none bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
