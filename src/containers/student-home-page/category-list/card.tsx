import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'

const ActionAreaCard = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          alt='green iguana'
          component='img'
          height='140'
          image='/static/images/cards/contemplative-reptile.jpg'
        />
        <CardContent>
          <Typography component='div' gutterBottom variant='h5'>
            Lizard
          </Typography>
          <Typography sx={{ color: 'text.secondary' }} variant='body2'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ActionAreaCard
