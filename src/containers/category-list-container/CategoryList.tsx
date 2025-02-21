import React from 'react'
import Box from '@mui/material/Box'
import { styles } from '~/containers/category-list-container/CategoryList.styles'
import CardContainer from '~/containers/card-container/CardContainer'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

import { useTranslation } from 'react-i18next'

interface Item {
  _id: string
  name: string
  offers: number
  appearance: {
    color: string
    icon: string
  }
}

interface CategoryListProps {
  isExpandable: boolean
  loadMore: () => void
  addSearchParams: () => void
  responseData: Item[]
}

const CategoryList = ({
  isExpandable,
  responseData,
  loadMore,
  addSearchParams
}: CategoryListProps) => {
  const { t } = useTranslation()

  const handlerClick = () => {
    addSearchParams()
    loadMore()
  }
  return (
    <Box>
      <Box sx={styles.container}>
        <Typography sx={styles.text}>
          {t('categoriesPage.findRequestText')}{' '}
          <Link href='/categories' underline='always'>
            {t('categoriesPage.category')}
          </Link>{' '}
          or{' '}
          <Link href='/categories/subjects' underline='always'>
            subject!
          </Link>
        </Typography>
        <CardContainer responseData={responseData} />
        <Button
          disabled={!isExpandable}
          onClick={handlerClick}
          size='extraLarge'
          sx={styles.button}
          variant='tonal'
        >
          {t('button.ViewMore')}
        </Button>
      </Box>
    </Box>
  )
}

export default CategoryList
