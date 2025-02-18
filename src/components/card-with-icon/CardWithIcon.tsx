import { FC } from 'react'
import AppCard from '~/components/app-card/AppCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from '~/components/card-with-link/CardWithLink.styles'
import { Icon, Box } from '@mui/material'
import * as React from 'react'

interface CardWithLinkProps {
  title: string
  description: string
  link?: string
  color: string
  icon: string
}

const CardWithIcon: FC<CardWithLinkProps> = ({
  icon,
  title,
  description,
  link,
  color
}) => {
  return (
    <AppCard link={link} sx={styles.container}>
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
      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
    </AppCard>
  )
}

export default CardWithIcon
