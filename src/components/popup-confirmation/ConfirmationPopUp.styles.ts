import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  icon: {
    color: 'primary.900',
    position: 'absolute',
    right: '10px',
    top: '10px'
  },
  wrapperButton: {
    paddingRight: '24px'
  },
  button: {
    backgroundColor: palette.basic.grey,
    '&:hover': {
      backgroundColor: palette.basic.gray,
      color: palette.basic.white
    }
  }
}
