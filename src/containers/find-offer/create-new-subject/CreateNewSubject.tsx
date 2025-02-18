import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AxiosResponse } from 'axios'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import useAxios from '~/hooks/use-axios'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import Image from '~/assets/img/signup-dialog/student.svg'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import {
  ButtonTypeEnum,
  CategoryNameInterface,
  ComponentEnum,
  ErrorResponse
} from '~/types'
import { snackbarVariants } from '~/constants'
import { categoryService } from '~/services/category-service'
import { validations } from '~/containers/find-offer/create-new-subject/CreateNewSubject.constants'
import { styles } from '~/containers/find-offer/create-new-subject/CreateNewSubject.styles'
import { subjectService } from '~/services/subject-service'

interface CategoryInterface {
  _id: string
  name: string
}

type FormData = {
  subject: string
  category: string
}

const CreateSubjectModal = () => {
  const { closeModal } = useModalContext()
  const { setNeedConfirmation } = useConfirm()
  const { setAlert } = useSnackBarContext()
  const { t } = useTranslation()

  const handleResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const handleResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'categoriesPage.newSubject.successMessage'
    })
    closeModal()
  }

  function capitalizeFirstLetter(text: string): string {
    if (!text) return ''
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }

  const sendSubjectRequest = async (): Promise<AxiosResponse> => {
    try {
      const dataCapitalizedCategory = capitalizeFirstLetter(data.category)
      const dataCapitalizedSubject = capitalizeFirstLetter(data.subject)

      const categoriesResponse = await categoryService.getCategories({
        name: dataCapitalizedCategory
      })
      const category = categoriesResponse.data.items.find(
        (item: CategoryInterface) => item.name === data.category
      )

      if (!category?.name) {
        const newCategory = await categoryService.createCategories(
          dataCapitalizedCategory
        )

        const newCategoryId = newCategory.data._id
        const newCategoryName = newCategory.data.name

        return await subjectService.createSubject(
          newCategoryId,
          newCategoryName,
          dataCapitalizedSubject
        )
      }

      if (!category) {
        throw new Error('Category not found')
      }

      const categoryId = category._id
      const categoryName = category.name

      return await subjectService.createSubject(
        categoryId,
        categoryName,
        dataCapitalizedSubject
      )
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  }

  const { loading, fetchData } = useAxios({
    service: sendSubjectRequest,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse,
    onResponseError: handleResponseError
  })

  const handleFormSubmit = async (formData?: FormData) => {
    await fetchData()
  }

  const {
    data,
    errors,
    isDirty,
    handleInputChange,
    handleBlur,
    handleNonInputValueChange,
    handleSubmit
  } = useForm({
    initialValues: {
      subject: '',
      category: '',
      info: ''
    },
    onSubmit: handleFormSubmit,
    validations
  })

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [isDirty, setNeedConfirmation])

  const handleCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null | string
  ) => {
    if (typeof value === 'object') {
      handleNonInputValueChange('category', value?.name ?? '')
    } else {
      handleNonInputValueChange('category', value)
    }
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgWrapper}>
        <Box component='img' src={Image} sx={styles.img} />
      </Box>
      <Box
        component={ComponentEnum.Form}
        onSubmit={handleSubmit}
        sx={styles.formWrapper}
      >
        <TitleWithDescription
          description={t('categoriesPage.newSubject.description')}
          style={styles.titleDescription}
          title={t('categoriesPage.newSubject.title')}
        />
        <Typography sx={styles.inputTitle}>
          {t('categoriesPage.newSubject.subject')}
        </Typography>
        <AppTextField
          errorMsg={t(errors.subject)}
          fullWidth
          label={t('categoriesPage.newSubject.labels.subject')}
          onBlur={handleBlur('subject')}
          onChange={handleInputChange('subject')}
          value={data.subject}
        />
        <Typography sx={styles.inputTitle}>
          {t('categoriesPage.newSubject.category')}
        </Typography>
        <AsyncAutocomplete
          fetchOnFocus
          freeSolo
          labelField='name'
          onBlur={handleBlur('category')}
          onChange={handleCategoryChange}
          onInputChange={handleCategoryChange}
          service={categoryService.getCategoriesNames}
          textFieldProps={{
            label: t('offerPage.labels.category'),
            error: Boolean(errors.category),
            helperText: t(errors.category) || ' '
          }}
          value={data.category}
          valueField='name'
        />
        <AppTextArea
          errorMsg={t(errors.info)}
          fullWidth
          label={t('offerDetailsPage.enrollOffer.labels.info')}
          maxLength={1000}
          onBlur={handleBlur('info')}
          onChange={handleInputChange('info')}
          sx={styles.textArea}
          title={t('categoriesPage.newSubject.info')}
          value={data.info}
        />
        <AppButton
          loading={loading}
          sx={styles.button}
          type={ButtonTypeEnum.Submit}
        >
          {t('button.sendRequest')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default CreateSubjectModal
