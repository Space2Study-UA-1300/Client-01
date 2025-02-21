import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  displayCards: {
    display: 'flex',
    gap: '8px'
    // marginLeft: 'auto'
  },
  displayCard: {
    cursor: 'pointer',
    height: '48px',
    width: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4  px',
    border: '1px solid #B0BEC5',
    '&:hover': {
      borderColor: palette.basic.blueGray
    }
  },
  active: {
    borderColor: palette.basic.blueGray
  }
}
