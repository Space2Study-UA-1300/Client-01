import { Box, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import AppButton from '~/components/app-button/AppButton'

import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import appTypography from '~/styles/app-theme/app.typography'

const AddPhotoStep = ({ btnsBox }) => {
  return (
    <Box sx={style.root}>
      <Box sx={style.uploadBox}>
        <Typography color='primary.900' sx={appTypography.body1}>
          Photo Preview
        </Typography>
      </Box>
      <Box sx={style.rigthBox}>
        <Typography>
          Please upload a photo that represents you and helps others recognize
          you
        </Typography>
        <Box sx={style.fileUploader.root}>
          <AppButton
            color='primary'
            sx={style.fileUploader.button}
            variant='outlined'
          >
            <CloudUploadIcon color='primary.50' sx={{ mr: 1 }} />
            <Typography>Upload your profile photo</Typography>
          </AppButton>
        </Box>
        <Typography sx={{ mb: 'auto' }}>
          Maximum file size should be less than 10 MB
        </Typography>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
