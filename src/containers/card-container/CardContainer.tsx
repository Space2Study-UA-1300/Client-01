import * as React from 'react'
import { Box, useTheme } from '@mui/material'
import ItemCard from '~/components/item-card/ItemCard'
import { styles } from '~/containers/card-container/CardContainer.styles'
const CardContainer = () => {
  const theme = useTheme()

  return (
    <Box sx={styles(theme).container}>
      <ItemCard
        color={'#79B260'}
        description={'234 student'}
        icon={'languages'}
        title={'Language'}
      />
      <ItemCard
        color={'#79B260'}
        description={'234 student'}
        icon={'languages'}
        title={'Language'}
      />
      <ItemCard
        color={'#79B260'}
        description={'234 student'}
        icon={'languages'}
        title={'Language'}
      />
    </Box>
  )
}
export default CardContainer
