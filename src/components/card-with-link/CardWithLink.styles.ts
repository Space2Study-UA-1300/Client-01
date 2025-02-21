export const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '24px 32px',
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0px 3px 16px 2px rgba(144, 164, 174, 0.56)'
    }
  },
  img: {
    width: '100%',
    alignSelf: 'center',
    mr: '24px',
    maxWidth: '62px',
    maxHeight: '62px'
  },
  titleWithDescription: {
    wrapper: {
      minWidth: '110px',
      margin: 0,
      mb: 0,
      lineHeight: '24px',
      textAlign: 'start'
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'basic.black',
      typography: { xs: 'h6' },
      m: 0
    },
    description: {
      typography: { xs: 'body2' },
      color: 'primary.500'
    }
  }
}
