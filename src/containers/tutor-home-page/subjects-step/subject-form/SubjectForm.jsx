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
import Typography from '@mui/material/Typography'

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

  const categoryArray = () => {
    const newCatArr = []
    subjectsMock.map(({ category, subjects }) => {
      subjects.map(({ name }) =>
        newCatArr.push({
          lable: category,
          subject: name
        })
      )
    })

    return newCatArr.sort((a, b) => {
      let firstSubject = a.subject.toLowerCase()
      let secondSubject = b.subject.toLowerCase()

      return firstSubject < secondSubject
        ? -1
        : firstSubject > secondSubject
          ? 1
          : 0
    })
  }

  const getCategorySubjects = subjectsMock.find(({ category }) => {
    return category.toLowerCase() === selectedCategory.toLocaleLowerCase()
  })

  const subjectFields = (value = []) =>
    value.map(({ name }) => {
      return {
        title: name,
        value: name
      }
    })

  const onInputChangeCategory = (_, value) => {
    setSelectedSubject('')
    setSelectedCategory('')
    setInputCategory(value)
  }

  const handleAutoCompleteChangeCategory = (_, value) => {
    if (value) {
      setSelectedCategory(value.lable)
      setSelectedSubject(value.subject)
    }
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
      setInputCategory('')
    }
  }

  const renderOptions = (props, option) => {
    const { ...optionProps } = props
    return (
      <Box component='li' sx={{ height: '48px' }} {...optionProps}>
        {option.subject}
        <Typography sx={{ color: 'grey', ml: '10px' }}>
          Category: {option.lable}
        </Typography>
      </Box>
    )
  }

  const filterOptions = (options, state) => {
    const filterValue = state.inputValue.toLowerCase()
    return options.filter(
      (option) =>
        option.subject.toLowerCase().includes(filterValue) ||
        option.lable.toLowerCase().includes(filterValue)
    )
  }

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <AppAutoComplete
        disableClearable={false}
        filterOptions={filterOptions}
        freeSolo
        getOptionLabel={(option) => option?.lable ?? ''}
        inputValue={inputCategory}
        isOptionEqualToValue={(option, value) => option?.lable === value?.lable}
        onChange={handleAutoCompleteChangeCategory}
        onInputChange={onInputChangeCategory}
        options={categoryArray()}
        renderOption={(props, option) => renderOptions(props, option)}
        sx={{ mb: '20px' }}
        textFieldProps={{
          label: t('becomeTutor.categories.mainSubjectsLabel')
        }}
        value={
          categoryArray().find((option) => option.lable === selectedCategory) ||
          null
        }
      />
      <AppSelect
        fields={subjectFields(
          selectedCategory ? getCategorySubjects.subjects : []
        )}
        label={t('becomeTutor.categories.subjectLabel')}
        setValue={handleSelectSubject}
        sx={(styles.selectField, { mb: '16px' })}
        value={selectedSubject}
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
