import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import { SwitchOptions } from '~/types'
import { Box } from '@mui/material'
import { useState } from 'react'
import { useAppSelector } from '~/hooks/use-redux'
import { useTranslation } from 'react-i18next'
import { getTheOppositeRole } from '~/utils/helper-functions'


const FindOffers = () => {
  const { userRole } = useAppSelector((state) => state.appMain)
  console.log(userRole)
  const oppositeRole = getTheOppositeRole(userRole)
  const [active, setActive] = useState(false)
  const { t } = useTranslation()
  //const [role, setRole] = useState<UserRoleEnum | string>('')
  const onChange = () => {
    setActive((prev) => !prev)
  }
  // useEffect(() => {
  //   setRole(userRole)
  // }, [userRole])
  const mockSwitchOptionsWithoutTooltip: SwitchOptions = {
    left: {
      text: t(`findOffers.${oppositeRole}.text`)
    },
    right: {
      text: t(`findOffers.${oppositeRole}.text`)
    }
  }
  return (
    <PageWrapper>
      <Box sx={{ height: 50, width: 150 }}>
        <AppContentSwitcher
          active={active}
          onChange={onChange}
          switchOptions={mockSwitchOptionsWithoutTooltip}
          typographyVariant='body1'
        />
      </Box>
    </PageWrapper>
  )
}

export default FindOffers
