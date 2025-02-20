import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'

import { userService } from '~/services/user-service'
import useAxios from '~/hooks/use-axios'
import { useEffect, useCallback } from 'react'

const ProfilePicture = () => {
  const userId = useSelector((state) => state.appMain.userId)
  const userRole = useSelector((state) => state.appMain.userRole)

  const { getUserById } = userService

  const { response: userData, error } = useAxios({
    service: useCallback(
      () => getUserById(userId, userRole),
      [userId, userRole]
    ),
    defaultResponse: null,
    fetchOnMount: !!userId
  })

  useEffect(() => console.log(userData), [userData])

  if (!userData) {
    return <AccountCircleOutlinedIcon />
  }

  if (!userId) {
    return <Typography>User not authenticated</Typography>
  }

  if (error) {
    return <Typography>Error loading profile</Typography>
  }

  return (
    <Box sx={styles.profilePicture}>
      {userData?.profilePicture ? (
        <img alt='Profile' src={userData.profilePicture} />
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
