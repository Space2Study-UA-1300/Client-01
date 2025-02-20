import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { Box, Icon, Typography } from '@mui/material'

import AppRange from '../app-range/AppRange'
import AppSelect from '../app-select/AppSelect'
import AppButton from '../app-button/AppButton'
import CheckboxList from '../checkbox-list/CheckboxList'
import RadioButtonInputs from '../radio-button-inputs/RadioButtonInputs'

import { ProficiencyLevelEnum } from '~/types'
import { styles } from './OfferFilterMenu.styles'

const OfferFilterMenu = ({ isVisible, clearPage }) => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const levelItems = Object.values(ProficiencyLevelEnum)

  const checkedLevels = searchParams.get('proficiencyLevel')?.split(',') ?? []
  const languageFilter = searchParams.get('language') ?? 'any'
  const ratingFilter = searchParams.get('rating') ?? '0'
  const price = searchParams.get('price')?.split(',') ?? [0, 3500]

  const [filters, setFilters] = useState({
    proficiencyLevel: [].concat(checkedLevels),
    language: languageFilter,
    price: price,
    rating: ratingFilter
  })

  const onChangeFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const ratingItems = [
    { value: '0', title: t('findOffers.radioFilter.any') },
    {
      value: '5',
      title: (
        <Box sx={styles.rating}>
          <Icon sx={styles.starIcon}>grade</Icon>{' '}
          {t('findOffers.radioFilter.5stars')}
        </Box>
      )
    },
    {
      value: '4',
      title: (
        <Box sx={styles.rating}>
          <Icon sx={styles.starIcon}>grade</Icon>{' '}
          {t('findOffers.radioFilter.4stars')}
        </Box>
      )
    },
    {
      value: '3',
      title: (
        <Box sx={styles.rating}>
          <Icon sx={styles.starIcon}>grade</Icon>{' '}
          {t('findOffers.radioFilter.3stars')}
        </Box>
      )
    }
  ]

  const languageItems = [
    { value: 'any', title: 'Any language' },
    { value: 'ukrainian', title: 'Ukrainian' },
    { value: 'german', title: 'German' }
  ]

  const onSetFilters = () => {
    searchParams.delete('proficiencyLevel')
    searchParams.delete('language')
    searchParams.delete('rating')

    if (filters.proficiencyLevel.length > 0) {
      searchParams.set('proficiencyLevel', filters.proficiencyLevel.join(','))
    }

    if (filters.language !== 'any') {
      searchParams.set('language', filters.language)
    }

    if (filters.rating !== '0') {
      searchParams.set('rating', filters.rating)
    }

    searchParams.set('price', filters.price.join(','))

    searchParams.delete('skip')
    clearPage()

    setSearchParams(searchParams)
  }

  return (
    <Box
      sx={{
        ...styles.menu,
        ...(isVisible ? { ...styles['menu-active'] } : {})
      }}
    >
      <CheckboxList
        items={levelItems}
        onChange={(value) => onChangeFilter('proficiencyLevel', value)}
        title={t('findOffers.filterTitles.level')}
        value={filters.proficiencyLevel}
      />
      <Box>
        <Typography sx={styles.groupTitle} variant='h6'>
          {t('findOffers.filterTitles.language')}
        </Typography>
        <AppSelect
          fields={languageItems}
          setValue={(value) => onChangeFilter('language', value)}
          value={filters.language}
        />
      </Box>
      <Box>
        <Typography sx={styles.groupTitle} variant='h6'>
          {t('findOffers.filterTitles.price')}
        </Typography>
        <AppRange
          max={3500}
          min={0}
          onChange={(value) => onChangeFilter('price', value)}
          value={filters.price}
        />
      </Box>
      <RadioButtonInputs
        items={ratingItems}
        onChange={(value) => onChangeFilter('rating', value)}
        title={t('findOffers.filterTitles.rating')}
        value={filters.rating}
      />
      <Box sx={styles.actionButtons}>
        <AppButton fullWidth onClick={onSetFilters} variant='containedLight'>
          Apply filters
        </AppButton>
        <AppButton
          fullWidth
          //   sx={{ backgroundColor: '#ECEFF1', border: '1px solid transparent' }}
          variant='tonal'
        >
          Clear filters
        </AppButton>
      </Box>
    </Box>
  )
}

export default OfferFilterMenu
