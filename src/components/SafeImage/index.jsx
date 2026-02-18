'use client'

import Image from 'next/image'
import React, { useRef, useState } from 'react'

const SafeImage = ({ src, fallback="", ...rest }) => {
  const errorCount = useRef(0)
  const [isImageError, setIsImageError] = useState(false)

  const handleOnError = () => {
    if (errorCount <= 3) {
      errorCount + 1
    } else {
      setIsImageError(true)
      console.error("Unable to access image: ", src, "\nShowing fallback image: ", fallback)
    }
  }

  

  return (
    <Image
      {...rest}
      src={isImageError ? fallback : src || fallback}
      onError={handleOnError}
    />
  )
}

export default SafeImage
