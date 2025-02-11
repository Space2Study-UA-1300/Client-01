export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f7f7f7'
  },
  imageContainer: {
    flex: 1,
    marginRight: '10px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  img: {
    width: '80%',
    height: 'auto',
    objectFit: 'cover'
  },
  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderRadius: '8px',
    paddingRight: '20px',
    maxWidth: '380px',
    marginLeft: '20px'
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
  }
}
