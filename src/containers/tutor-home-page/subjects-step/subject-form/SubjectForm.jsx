import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import Box from '@mui/material/Box'

import { styles } from './SubjectForm.styles'

import AppSelect from '~/components/app-select/AppSelect'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppButton from '~/components/app-button/AppButton'

import {
  categoriesMock,
  subjectsMock
} from '~/containers/tutor-home-page/subjects-step/constants.js'

const SubjectForm = ({ handleSubmit }) => {
  const [searchCategory, setSearchCategory] = useState('')
  const [searchSubject, setSearchSubject] = useState('')
  const [inputCategory, setInputCategory] = useState('')

  const { t } = useTranslation()

  const categories = (value = []) =>
    value.map(({ name }) => {
      return {
        title: name,
        value: name.toLocaleLowerCase()
      }
    })

  const getCategoryArray = (value = []) => {
    const newCatArr = []
    value.map(({ name }) => newCatArr.push(name))

    return newCatArr
  }

  const subjects = subjectsMock.find(
    (item) => item.name === searchCategory.toLocaleLowerCase()
  )

  const onInputChange = (_, value) => setInputCategory(value)

  const handleAutoCompleteChange = (_, value) => {
    value ? setSearchCategory(value) : setSearchCategory('')
  }

  const handleChangeSubject = (event) => setSearchSubject(event)

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <AppAutoComplete
        inputValue={inputCategory}
        onChange={handleAutoCompleteChange}
        onInputChange={onInputChange}
        options={getCategoryArray(categoriesMock)}
        sx={{ marginBottom: '20px' }}
        textFieldProps={{
          label: t('becomeTutor.categories.mainSubjectsLabel')
        }}
        value={searchCategory}
      />
      <AppSelect
        fields={categories(searchCategory ? subjects.values : [])}
        label={t('becomeTutor.categories.subjectLabel')}
        setValue={handleChangeSubject}
        sx={{ marginBottom: '16px' }}
        value={searchSubject}
      />
      <AppButton onClick={() => {}} sx={styles.button}>
        {t('becomeTutor.categories.btnText')}
      </AppButton>
    </Box>
  )
}

export default SubjectForm
