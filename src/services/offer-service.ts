import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { Offer, ItemsWithCount, OfferParams } from '~/types'

export const offerService = {
  getOffers: (
    params?: Partial<OfferParams>
  ): Promise<AxiosResponse<ItemsWithCount<Offer>>> => {
    return axiosClient.get(URLs.offers.get, { params })
  }
}
