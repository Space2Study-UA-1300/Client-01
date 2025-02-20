import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useAppSelector } from '~/hooks/use-redux'
import { getOppositeRole } from '~/utils/helper-functions'

import AppContentSwitcher from '../app-content-switcher/AppContentSwitcher'

const OfferRoleSwitcher = () => {
  const { t } = useTranslation()

  const { userRole } = useAppSelector((state) => state.appMain)
  const oppositeRole = getOppositeRole(userRole)
  const [searchParams, setSearchParams] = useSearchParams()

  const userRoleFromUrl = searchParams.get('authorRole') || oppositeRole
  const [active, setActive] = useState(userRoleFromUrl === userRole)

  const mockSwitchOptionsWithoutTooltip = {
    left: {
      text: t(`findOffers.switchOption.${oppositeRole}`)
    },
    right: {
      text: t(`findOffers.switchOption.${userRole}`)
    }
  }

  const setAuthor = () => {
    searchParams.delete('authorRole')
    setActive(userRoleFromUrl === oppositeRole)
    const roleMapping = {
      tutor: 'student',
      student: 'tutor'
    }
    const mappedRole = roleMapping[userRoleFromUrl] ?? oppositeRole
    if (mappedRole) {
      searchParams.set('authorRole', mappedRole)
    }
    setSearchParams(searchParams)
  }

  const onChangeSwitch = () => {
    setActive((prev) => !prev)
    setAuthor()
  }
  return (
    <AppContentSwitcher
      active={active}
      onChange={onChangeSwitch}
      switchOptions={mockSwitchOptionsWithoutTooltip}
      typographyVariant='body1'
    />
  )
}

export default OfferRoleSwitcher
