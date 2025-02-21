import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { Typography } from '@mui/material'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'

import AppTextField from '~/components/app-text-field/AppTextField'
import { COUNTRIES_AND_CITIES } from '~/containers/tutor-home-page/general-info-step/constantsGeneral'
import { defaultResponses } from '~/constants'
import { firstName, lastName } from '~/utils/validations/login'
import { userService } from '~/services/user-service'
import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import { useAppSelector } from '~/hooks/use-redux'
import { useStepContext } from '~/context/step-context'

const GeneralInfoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { userId, userRole } = useAppSelector((state) => state.appMain)
  const { stepData, handleStepData } = useStepContext()
  const { country, city, professionalSummary } = stepData.generalInfo.data

  const [message, setMessage] = useState(professionalSummary)
  const [selectedCountry, setSelectedCountry] = useState(country)
  const [selectedCity, setSelectedCity] = useState(city)
  const [cities, setCities] = useState([])

  const maxLength = 100

  const getUserData = useCallback(
    () => userService.getUserById(userId, userRole),
    [userId, userRole]
  )

  const { response } = useAxios({
    service: getUserData,
    fetchOnMount: true,
    defaultResponse: defaultResponses.array
  })

  useEffect(() => {
    handleStepData('generalInfo', {
      country: selectedCountry,
      city: selectedCity,
      professionalSummary: message,
      firstName: response.firstName,
      lastName: response.lastName
    })
  }, [message, selectedCity, selectedCountry])

  const { handleBlur, errors } = useForm({
    initialValues: {
      firstName: response.firstName,
      lastName: response.lastName
    },
    validations: { firstName, lastName }
  })

  const handleMessageChange = (event) => {
    const newMessage = event.target.value
    if (newMessage.length <= maxLength) {
      setMessage(newMessage)
    }
  }

  const handlePaste = (event) => {
    const pastedText = event.clipboardData.getData('Text')
    const truncatedText = pastedText.slice(0, maxLength)
    setMessage(truncatedText)
    event.preventDefault()
  }

  const handleCountryChange = (event) => {
    const country = event.target.value
    setSelectedCountry(country)
    setCities(COUNTRIES_AND_CITIES[country] || [])
  }

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value)
  }

  useEffect(() => {
    if (selectedCountry) {
      setCities(COUNTRIES_AND_CITIES[selectedCountry] || [])
    }
  }, [selectedCountry])

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imageContainer}>
        <Box alt='lognimg' component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Box>
          <Typography sx={{ mb: { sm: '16px' } }}>
            {t('becomeTutor.generalInfo.title')}
          </Typography>
          <Box component='form' sx={styles.form}>
            <Box sx={styles.namesContsiner}>
              <AppTextField
                autoFocus
                data-testid={'firstName'}
                errorMsg={t(errors.firstName)}
                label={t('common.labels.firstName')}
                onBlur={handleBlur('firstName')}
                required
                sx={{ mb: { md: '5px', xs: '0' } }}
                type='text'
                value={response.firstName}
              />
              <AppTextField
                autoFocus
                data-testid={'lastName'}
                errorMsg={t(errors.lastName)}
                label={t('common.labels.lastName')}
                onBlur={handleBlur('lastName')}
                required
                sx={{ mb: { md: '5px', xs: '0' } }}
                type='text'
                value={response.lastName}
              />
            </Box>
            <FormControl fullWidth sx={styles.inputField}>
              <InputLabel>{t('common.labels.country')}</InputLabel>
              <Select
                label={t('common.labels.country')}
                onChange={handleCountryChange}
                required
                sx={{ borderRadius: '8px', border: '1px solid #ccc' }}
                value={selectedCountry}
              >
                {Object.keys(COUNTRIES_AND_CITIES).map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={styles.inputField}>
              <InputLabel>{t('common.labels.city')}</InputLabel>
              <Select
                label={t('common.labels.city')}
                onChange={handleCityChange}
                required
                sx={{ borderRadius: '8px', border: '1px solid #ccc' }}
                value={selectedCity}
              >
                {selectedCountry ? (
                  cities.length > 0 ? (
                    cities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled value=''>
                      {t('common.labels.noCities')}
                    </MenuItem>
                  )
                ) : (
                  <MenuItem disabled value=''>
                    first select a country
                  </MenuItem>
                )}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label={t('becomeTutor.generalInfo.textFieldLabel')}
              multiline
              onChange={handleMessageChange}
              onPaste={handlePaste}
              rows={4}
              sx={styles.inputField}
              value={message}
              variant='outlined'
            />
            <Box sx={styles.countSymbol}>
              <span>{`${message.length}/${maxLength}`}</span>
            </Box>
            <Typography sx={{ mb: { sm: '16px' } }}>
              {t('becomeTutor.generalInfo.helperText')}
            </Typography>
            {btnsBox}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
