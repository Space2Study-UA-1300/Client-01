import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { styles } from './SubjectForm.styles'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppButton from '~/components/app-button/AppButton'
import AppChipList from '~/components/app-chips-list/AppChipList'

import { useStepContext } from '~/context/step-context'
import { subjectsMock } from '~/containers/tutor-home-page/subjects-step/constants.js'

const SubjectForm = ({ handleSubmit }) => {
  const { stepData } = useStepContext()
  const { t } = useTranslation()

  const [inputCategory, setInputCategory] = useState('')
  const [inputSubject, setInputSubject] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [subjectsChipList, setSubjectsChipList] = useState([
    ...stepData.subjects
  ])

  useEffect(() => {
    stepData.subjects = subjectsChipList
  }, [subjectsChipList, stepData])

  const categoryArray = () => {
    return subjectsMock.map(({ category }) => ({ label: category }))
  }

  const subjectArray = () => {
    const newArray = []

    subjectsMock.map(({ category, subjects }) => {
      subjects.map(({ name }) =>
        selectedCategory
          ? category === selectedCategory &&
            newArray.push({
              label: category,
              subject: name
            })
          : newArray.push({
              label: category,
              subject: name
            })
      )
    })

    return newArray.sort((a, b) => {
      let firstSubject = a.subject.toLowerCase()
      let secondSubject = b.subject.toLowerCase()
      return firstSubject < secondSubject
        ? -1
        : firstSubject > secondSubject
          ? 1
          : 0
    })
  }

  const onInputChangeCategory = (_, value, reason) => {
    if (reason === 'clear') {
      formReset()
    } else {
      setInputCategory(value)
      setSelectedSubject('')
      setInputSubject('')
    }
  }

  const onInputChangeSubject = (_, value, reason) => {
    if (reason !== 'reset') {
      setInputSubject(value)
    }
  }

  const handleSelect = (_, value) => {
    if (value) {
      setSelectedCategory(value.label || '')
      setInputCategory(value.label || '')
      setSelectedSubject(value.subject || '')
      setInputSubject(value.subject || '')
    }
  }

  const handleDelete = (chipToDelete) => {
    const filteredSubject = subjectsChipList.filter(
      (chip) => chip !== chipToDelete
    )
    setSubjectsChipList(() => filteredSubject)
  }

  const formReset = () => {
    setSelectedCategory('')
    setSelectedSubject('')
    setInputCategory('')
    setInputSubject('')
  }

  const addCategory = () => {
    if (selectedSubject && selectedCategory) {
      if (!subjectsChipList.includes(selectedSubject)) {
        setSubjectsChipList(() => [...subjectsChipList, selectedSubject])
      }
      formReset()
    }
  }

  const renderOptions = (props, { label, subject }) => {
    const { ...optionProps } = props
    return (
      <Box component='li' sx={{ height: '48px' }} {...optionProps}>
        {subject}
        <Typography sx={{ color: 'grey', ml: '10px' }}>
          Category: {label}
        </Typography>
      </Box>
    )
  }

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <AppAutoComplete
        disableClearable={false}
        filterOptions={(options) =>
          options.filter((option) =>
            option.label.toLowerCase().includes(inputCategory.toLowerCase())
          )
        }
        freeSolo
        getOptionLabel={(option) => option?.label ?? ''}
        inputValue={inputCategory}
        isOptionEqualToValue={(option, value) =>
          option?.label === value?.label || value === null
        }
        onChange={handleSelect}
        onInputChange={onInputChangeCategory}
        options={categoryArray()}
        sx={{ mb: '20px' }}
        textFieldProps={{
          label: t('becomeTutor.categories.mainSubjectsLabel')
        }}
        value={inputCategory ? { label: inputCategory } : null}
      />
      <AppAutoComplete
        disableClearable={false}
        filterOptions={(options) =>
          options.filter(
            (option) =>
              option.label.toLowerCase().includes(inputSubject.toLowerCase()) ||
              option.subject.toLowerCase().includes(inputSubject.toLowerCase())
          )
        }
        freeSolo
        getOptionLabel={(option) => option?.subject ?? ''}
        inputValue={inputSubject}
        isOptionEqualToValue={(option, value) =>
          option?.subject === value?.subject || value === null
        }
        onChange={handleSelect}
        onInputChange={onInputChangeSubject}
        options={subjectArray()}
        renderOption={(props, option) => renderOptions(props, option)}
        sx={{ mb: '16px' }}
        textFieldProps={{
          label: t('becomeTutor.categories.subjectLabel')
        }}
        value={inputSubject}
      />

      <AppButton onClick={addCategory} sx={styles.button}>
        {t('becomeTutor.categories.btnText')}
      </AppButton>
      <Stack direction='row' spacing={'4px'} sx={{ mt: 2, flexWrap: 'wrap' }}>
        <AppChipList
          defaultQuantity={2}
          handleChipDelete={handleDelete}
          items={subjectsChipList}
        />
      </Stack>
    </Box>
  )
}

export default SubjectForm
