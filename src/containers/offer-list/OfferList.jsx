import { Box } from '@mui/material'
import OfferCardSquare from '~/components/offer-card-square/OfferCardSquare'
import OfferCard from '~/components/offer-card/OfferCard'
import { styles } from '~/containers/offer-list/OfferList.styles'

const OfferList = ({ offers, viewMode }) => {
  return (
    <Box sx={{ ...styles.container, ...styles[`container--${viewMode}`] }}>
      {offers?.map((offer) =>
        viewMode === 'list' ? (
          <OfferCard key={offer._id} offer={offer} />
        ) : (
          <OfferCardSquare key={offer._id} offer={offer} />
        )
      )}
    </Box>
  )
}

export default OfferList
