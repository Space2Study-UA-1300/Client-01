import * as React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import { styles } from '~/components/item-card/ItemCard.styles'
import { Icon, Box } from '@mui/material'

interface ItemCardProps {
  title: string
  description: string
  color: string
  icon: string
}

const ItemCard: React.FC<ItemCardProps> = ({
  title,
  description,
  color,
  icon
}) => {
  return (
    <Card
      sx={{
        boxShadow: 'none'
      }}
    >
      <CardActionArea component={Link} sx={styles.container} to=''>
        <Box
          sx={{
            width: 62,
            height: 62,
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: `${color}33`
          }}
        >
          <Icon sx={{ color: color, fontSize: 40 }}>{icon}</Icon>
        </Box>
        <CardContent sx={{ padding: '0' }}>
          <Typography component='div' gutterBottom variant='h6'>
            {title}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }} variant='body2'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ItemCard
