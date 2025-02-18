import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import {
  CategoryInterface,
  CategoryNameInterface,
  CategoriesParams,
  ItemsWithCount
} from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const categoryService = {
  getCategories: (
    params?: Partial<CategoriesParams>
  ): Promise<AxiosResponse<ItemsWithCount<CategoryInterface>>> => {
    return axiosClient.get(URLs.categories.get, { params })
  },

  getCategoriesNames: (): Promise<AxiosResponse<CategoryNameInterface[]>> => {
    return axiosClient.get(URLs.categories.getNames)
  },

  createCategories: (
    name: string,
    icon: string = 'language',
    color: string = '#66C42C'
  ): Promise<AxiosResponse<CategoryInterface>> => {
    const categoryPath = createUrlPath(URLs.categories.createCategory)
    return axiosClient.post(categoryPath, {
      name,
      appearance: {
        icon,
        color
      },
      offers: 0
    })
  }
}
