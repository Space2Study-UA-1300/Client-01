import { scrollbar } from '~/styles/app-theme/custom-scrollbar'

const style = {
  root: {
    maxWidth: { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg' },
    mt: { xs: '16px', sm: 0 },
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: { lg: 'space-between' },
    alignItems: { xs: 'flex-start', md: 'center' },
    gap: { xs: '16px', lg: '122px' },
    maxHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
    p: {
      sm: '0 103px 80px 103px'
    }
  },
  imgContainer: {
    width: '450px',
    maxWidth: { md: '50%', lg: '450px' },
    maxHeight: 'inherit',
    display: { xs: 'none', lg: 'flex' }
  },
  img: {
    objectFit: 'contain',
    width: '100%'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'inherit',
    boxSizing: 'border-box',
    borderTop: { xs: '1px solid', sm: 'none' },
    borderColor: { xs: 'primary.100' },
    pt: { xs: '24px', sm: '56px', md: '70px' }
  },
  title: {
    mb: '24px',
    fontSize: '32px',
    lineHeight: '38px'
  },
  form: {
    overflow: 'auto',
    maxWidth: { xs: '315px', sm: '400px', md: '400px' },
    pt: '16px',
    ...scrollbar
  }
}

export default style
