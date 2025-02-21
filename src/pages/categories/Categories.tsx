import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import useLoadMore from '~/hooks/use-load-more'
import useBreakpoints from '~/hooks/use-breakpoints'
import useCategoriesNames from '~/hooks/use-categories-names'
import { categoryService } from '~/services/category-service'
import { getScreenBasedLimit } from '~/utils/helper-functions'
import { mapArrayByField } from '~/utils/map-array-by-field'

import DirectionLink from '~/components/direction-link/DirectionLink'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import { useSearchParams } from 'react-router-dom'

import { CategoryInterface, CategoryNameInterface, SizeEnum } from '~/types'
import { itemsLoadLimit } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/pages/categories/Categories.styles'
import CategoryList from '~/containers/category-list-container/CategoryList'

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [match, setMatch] = useState<string>('')

  const params = useMemo(() => ({ name: match }), [match])

  const { t } = useTranslation()

  const breakpoints = useBreakpoints()

  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const transform = useCallback(
    (data: CategoryNameInterface[]): string[] => mapArrayByField(data, 'name'),
    []
  )

  const { loading: categoriesNamesLoading, response: categoriesNamesItems } =
    useCategoriesNames({
      fetchOnMount: true,
      transform
    })

  const getCategories = useCallback(
    (data?: Pick<CategoryInterface, 'name'>) =>
      categoryService.getCategories(data),
    []
  )

  const {
    data: categories,
    // loading: categoriesLoading,
    resetData,
    loadMore,
    isExpandable
  } = useLoadMore<CategoryInterface, Pick<CategoryInterface, 'name'>>({
    service: getCategories,
    limit: cardsLimit,
    params
  })

  const addSearchParams = () => {
    const newLimit =
      Number(searchParams.get('limit') || cardsLimit) + cardsLimit
    searchParams.set('limit', newLimit.toString())
    setSearchParams(searchParams)
  }

  return (
    <PageWrapper>
      <TitleWithDescription
        description={t('categoriesPage.description')}
        style={styles.titleWithDescription}
        title={t('categoriesPage.title')}
      />

      <Box sx={styles.navigation}>
        <DirectionLink
          after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.findOffers.path}
          title={t('categoriesPage.showAllOffers')}
        />
      </Box>

      <AppToolbar sx={styles.searchToolbar}>
        <SearchAutocomplete
          loading={categoriesNamesLoading}
          onSearchChange={resetData}
          options={categoriesNamesItems}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('categoriesPage.searchLabel')
          }}
        />
      </AppToolbar>
      <CategoryList
        addSearchParams={addSearchParams}
        isExpandable={isExpandable}
        loadMore={loadMore}
        responseData={categories}
      />
    </PageWrapper>
  )
}

export default Categories
