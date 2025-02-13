import React from 'react'
import Box from '@mui/material/Box'
import { styles } from '~/containers/category-list-container/CategoryList.styles'
import CardContainer from '~/containers/card-container/CardContainer'
import Button from '@mui/material/Button'

import { useTranslation } from 'react-i18next'

interface Appearance {
  color: string
  icon: string
}

interface Item {
  _id: string
  name: string
  appearance: Appearance
  offers: number
}

interface ResponseData {
  items: Item[]
  count: number
}

interface CategoryListProps {
  responseData: ResponseData
}

const CategoryList: React.FC<CategoryListProps> = ({ responseData }) => {
  const { t } = useTranslation()
  return (
    <Box>
      <Box sx={styles.container}>
        <CardContainer responseData={responseData} />
        <Button size='extraLarge' sx={styles.button} variant='tonal'>
          {t('button.ViewMore')}
        </Button>
      </Box>
    </Box>
  )
}

export default CategoryList
