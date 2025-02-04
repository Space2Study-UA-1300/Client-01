import Box from '@mui/material/Box'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/subject.jpg'
import SubjectForm from '~/containers/tutor-home-page/subjects-step/subject-form/SubjectForm'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Box>
          <Typography sx={styles.description}>
            {t('becomeTutor.categories.title')}
          </Typography>
          <Box sx={styles.form}>
            <SubjectForm />
          </Box>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
