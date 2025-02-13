import * as React from 'react'
import { Box, useTheme } from '@mui/material'
import { styles } from '~/containers/card-container/CardContainer.styles'
import CardWithLink from '~/components/card-with-icon/CardWithIcon'

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
}

interface CardContainerProps {
  responseData: ResponseData
}

const CardContainer: React.FC<CardContainerProps> = ({ responseData }) => {
  const theme = useTheme()

  return (
    <Box sx={styles(theme).container}>
      {responseData.items.map((item) => (
        <CardWithLink
          color={item.appearance.color}
          description={`${item.offers} offers`}
          icon={item.appearance.icon}
          key={item._id}
          title={item.name}
        />
      ))}
    </Box>
  )
}

export default CardContainer
