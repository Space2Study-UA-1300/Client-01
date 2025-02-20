import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { offerService } from '~/services/offer-service'

import useBreakpoints from '~/hooks/use-breakpoints'
import { useAppSelector } from '~/hooks/use-redux'
import usePagination from '~/hooks/table/use-pagination'
import useAxios from '~/hooks/use-axios'
import { authRoutes } from '~/router/constants/authRoutes'
import { getOppositeRole, getScreenBasedLimit } from '~/utils/helper-functions'

import { Box } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import AppPagination from '~/components/app-pagination/AppPagination'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import DirectionLink from '~/components/direction-link/DirectionLink'
import Loader from '~/components/loader/Loader'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import OfferFilterMenu from '~/components/offer-filter-menu/OfferFilterMenu'
import OfferToolbar from '~/components/offer-toolbar/OfferToolbar'
import OfferList from '~/containers/offer-list/OfferList'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { itemsLoadLimit } from '~/constants'
import { CategoryNameInterface, SizeEnum } from '~/types'
import { styles } from '~/pages/find-offers/FindOffers.styles'

const FindOffers = () => {
  const { t } = useTranslation()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isFilterShown, setIsFilterShown] = useState(false)

  const { userRole } = useAppSelector((state) => state.appMain)
  const opositeRole = getOppositeRole(userRole)

  const breakpoints = useBreakpoints()
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const [searchParams, setSearchParams] = useSearchParams({
    authorRole: opositeRole
  })

  const categoryId = searchParams.get('category') ?? ''
  const subjectId = searchParams.get('subject') ?? ''
  const limit = Number(searchParams.get('limit')) || itemsPerPage

  const { page, handleChangePage, clearPage } = usePagination({
    itemsPerPage: limit
  })

  const params = useMemo(
    () => ({ ...Object.fromEntries(searchParams.entries()) }),
    [searchParams]
  )

  const resetPagination = () => {
    searchParams.delete('skip')
  }

  const getSubjectsService = useCallback(
    () => subjectService.getSubjectsNames(categoryId),
    [categoryId]
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

    resetPagination()
    clearPage()

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

    resetPagination()
    clearPage()

    setSearchParams(searchParams)
  }

  const onSearchHandler = (data: string) => {
    if (!data) {
      searchParams.delete('search')
    } else {
      searchParams.set('search', data)
    }

    resetPagination()
    clearPage()

    setSearchParams(searchParams)
  }

  const onChangePageHandler = (e: ChangeEvent<unknown>, page: number) => {
    handleChangePage(e, page)
    if (page > 1) {
      searchParams.set('skip', `${(page - 1) * limit}`)
    } else {
      searchParams.delete('skip')
    }
    setSearchParams(searchParams)
  }

  const {
    response: { items, count },
    loading,
    fetchData
  } = useAxios({
    service: offerService.getOffers,
    defaultResponse: { items: [], count: 0 },
    fetchOnMount: false
  })

  useEffect(() => {
    void fetchData({
      limit: itemsPerPage,
      ...params
    })
  }, [params, fetchData, itemsPerPage])

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

      <OfferToolbar
        setIsFilterShown={setIsFilterShown}
        setViewMode={setViewMode}
        viewMode={viewMode}
      />

      <Box sx={styles.container}>
        <OfferFilterMenu clearPage={clearPage} isVisible={isFilterShown} />
        {loading ? (
          <Loader />
        ) : items.length ? (
          <OfferList
            isFilterVisible={isFilterShown}
            offers={items}
            viewMode={viewMode}
          />
        ) : (
          <NotFoundResults description={t('findOffers.notFound.description')} />
        )}
      </Box>
      <AppPagination
        onChange={onChangePageHandler}
        page={page}
        pageCount={Math.ceil(count / limit)}
      />
    </PageWrapper>
  )
}

export default FindOffers
