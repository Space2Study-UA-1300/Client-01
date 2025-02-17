import { useEffect, useState } from 'react'

import { Box, Typography } from '@mui/material'
import { IconButton } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'

import AppButton from '~/components/app-button/AppButton'

import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import appTypography from '~/styles/app-theme/app.typography'
import { useStepContext } from '~/context/step-context'

const AddPhotoStep = ({ btnsBox }) => {
  const { stepData } = useStepContext()

  const [image, setImage] = useState(stepData.photo)
  const [imageName, setImageName] = useState('')

  console.log(imageName, image)

  useEffect(() => {
    stepData.photo = [image, ...stepData.photo]
  }, [image, stepData])

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

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const fileURL = URL.createObjectURL(event.target.files[0])
      setImage(fileURL)
      setImageName(event.target.files[0].name)
    }
  }

  const UploadBox = () => {
    return (
      <Box
        sx={image ? { ...style.uploadBox, border: 'none' } : style.uploadBox}
      >
        {image ? (
          <Box sx={style.imgContainer}>
            <img alt='Uploaded preview' src={image} style={style.img} />
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
          Please upload a photo that represents you and helps others recognize
          you
        </Typography>
        <Box sx={style.fileUploader.root}>
          <AppButton
            color='primary'
            component='label'
            role={undefined}
            sx={style.fileUploader.button}
            variant='outlined'
          >
            {image ? (
              ''
            ) : (
              <CloudUploadIcon sx={{ mr: 1, color: 'primary.700' }} />
            )}
            <Typography>
              {image ? imageName : `Upload your profile photo`}
            </Typography>
            <VisuallyHiddenInput
              multiple
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
          {image ? '' : 'Maximum file size should be less than 10 MB'}
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={style.root}>
      <FileUploaderBox />
      <UploadBox />
      <Box sx={{ gridArea: 'empty', visibility: 'hidden' }} />
      <Box sx={style.btnsBox}>{btnsBox}</Box>
    </Box>
  )
}

export default AddPhotoStep
