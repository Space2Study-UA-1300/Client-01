import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styles } from '~/containers/student-home-page/category-list/CategoryList.styles'
import CardContainer from '~/containers/card-container/CardContainer'
import Button from '@mui/material/Button'

const CategoryList = () => {
  return (
    <Box>
      <Box sx={styles.container}>
        <Typography sx={styles.title}>Popular Categories</Typography>
        <Typography sx={styles.subtitle}>
          Explore tutoring categories youre passionate about.
        </Typography>
        <CardContainer sx={{ margin: '30px' }} />
        <Button size='extraLarge' variant='tonal'>
          View more
        </Button>
      </Box>
    </Box>
  )
}

export default CategoryList
