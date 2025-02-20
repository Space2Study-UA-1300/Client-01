import palette from '~/styles/app-theme/app.pallete'
export const styles = {
  button: {
    padding: '16px 32px',
    borderRadius: '4px',
    backgroundColor: palette.basic.grey,
    color: '#263238',
    fontSize: '16px',
    fontWeight: '500',
    outline: 'none',
    border: 'none',
    '&:hover': {
      boxShadow: ''
    }
  }
}
