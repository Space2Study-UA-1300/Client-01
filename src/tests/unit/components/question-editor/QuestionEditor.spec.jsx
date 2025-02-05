import { getByPlaceholderText, getByTestId, render } from '@testing-library/react'
import QuestionEditor from '~/components/question-editor/QuestionEditor'
import { vi } from 'vitest'


const handleInputChange = vi.fn()
const handleNonInputValueChange = vi.fn()
const onCancel = vi.fn()
const onEdit = vi.fn()
const onSave = vi.fn()
const loading = false
const isQuizQuestion = false

const testAnswer = {
  text: 'answer 1',
  isCorrect: true
}
// const category = {
//   id: 'id-1',
//   name: 'category 1'
// }
const QuestionEditorProps = {
  data: {
    openAnswer: 'open answer 1',
    type: 'multipleChoice',
    text: 'question 1',
    answers: [testAnswer]
  },
  handleInputChange,
  handleNonInputValueChange,
  onCancel,
  onEdit,
  onSave,
  loading,
  isQuizQuestion
}
const questionInputFieldMockValue = QuestionEditorProps.data.text
const answerInputFieldMockValue = QuestionEditorProps.data.type
describe('Testing slider with input ', async () => {
  it('-> should renders question input field', () => {
    const { getByDisplayValue } = render(
      <QuestionEditor {...QuestionEditorProps} />
    )
    const questionInputField = getByDisplayValue(questionInputFieldMockValue)
  })
  it('-> should renders a open answer', () => {
    const { getByDisplayValue } = render(
      <QuestionEditor {...QuestionEditorProps} />
    )
    const answerInputField = getByDisplayValue(answerInputFieldMockValue)
  })
})
