import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '360px',
    boxSizing: 'border-box',
    position: 'relative'
  },
  authorContainer: {
    display: 'flex',
    gap: '20px',
    marginBottom: '16px'
  },
  imageButton: {
    padding: 0,
    borderRadius: '50%'
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  bookmark: { cursor: 'pointer', position: 'absolute', right: '30px' },
  authorInfo: { alignSelf: 'center', color: palette.basic.blueGray },
  lastName: { marginBottom: '10px' },
  languages: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  title: {
    paddingBottom: '16px',
    marginBottom: '16px',
    borderBottom: '1px solid #000',
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '24px'
  },
  subjectInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginBottom: '24px'
  },
  subjectRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textTransform: 'uppercase'
  },
  subject: { fontSize: '10px', fontWeight: '400' },
  levelRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textTransform: 'uppercase'
  },
  level: { fontSize: '10px', fontWeight: '400' },
  actionsContainer: { display: 'flex', flexDirection: 'column', gap: '16px' },
  currencyBlock: { display: 'flex', justifyContent: 'space-between' }
}
