import { useTranslation } from 'react-i18next'
import { Avatar, Box, Icon, Typography } from '@mui/material'

import AppCard from '../app-card/AppCard'
import AppButton from '../app-button/AppButton'
import AppRatingMobile from '../app-rating-mobile/AppRatingMobile'
import SubjectLevelWithlabels from '../subject-level-with-labels/SubjectLevelWithLabels'

import { styles } from '~/components/offer-card-square/OfferCardSquare.styles'
import { ButtonVariantEnum } from '~/types'

const OfferCardSquare = ({ offer }) => {
  const { t } = useTranslation()
  return (
    <AppCard sx={styles.card}>
      <Box sx={styles.authorContainer}>
        <AppButton
          onClick={() => {}}
          sx={styles.imageButton}
          variant={ButtonVariantEnum.Text}
        >
          <Avatar src={offer.author.photo} sx={styles.image} />
        </AppButton>
        <Box sx={styles.authorInfo}>
          <Box>
            <Typography sx={styles.fullName} variant={'h6'}>
              {offer.author.firstName}
            </Typography>
            <Typography sx={styles.lastName} variant={'h6'}>
              {offer.author.lastName}
            </Typography>
          </Box>
          <Box sx={styles.languages}>
            <Icon>languages</Icon>

            <Typography>{offer.languages.join(', ')}</Typography>
          </Box>
        </Box>
        <Icon sx={styles.bookmark}>bookmark_border</Icon>
      </Box>
      <Typography sx={styles.title} variant={'h6'}>
        {offer.title}
      </Typography>
      <Box sx={styles.subjectInfo}>
        <SubjectLevelWithlabels
          color={offer.category.appearance.color}
          proficiencyLevel={offer.proficiencyLevel}
          subject={offer.subject.name}
        />
      </Box>
      <Box sx={styles.actionsContainer}>
        <Box sx={styles.currencyBlock}>
          <Box>
            <Typography variant={'h6'}>
              {offer.price} {t('findOffers.currency')}
            </Typography>
            <Typography variant={'body2'}>/{t('findOffers.hour')}</Typography>
          </Box>

          <AppRatingMobile
            reviewsCount={offer.author.averageRating.tutor}
            value={offer.author.totalReviews.tutor}
          />
        </Box>
        <AppButton>{t('button.showDetails')}</AppButton>
        <AppButton variant={'tonal'}>{t('button.sendMessage')}</AppButton>
      </Box>
    </AppCard>
  )
}

export default OfferCardSquare
