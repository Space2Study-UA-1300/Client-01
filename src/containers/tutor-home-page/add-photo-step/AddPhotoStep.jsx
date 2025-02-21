import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Typography, Alert, Snackbar, IconButton } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'

import AppButton from '~/components/app-button/AppButton'

import appTypography from '~/styles/app-theme/app.typography'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'

import {
  allowedTypes,
  maxSize
} from '~/constants/photo-constants/photo-requirements'
import { useStepContext } from '~/context/step-context'

const AddPhotoStep = ({ btnsBox }) => {
  const { stepData, handleStepData } = useStepContext()
  const { t } = useTranslation()

  const [image, setImage] = useState(null)
  const [photoFile, setPhotoFile] = useState(stepData.photo)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  const [isDragged, setIsDragged] = useState(false)

  useEffect(() => {
    photoFile && addPhoto(photoFile)
  }, [photoFile])

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  })

  const addPhoto = (file) => {
    if (!file) return

    setError(null)

    if (!allowedTypes.includes(file.type)) {
      setError(t('becomeTutor.photo.typeError'))
      setOpen(true)
      return
    }

    if (file.size > maxSize) {
      setError(t('becomeTutor.photo.fileSizeError'))
      setOpen(true)
      return
    }

    const fileURL = URL.createObjectURL(file)
    setImage(fileURL)
    setPhotoFile(file)
    handleStepData('photo', file)
  }

  useEffect(() => {
    const preventDefaults = (event) => event.preventDefault()

    window.addEventListener('dragover', preventDefaults)
    window.addEventListener('drop', preventDefaults)

    return () => {
      window.removeEventListener('dragover', preventDefaults)
      window.removeEventListener('drop', preventDefaults)
    }
  }, [])

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return
    addPhoto(file)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    addPhoto(event.dataTransfer.files[0])
    setIsDragged(false)
  }

  const handleDragOver = useCallback(
    (event) => {
      event.preventDefault()
      if (!isDragged) {
        setIsDragged(true)
      }
    },
    [isDragged]
  )

  const handleDragLeave = (event) => {
    event.preventDefault()
    if (isDragged) {
      setIsDragged(false)
    }
  }

  const UploadBox = () => {
    return (
      <Box
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        sx={
          image
            ? { ...style.uploadBox, border: 'none' }
            : {
                ...style.uploadBox,
                borderColor: isDragged && 'success.900',
                backgroundColor: isDragged && 'success.50'
              }
        }
      >
        {image ? (
          <Box sx={style.imgContainer}>
            <img
              alt={t('becomeTutor.photo.placeholder')}
              src={image}
              style={style.img}
            />
          </Box>
        ) : (
          <Typography sx={{ ...appTypography.body2, color: 'primary.900' }}>
            Photo Preview
          </Typography>
        )}
      </Box>
    )
  }

  const FileUploaderBox = () => {
    return (
      <Box sx={style.rigthBox}>
        <Typography
          sx={{
            ...appTypography.subtitle1,
            color: 'primary.900',
            ...style.description
          }}
        >
          {t('becomeTutor.photo.description')}
        </Typography>
        <Box sx={style.fileUploader.root}>
          <AppButton
            color='primary'
            component='label'
            role={undefined}
            sx={style.fileUploader.button}
            variant='outlined'
          >
            {!image && <CloudUploadIcon sx={{ mr: 1, color: 'primary.700' }} />}
            <Typography sx={{ textOverflow: 'clip' }}>
              {image ? photoFile.name : t('becomeTutor.photo.button')}
            </Typography>
            <VisuallyHiddenInput
              accept='image/png, image/jpg, image/jpeg'
              name='image'
              onChange={handleFileChange}
              type='file'
            />
            {!image ? (
              ''
            ) : (
              <IconButton aria-label='close' onClick={() => setImage(null)}>
                <CloseIcon />
              </IconButton>
            )}
          </AppButton>
        </Box>
        <Typography sx={{ ...appTypography.caption, color: 'primary.900' }}>
          {image ? '' : t('becomeTutor.photo.fileSizer')}
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={style.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Alert onClose={() => setOpen(false)} severity='error'>
          {error}
        </Alert>
      </Snackbar>

      <FileUploaderBox />
      <UploadBox />
      <Box sx={{ gridArea: 'empty', visibility: 'hidden' }} />
      <Box sx={style.btnsBox}>{btnsBox}</Box>
    </Box>
  )
}

export default AddPhotoStep
