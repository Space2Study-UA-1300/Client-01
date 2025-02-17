import { Box, Icon } from '@mui/material'
import { styles } from './OfferViewSwitcher.styles'

const OfferViewSwitcher = ({ viewMode, setViewMode }) => {
  return (
    <Box sx={styles.displayCards}>
      <Box
        onClick={() => setViewMode('list')}
        sx={{
          ...styles.displayCard,
          ...(viewMode === 'list' ? { ...styles.active } : {})
        }}
      >
        <Icon>list</Icon>
      </Box>
      <Box
        onClick={() => setViewMode('grid')}
        sx={{
          ...styles.displayCard,
          ...(viewMode === 'grid' ? { ...styles.active } : {})
        }}
      >
        <Icon>grid_view</Icon>
      </Box>
    </Box>
  )
}

export default OfferViewSwitcher
