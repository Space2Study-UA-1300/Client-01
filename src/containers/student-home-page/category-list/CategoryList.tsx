import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/containers/student-home-page/category-list/CategoryList.styles'

const CategoryList = () => {
  const { t } = useTranslation()

  return (
    <Box>
      <Box sx={styles.container}>
        <Typography sx={styles.title}>
          {t('guestHomePage.howItWorks.title')}
        </Typography>
      </Box>
    </Box>
  )
}

export default CategoryList
