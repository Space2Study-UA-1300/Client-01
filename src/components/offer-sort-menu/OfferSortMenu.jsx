import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import AppSelect from '../app-select/AppSelect'

const OfferSortMenu = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedSortItem, setSelectedSortItem] = useState('newest')
  const fields = [
    {
      value: 'newest',
      title: t(`findOffers.sortTitles.newest`)
    },
    {
      value: 'priceAsc',
      title: t(`findOffers.sortTitles.priceAsc`)
    },
    {
      value: 'priceDesc',
      title: t(`findOffers.sortTitles.priceDesc`)
    },
    {
      value: 'name',
      title: t(`findOffers.sortTitles.name`)
    }
  ]

  const sortOptions = {
    priceAsc: JSON.stringify({ order: 'asc', orderBy: 'price' }),
    priceDesc: JSON.stringify({ order: 'desc', orderBy: 'price' }),
    name: JSON.stringify({
      order: 'asc',
      orderBy: `title`
    })
  }

  const onChangeSortOffer = (value) => {
    searchParams.delete('sort')

    if (value !== 'newest') {
      searchParams.set('sort', sortOptions[value])
    }

    setSearchParams(searchParams)
    setSelectedSortItem(value)
  }

  const getSortParamsFromUrl = (params) => {
    if (!params) return

    const decodedParams = decodeURIComponent(params)

    const result = Object.keys(sortOptions).find(
      (key) => sortOptions[key] === decodedParams
    )

    if (!result) {
      searchParams.delete('sort')
      setSearchParams(searchParams)
      return
    }

    setSelectedSortItem(result)
  }

  useEffect(() => {
    getSortParamsFromUrl(searchParams.get('sort'))
  }, [searchParams])

  return (
    <AppSelect
      fields={fields}
      onChange={(e) => onChangeSortOffer(e.target.value)}
      selectTitle={'Sort by:'}
      setValue={setSelectedSortItem}
      sx={{ minWidth: '185px', maxWidth: '185px', flexShrink: 0 }}
      value={selectedSortItem}
    />
  )
}

export default OfferSortMenu
