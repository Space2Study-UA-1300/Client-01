export const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  title: { mb: '8px', typography: 'h5' },
  subtitle: { mb: '32px', typography: 'h7' },
  button: {
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0 2px 7px rgba(144, 164, 174, 0.56)'
    }
  }
}
