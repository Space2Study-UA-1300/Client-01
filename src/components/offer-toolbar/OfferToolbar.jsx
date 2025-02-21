import { Box } from '@mui/material'

import OfferViewSwitcher from '../offer-view-switcher/OfferViewSwitcher'
import OfferSortMenu from '../offer-sort-menu/OfferSortMenu'
import OfferRoleSwitcher from '../offer-role-switcher/OfferRoleSwitcher'
import OfferFilterToggler from '../offer-filter-toggler/OfferFilterToggler'

import { styles } from '~/components/offer-toolbar/OfferToolbar.styles'

const OfferToolbar = ({ setIsFilterShown, setViewMode, viewMode }) => {
  return (
    <Box sx={styles.toolbar}>
      <OfferFilterToggler setIsFilterShown={setIsFilterShown} />
      <OfferRoleSwitcher />
      <Box sx={styles.viewOptions}>
        <OfferSortMenu />
        <OfferViewSwitcher setViewMode={setViewMode} viewMode={viewMode} />
      </Box>
    </Box>
  )
}

export default OfferToolbar
