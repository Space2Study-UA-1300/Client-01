import { lazy } from 'react'
import { Route } from 'react-router-dom'

import { guestRoutes } from '~/router/constants/guestRoutes'
import { privacyPolicy } from '~/router/constants/crumbs'

import TestLanguage from '~/pages/TestLanguage'

const CookiePolicy = lazy(() => import('~/pages/cookie-policy/CookiePolicy'))

export const guestRouter = (
  <>
    <Route
      element={<CookiePolicy />}
      handle={{
        crumb: privacyPolicy
      }}
      path={guestRoutes.privacyPolicy.route}
    />

    {/* test page */}
    <Route element={<TestLanguage />} path='/test-language' />
  </>
)
