import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0px' },
    ...fadeAnimation
  },
  description: {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.15px',
    paddingBottom: { xs: '20px', sm: ' 16px' }
  },
  imgContainer: {
    display: 'flex',
    flex: 1,
    maxWidth: '432px',
    aspectRatio: { xs: '4/3', sm: 'auto' },
    pb: { xs: '16px', sm: '52px' }
  },
  img: {
    width: '100%',
    m: { sm: 0, xs: '0 auto' }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: { sm: '340px' }
  },
  inputField: {
    marginBottom: '15px',
    width: '100%',
    '& .MuiInputBase-root': {
      borderRadius: '8px',
      border: '1px solid #ccc'
    }
  },
  countSymbol: {
    textAlign: 'left',
    marginBottom: '5px',
    fontSize: '12px',
    color: '#888'
  },
  namesContsiner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '8px'
  },
  namesFirst: {
    flex: 1,
    marginRight: '5px'
  },
  namesLast: {
    flex: 1,
    marginRight: '5px'
  },
  rigthBox: {
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  }
}
