import { styles } from '~/components/button-tonal/ButtonTonal.styles'

const ButtonTonal = ({ children }) => {
  return <button style={styles.button}>{children}</button>
}

export default ButtonTonal
