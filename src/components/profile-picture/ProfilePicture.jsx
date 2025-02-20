import { useSelector } from 'react-redux'
import { Box, Typography, Alert, Snackbar } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'

import { userService } from '~/services/user-service'
import useAxios from '~/hooks/use-axios'
import { useCallback, useState } from 'react'

const ProfilePicture = () => {
  const userId = useSelector((state) => state.appMain.userId)
  const userRole = useSelector((state) => state.appMain.userRole)
  const [errorAlert, setErrorAlert] = useState(null)
  const [open, setOpen] = useState(false)

  const { getUserById } = userService

  const {
    loading,
    response: userData,
    error
  } = useAxios({
    service: useCallback(
      () => getUserById(userId, userRole),
      [userId, userRole]
    ),
    defaultResponse: null,
    fetchOnMount: !!userId
  })

  if (!userData || loading) {
    return <AccountCircleOutlinedIcon />
  }

  if (!userId) {
    setErrorAlert('User not authenticated')
    setOpen(true)
    return <AccountCircleOutlinedIcon />
  }

  if (error) {
    setErrorAlert(error.message)
    setOpen(true)
    return <AccountCircleOutlinedIcon />
  }

  return (
    <Box sx={styles.profilePicture}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Alert onClose={() => setOpen(false)} severity='error'>
          {errorAlert}
        </Alert>
      </Snackbar>

      {userData.photo[0].url ? (
        <img alt='Profile' src={userData.photo[0].url} />
      ) : (
        <Box sx={styles.profilePictureInitials}>
          <Typography variant='h6'>
            {userData?.firstName?.[0]?.toUpperCase()}
            {userData?.lastName?.[0]?.toUpperCase()}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default ProfilePicture
