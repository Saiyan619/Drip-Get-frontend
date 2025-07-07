import { useUser } from '@clerk/clerk-react'
import React from 'react'

const ProtectedAdminRoutes = ({ children }: { children: React.ReactNode }) => {
    let { user, isSignedIn } = useUser();
    if (isSignedIn && user?.publicMetadata?.role === 'admin') {
        return <div>{children}</div>
    } else {
        return <div>access denied admins only</div>
}  
}
  

export default ProtectedAdminRoutes
