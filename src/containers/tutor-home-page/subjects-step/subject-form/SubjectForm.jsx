import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import { styles } from './SubjectForm.styles'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppButton from '~/components/app-button/AppButton'
import AppChipList from '~/components/app-chips-list/AppChipList'

import { useStepContext } from '~/context/step-context'

import useCategoriesNames from '~/hooks/use-categories-names'
import useSubjectsNames from '~/hooks/use-subjects-names'

const SubjectForm = ({ handleSubmit }) => {
  const { stepData, handleStepData } = useStepContext()
  const { t } = useTranslation()

  const [inputCategory, setInputCategory] = useState('')
  const [inputSubject, setInputSubject] = useState('')
  const [selectedCategory, setSelectedCategory] = useState({})
  const [selectedSubject, setSelectedSubject] = useState({})
  const [subjectsChipList, setSubjectsChipList] = useState([
    ...stepData.subjects
  ])

  useEffect(() => {
    handleStepData('subjects', subjectsChipList)
  }, [subjectsChipList])

  const categories = useCategoriesNames({
    fetchOnMount: true
  })

  const subjects = useSubjectsNames({
    category: selectedCategory._id,
    fetchOnMount: true
  })

  const onInputChangeCategory = (_, value, reason) => {
    if (reason === 'clear') {
      formReset()
    } else {
      setInputCategory(value)
      setSelectedSubject({})
      setInputSubject('')
    }
  }

  const onInputChangeSubject = (_, value, reason) => {
    if (reason !== 'reset') {
      setInputSubject(value)
    }
  }

  const handleSelectCategory = (_, value) => {
    if (value) {
      setSelectedCategory(value || {})
      setInputCategory(value.name || '')
    }
  }

  const handleSelectSubject = (_, value) => {
    if (value) {
      setSelectedSubject(value || {})
      setInputSubject(value.name || '')
    }
  }

  const handleDelete = (chipToDelete) => {
    const filteredSubject = subjectsChipList.filter(
      (chip) => chip.name !== chipToDelete
    )
    setSubjectsChipList(() => filteredSubject)
  }

  const formReset = () => {
    setSelectedCategory({})
    setSelectedSubject({})
    setInputCategory('')
    setInputSubject('')
  }

  const addCategory = () => {
    if (selectedSubject.name && selectedCategory.name) {
      if (!subjectsChipList.includes(selectedSubject.name)) {
        setSubjectsChipList(() => [...subjectsChipList, selectedSubject])
      }
      formReset()
    }
  }

  const renderOptions = (props, { name }) => {
    const { ...optionProps } = props
    return (
      <Box component='li' sx={{ height: '48px' }} {...optionProps}>
        {name}
      </Box>
    )
  }

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <AppAutoComplete
        disableClearable={false}
        filterOptions={(options) =>
          options.filter((option) =>
            option.name.toLowerCase().includes(inputCategory.toLowerCase())
          )
        }
        freeSolo
        getOptionLabel={(option) => option?.name ?? ''}
        inputValue={inputCategory}
        isOptionEqualToValue={(option, value) =>
          option?.name === value?.label || value === null
        }
        onChange={handleSelectCategory}
        onInputChange={onInputChangeCategory}
        options={categories.response}
        sx={{ mb: '20px' }}
        textFieldProps={{
          label: t('becomeTutor.categories.mainSubjectsLabel')
        }}
        value={inputCategory ? { name: inputCategory } : null}
      />
      <AppAutoComplete
        disableClearable={false}
        filterOptions={(options) =>
          options.filter((option) =>
            option.name.toLowerCase().includes(inputSubject.toLowerCase())
          )
        }
        freeSolo
        getOptionLabel={(option) => option?.name ?? ''}
        inputValue={inputSubject}
        isOptionEqualToValue={(option, value) =>
          option?.name === value || value === null
        }
        onChange={handleSelectSubject}
        onInputChange={onInputChangeSubject}
        options={subjects.response}
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
          items={subjectsChipList.map(({ name }) => name)}
        />
      </Stack>
    </Box>
  )
}

export default SubjectForm
