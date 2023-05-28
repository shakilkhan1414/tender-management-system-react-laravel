import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const Dashboard = () => {

    const navigate=useNavigate()

    useEffect(()=>{
        if(!User.loggedIn()){
            navigate('/')
        }
    },[])

  return (
    <div>Dashboard</div>
  )
}
