import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({ children }) {
    if (localStorage.getItem('userToken')) {
        return (
            <>
                {children}
            </>
        )
    }
    else {
        return <>

            <Navigate to='/register' />
        </>
    }
}

export default ProtectedRoutes

