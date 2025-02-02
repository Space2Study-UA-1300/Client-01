import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { confirmEmail } from '~/services/auth-service'

const ConfirmEmail = () => {
  const [statusCode, setStatusCode] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const confirmToken = params.get('confirmToken')
    const confirmFetchedToken = async (confirmToken: string) => {
      await confirmEmail(confirmToken)
    }

    if (confirmToken) {
      confirmFetchedToken(confirmToken).catch(console.error)
    }
  }, [location.search])

  useEffect(() => {
    fetch('/')
      .then((response) => {
        setStatusCode(response.status)
      })
      .catch((err) => console.log(err))
  }, [])
  if (statusCode === 200) {
    return <Navigate to='/' />
  }

  return <div>Confirm your email</div>
}

export default ConfirmEmail
