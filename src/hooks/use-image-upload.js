import { useState } from 'react'
import { uploadImageToCloudinary } from '~/services/cloudinary-service'

export const useImageUpload = () => {
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)

  const uploadImageToService = async (file) => {
    try {
      const data = new FormData()
      data.append('image', file)
      const res = await uploadImageToCloudinary(data)
      const { public_id, url } = res.data

      return { publicId: public_id, url }
    } catch (error) {
      setError('Error server! Please try again later')
      setOpen(true)
    }
  }

  return { uploadImageToService, error, open, setOpen }
}
