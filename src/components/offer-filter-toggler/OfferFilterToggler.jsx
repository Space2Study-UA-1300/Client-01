import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Box, Icon, Typography } from '@mui/material'

import { styles } from './OfferFilterToggler.style'

const OfferFilterToggler = ({ setIsFilterShown }) => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const [filtersCount, setFiltersCount] = useState(0)

  const trackedFiltersSet = new Set([
    'price',
    'proficiencyLevel',
    'language',
    'rating'
  ])

  useEffect(() => {
    const count = searchParams
      .keys()
      .reduce((acc, curr) => (trackedFiltersSet.has(curr) ? acc + 1 : acc), 0)

    setFiltersCount(count)
  }, [searchParams])

  return (
    <Box
      onClick={() => setIsFilterShown((prev) => !prev)}
      sx={styles.filterMenu}
    >
      <Icon>filter_list</Icon>
      <Typography variant='h6'>
        {t('findOffers.filterTitles.filters')}
      </Typography>
      <Box sx={styles.filterCount}>
        <Typography sx={styles.filterCountText} variant='body1'>
          {filtersCount}
        </Typography>
      </Box>
    </Box>
  )
}

export default OfferFilterToggler
