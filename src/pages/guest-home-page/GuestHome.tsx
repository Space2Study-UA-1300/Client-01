import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'

import { descriptionTimes } from '~/components/accordion-with-image/accordion-with-image.constants'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import EmailConfirmModal from '~/containers/email-confirm-modal/EmailConfirmModal'
import FeatureBlock from '~/containers/guest-home-page/FeatureBlock'
import Welcome from '~/containers/guest-home-page/Welcome'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'
import HowItWorks from '~/containers/guest-home-page/how-it-works/HowItWorks'
import CategoryList from '~/containers/category-list-container/CategoryList'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import ResetPassword from '~/containers/guest-home-page/reset-password/ResetPassword'
import WhoWeAre from '~/containers/guest-home-page/who-we-are/WhoWeAre'
import { useModalContext } from '~/context/modal-context'
import { styles } from '~/pages/guest-home-page/GuestHome.styles'

const GuestHomePage = () => {
  const { openModal } = useModalContext()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const confirmToken = searchParams.get('confirmToken')
    const resetToken = searchParams.get('resetToken')
    confirmToken &&
      openModal({
        component: (
          <EmailConfirmModal
            confirmToken={confirmToken}
            openModal={openModal}
            userEmail=''
          />
        )
      })
    resetToken &&
      openModal({
        component: (
          <ResetPassword openModal={openModal} resetToken={resetToken} />
        )
      })
    searchParams.get('login') !== null &&
      openModal({ component: <LoginDialog /> })

    setSearchParams([])
  }, [searchParams, setSearchParams, openModal])

  const responseData = {
    items: [
      {
        _id: '64b78c33f1e3df00123abcd9',
        name: 'Music',
        appearance: {
          color: '#66C42C',
          icon: 'language'
        },
        offers: 0
      },
      {
        _id: '64b78c33f1e3df00123abcda',
        name: 'Art',
        appearance: {
          color: '#FF5733',
          icon: 'palette'
        },
        offers: 5
      },
      {
        _id: '64b78c33f1e3df00123abcdb',
        name: 'Technology',
        appearance: {
          color: '#4287f5',
          icon: 'settings'
        },
        offers: 12
      },
      {
        _id: '64b78c33f1e3df00123abcdc',
        name: 'Sports',
        appearance: {
          color: '#F5A623',
          icon: 'sports'
        },
        offers: 7
      },
      {
        _id: '64b78c33f1e3df00123abcdd',
        name: 'Travel',
        appearance: {
          color: '#A020F0',
          icon: 'flight'
        },
        offers: 3
      }
    ],
    count: 5
  }

  return (
    <Box sx={styles.root}>
      <Welcome />
      <PageWrapper sx={styles.sectionsWrapper}>
        <FeatureBlock items={descriptionTimes} />
        <WhatCanYouDo />
        <CategoryList responseData={responseData} />
        <HowItWorks />
        <WhoWeAre />
      </PageWrapper>
    </Box>
  )
}
export default GuestHomePage
