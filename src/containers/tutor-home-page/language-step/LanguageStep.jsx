import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import { Typography, Autocomplete, TextField } from '@mui/material'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'

import { languagesMock } from '../subjects-step/constants'
import { useStepContext } from '~/context/step-context'

const languages = languagesMock.map((lang) => lang.name)

const LanguageStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()

  const [selectedLanguage, setSelectedLanguage] = useState(stepData.language)
  const [displayedLanguages, setDisplayedLanguages] = useState(
    languages.slice(0, 6)
  )

  useEffect(() => {
    handleStepData('language', selectedLanguage)
  }, [selectedLanguage])

  const handleScroll = (event) => {
    const listboxNode = event.currentTarget
    if (
      listboxNode.scrollTop + listboxNode.clientHeight >=
      listboxNode.scrollHeight
    ) {
      setDisplayedLanguages((prev) => [
        ...prev,
        ...languages.slice(prev.length, prev.length + 6)
      ])
    }
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Box>
          <Typography sx={styles.description}>
            {t('becomeTutor.languages.title')}
          </Typography>
          <Box sx={styles.form}>
            <Autocomplete
              ListboxProps={{
                style: { maxHeight: 200, overflow: 'auto' },
                onScroll: handleScroll
              }}
              filterOptions={(options, state) =>
                options.filter((option) =>
                  option.toLowerCase().includes(state.inputValue.toLowerCase())
                )
              }
              onChange={(event, newValue) => setSelectedLanguage(newValue)}
              options={displayedLanguages}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('becomeTutor.languages.autocompleteLabel')}
                />
              )}
              value={selectedLanguage}
            />
          </Box>
        </Box>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
