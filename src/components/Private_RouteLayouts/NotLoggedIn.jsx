import React, { use } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Home from '../../pages/home/Home'

const NotLoggedIn = () => {
    const {user} = useSelector(state => state.auth)
  return user ? <Navigate to='/'/> : <Outlet />
}

export default NotLoggedIn