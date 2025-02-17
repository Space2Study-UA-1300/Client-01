import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'
import { createUrlPath } from '~/utils/helper-functions'
import { URLs } from '~/constants/request'

export const cloudinaryService = {
  uploadImageToCloudinary: (file: FormData): Promise<AxiosResponse> => {
    return axiosClient.post(URLs.media.uploadImage, file, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  deleteImageFromCloudinary: (publicId: string): Promise<AxiosResponse> => {
    const deleteUrl = createUrlPath(URLs.media.uploadImage, publicId)
    console.log(deleteUrl)
    return axiosClient.delete(deleteUrl)
  }
}
export const { uploadImageToCloudinary, deleteImageFromCloudinary } =
  cloudinaryService
