import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import axios from 'axios'
import Box from '@mui/material/Box'
import { Typography, Autocomplete, TextField } from '@mui/material'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { useStepContext } from '~/context/step-context'

const LanguageStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [displayedLanguages, setDisplayedLanguages] = useState([])
  const { stepData, handleStepData } = useStepContext()
  const [selectedLanguage, setSelectedLanguage] = useState(stepData.language)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [search, setSearch] = useState('')
  const fetchLanguages = async (newSearch = search, reset = false) => {
    if (!hasMore && !reset) return

    try {
      const response = await axios.get(`http://localhost:8080/languages`, {
        params: { page: reset ? 1 : page, limit: 6, search: newSearch }
      })

      const { languages, hasMore: newHasMore } = response.data

      setDisplayedLanguages((prev) =>
        reset ? languages : [...prev, ...languages]
      )
      setPage(reset ? 2 : page + 1)
      setHasMore(newHasMore)
    } catch (error) {
      console.error('Error while loading languages:', error)
    }
  }

  useEffect(() => {
    fetchLanguages('', true)
  }, [])

  useEffect(() => {
    handleStepData('language', selectedLanguage)
  }, [selectedLanguage])

  const handleScroll = (event) => {
    const listboxNode = event.currentTarget

    if (
      listboxNode.scrollTop + listboxNode.clientHeight >=
      listboxNode.scrollHeight - 10
    ) {
      fetchLanguages()
    }
  }

  const handleInputChange = (event, newValue) => {
    setSearch(newValue)
    fetchLanguages(newValue, true)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Box>
          <Typography sx={styles.description} variant='h6'>
            {t('becomeTutor.languages.title')}
          </Typography>

          <Autocomplete
            ListboxProps={{
              style: { maxHeight: 200, overflow: 'auto' },
              onScroll: handleScroll
            }}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => setSelectedLanguage(newValue)}
            onInputChange={handleInputChange}
            options={displayedLanguages}
            renderInput={(params) => (
              <TextField {...params} label='Your native language' />
            )}
            value={selectedLanguage}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
