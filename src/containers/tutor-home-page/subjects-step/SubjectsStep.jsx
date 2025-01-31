import Box from '@mui/material/Box'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/student-home-page/image.jpg'
import SubjectForm from '~/containers/tutor-home-page/subjects-step/subject-form/SubjectForm'
import Typography from '@mui/material/Typography'
import AppButton from '~/components/app-button/AppButton'

const SubjectsStep = ({ btnsBox }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Box>
          <Typography sx={styles.description}>
            {
              'Please choose the main subjects based on the category. You can add others later.'
            }
          </Typography>
          <Box sx={styles.form}>
            <SubjectForm />
            <AppButton onClick={() => {}} sx={styles.button}>
              Add one more subject
            </AppButton>
          </Box>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
