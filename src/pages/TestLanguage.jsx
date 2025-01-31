import React from 'react'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import { StepProvider } from '~/context/step-context'

import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'

const steps = ['General', 'Subjects', 'Language', 'Photo']

const TestLanguage = () => {
  return (
    <StepProvider initialValues={{}} stepLabels={steps}>
      {/* <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}> */}
      <h2>Test Language Step</h2>

      <StepWrapper steps={steps}>
        <GeneralInfoStep key='1' />
        <SubjectsStep key='2' />
        <LanguageStep key='3' />
        <AddPhotoStep key='4' />
      </StepWrapper>
      {/* </div> */}
    </StepProvider>
  )
}

export default TestLanguage
