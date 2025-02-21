export const styles = {
  container: {
    columnGap: '24px',
    rowGap: '24px'
  },

  'container--list': {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  'container--grid': {
    display: 'grid',
    alignSelf: 'flex-start',
    gridTemplateColumns: 'repeat(3, minmax(360px, 1fr))'
  },
  cardNarrow: {
    gridTemplateColumns: 'repeat(2, minmax(360px, 1fr))'
  }
}
