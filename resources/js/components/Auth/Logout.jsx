import React from 'react'
import AppStorage from '../../helpers/AppStorage'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Logout = () => {

    const navigate=useNavigate()
    useEffect(()=>{
        AppStorage.clear()
        Toast.fire({
            icon: 'success',
            title: 'Logged out successfully!'
        })
        navigate('/')

    },[])

  return (
    <>

    </>
  )
}
