import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getOppositeRole } from '~/utils/helper-functions'

import { Box } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import useBreakpoints from '~/hooks/use-breakpoints'
import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { offerService } from '~/services/offer-service'
import { authRoutes } from '~/router/constants/authRoutes'
import { getScreenBasedLimit } from '~/utils/helper-functions'

import DirectionLink from '~/components/direction-link/DirectionLink'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import Loader from '~/components/loader/Loader'
import OfferViewSwitcher from '~/components/offer-view-switcher/OfferViewSwitcher'
import OfferList from '~/containers/offer-list/OfferList'
import { useAppSelector } from '~/hooks/use-redux'
import { itemsLoadLimit } from '~/constants'
import { styles } from '~/pages/find-offers/FindOffers.styles'
import { CategoryNameInterface, SizeEnum } from '~/types'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import { SwitchOptions } from '~/types'

const FindOffers = () => {
  const { userRole } = useAppSelector((state) => state.appMain)
  const oppositeRole: string = getOppositeRole(userRole)
  const [active, setActive] = useState(false)
  const { t } = useTranslation()
  const breakpoints = useBreakpoints()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('category') ?? ''
  const subjectId = searchParams.get('subject') ?? ''
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const onChangeSwitch = () => {
    setActive((prev) => !prev)
  }
  const mockSwitchOptionsWithoutTooltip: SwitchOptions = {
    left: {
      text: t(`findOffers.switchOption.${oppositeRole}`)
    },
    right: {
      text: t(`findOffers.switchOption.${userRole}`)
    }
  }
  const params = useMemo(
    () => ({ ...Object.fromEntries(searchParams.entries()) }),
    [searchParams]
  )

  const onCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    searchParams.delete('subject')
    if (!value) {
      searchParams.delete('category')
    } else {
      searchParams.set('category', value._id)
    }

    setSearchParams(searchParams)
  }

  const onSubjectChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    if (!value) {
      searchParams.delete('subject')
    } else {
      searchParams.set('subject', value._id)
    }

    setSearchParams(searchParams)
  }

  const getSubjectsService = useCallback(
    () => subjectService.getSubjectsNames(categoryId),
    [categoryId]
  )

  const autoCompleteCategories = (
    <AsyncAutocomplete
      labelField='name'
      onChange={onCategoryChange}
      service={categoryService.getCategoriesNames}
      sx={styles.categoryInput}
      textFieldProps={{
        label: t('breadCrumbs.categories')
      }}
      value={categoryId}
      valueField='_id'
    />
  )

  const autoCompleteSubjects = (
    <AsyncAutocomplete
      disabled={!categoryId}
      fetchCondition={!!categoryId}
      labelField='name'
      onChange={onSubjectChange}
      service={getSubjectsService}
      sx={styles.categoryInput}
      textFieldProps={{
        label: t('breadCrumbs.subject')
      }}
      value={subjectId}
      valueField='_id'
    />
  )

  const onSearchHandler = (data: string) => {
    if (!data) {
      searchParams.delete('search')
    } else {
      searchParams.set('search', data)
    }

    setSearchParams(searchParams)
  }

  const {
    response: { items },
    loading,
    fetchData
  } = useAxios({
    service: offerService.getOffers,
    defaultResponse: { items: [], count: 0 },
    fetchOnMount: false
  })

  useEffect(() => {
    void fetchData({ ...params, limit: cardsLimit })
  }, [params, fetchData, cardsLimit])

  return (
    <PageWrapper>
      <TitleWithDescription
        description={t('findOffers.titleWithDescription.description')}
        style={styles.titleWithDescription}
        title={t('findOffers.titleWithDescription.title')}
      />

      <Box sx={styles.navigation}>
        <DirectionLink
          before={<ArrowBackIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.subjects.path}
          title={t('findOffers.backToAllSubjects')}
        />
      </Box>

      <AppToolbar sx={styles.searchToolbar}>
        {!breakpoints.isMobile && autoCompleteCategories}
        {!breakpoints.isMobile && autoCompleteSubjects}
        <SearchFilterInput
          textFieldProps={{
            placeholder: t('findOffers.searchToolbar.label')
          }}
          updateFilter={onSearchHandler}
        />
      </AppToolbar>
      <Box sx={{ height: 50, width: 150 }}>
        <AppContentSwitcher
          active={active}
          onChange={onChangeSwitch}
          switchOptions={mockSwitchOptionsWithoutTooltip}
          typographyVariant='body1'
        />
      </Box>
      <OfferViewSwitcher setViewMode={setViewMode} viewMode={viewMode} />

      {loading ? (
        <Loader />
      ) : items.length ? (
        <OfferList offers={items} viewMode={viewMode} />
      ) : (
        <NotFoundResults description={t('findOffers.notFound.description')} />
      )}
    </PageWrapper>
  )
}

export default FindOffers
