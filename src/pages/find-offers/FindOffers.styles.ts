export const styles = {
  categoryInput: {
    width: '100%',
    maxWidth: { sm: '160px', md: '220px' },
    mr: '30px',
    mb: { xs: '20px', sm: '0' },
    '& .MuiOutlinedInput-root': {
      padding: '5px 9px'
    },
    label: {
      lineHeight: '20px'
    }
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  searchToolbar: {
    borderRadius: '70px'
  },
  showAllOffers: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    columnGap: '10px',
    color: 'primary.500',
    textDecoration: 'none',
    m: '0 45px 20px 0'
  },
  titleWithDescription: {
    wrapper: {
      my: '30px',
      textAlign: 'center'
    },
    title: {
      typography: { sm: 'h4', xs: 'h5' }
    },
    description: {
      typography: { sm: 'body1', xs: 'body2' },
      color: 'primary.500'
    }
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '50px',
    marginBottom: '40px'
  },
  displayCards: { display: 'flex', gap: '10px' },
  displayCard: {
    cursor: 'pointer',
    height: '48px',
    width: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #000',
    borderRadius: '2px'
  },
  filterContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  switchRole: {
    height: 50,
    width: 150
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  filterMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: 'primary.700',
    cursor: 'pointer'
  },
  filterCount: {
    width: '24px',
    height: '24px',
    backgroundColor: '#78909C',
    borderRadius: '50%'
  },
  filterCountText: {
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}
