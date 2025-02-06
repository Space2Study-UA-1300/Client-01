import { createContext, ReactNode, useContext, useState } from 'react'
import { UserRoleEnum } from '~/types'
export type UserRole = UserRoleEnum | string

interface RoleContextProps {
  role: UserRole
  setRole: (role: UserRole) => void
}

const RoleContext = createContext({} as RoleContextProps)

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>(UserRoleEnum.Student)

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  )
}
export const useRole = () => {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider')
  }
  return context
}
