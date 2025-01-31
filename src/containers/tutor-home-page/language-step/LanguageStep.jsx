import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { Typography, Autocomplete, TextField } from '@mui/material'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'

import { languagesMock } from '../subjects-step/constants'

const languages = languagesMock.map((lang) => lang.name)

const LanguageStep = ({ btnsBox }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [displayedLanguages, setDisplayedLanguages] = useState(
    languages.slice(0, 6)
  )

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
        <Typography variant='h6'>
          Please select the language in which you would like to study and
          cooperate.
        </Typography>

        <Autocomplete
          ListboxProps={{
            style: { maxHeight: 200, overflow: 'auto' },
            onScroll: handleScroll // Ленивая подгрузка при скролле
          }}
          filterOptions={(options, state) =>
            options.filter((option) =>
              option.toLowerCase().includes(state.inputValue.toLowerCase())
            )
          }
          onChange={(event, newValue) => setSelectedLanguage(newValue)}
          options={displayedLanguages} // Фиксированный список языков (без ленивой загрузки)
          renderInput={(params) => (
            <TextField {...params} label='Your native language' />
          )}
          value={selectedLanguage}
        />

        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
