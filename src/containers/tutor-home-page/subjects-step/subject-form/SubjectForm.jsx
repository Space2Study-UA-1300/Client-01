import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import { styles } from './SubjectForm.styles'

import AppSelect from '~/components/app-select/AppSelect'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppButton from '~/components/app-button/AppButton'
import AppChipList from '~/components/app-chips-list/AppChipList'

import { useStepContext } from '~/context/step-context'
import { subjectsMock } from '~/containers/tutor-home-page/subjects-step/constants.js'

const SubjectForm = ({ handleSubmit }) => {
  const { stepData } = useStepContext()
  const { t } = useTranslation()

  const [inputCategory, setInputCategory] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [subjectsChipList, setSubjectsChipList] = useState([
    ...stepData.subjects
  ])

  useEffect(() => {
    stepData.subjects = subjectsChipList
  }, [subjectsChipList, stepData])

  const getCategoryArray = (value = []) => {
    const newCatArr = []
    value.map(({ category }) => newCatArr.push(category))

    return newCatArr
  }

  const getCategorySubjects = subjectsMock.find(
    ({ category }) =>
      category.toLowerCase() === selectedCategory.toLocaleLowerCase()
  )

  const subjectFields = (value = []) =>
    value.map(({ name }) => {
      return {
        title: name,
        value: name
      }
    })

  const onInputChangeCategory = (_, value) => setInputCategory(value)

  const handleAutoCompleteChangeCategory = (_, value) => {
    value ? setSelectedCategory(value) : setSelectedCategory('')
  }

  const handleSelectSubject = (event) => {
    setSelectedSubject(event)
  }

  const handleDelete = (chipToDelete) => {
    const filteredSubject = subjectsChipList.filter(
      (chip) => chip !== chipToDelete
    )
    setSubjectsChipList(() => filteredSubject)
  }

  const addCategory = () => {
    if (selectedSubject) {
      if (!subjectsChipList.includes(selectedSubject)) {
        setSubjectsChipList(() => [...subjectsChipList, selectedSubject])
      }
      setSelectedCategory('')
      setSelectedSubject('')
    }
  }

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <AppAutoComplete
        inputValue={inputCategory}
        isOptionEqualToValue={(option, value) => option === value}
        onChange={handleAutoCompleteChangeCategory}
        onInputChange={onInputChangeCategory}
        options={getCategoryArray(subjectsMock)}
        sx={{ mb: '20px' }}
        textFieldProps={{
          label: t('becomeTutor.categories.mainSubjectsLabel')
        }}
        value={selectedCategory || null}
      />
      <AppSelect
        fields={subjectFields(
          selectedCategory ? getCategorySubjects.subjects : []
        )}
        label={t('becomeTutor.categories.subjectLabel')}
        setValue={handleSelectSubject}
        sx={{ mb: '16px' }}
        value={selectedSubject}
      />
      <AppButton onClick={addCategory} sx={styles.button}>
        {t('becomeTutor.categories.btnText')}
      </AppButton>
      <Stack direction='row' spacing={'4px'} sx={{ mt: 2, flexWrap: 'wrap' }}>
        <AppChipList
          defaultQuantity={3}
          handleChipDelete={handleDelete}
          items={subjectsChipList}
        />
      </Stack>
    </Box>
  )
}

export default SubjectForm
