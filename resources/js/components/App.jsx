import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { Header } from './layouts/Header'
import { SideBar } from './layouts/SideBar'
import { ContentWrapper } from './layouts/ContentWrapper'
import { Login } from './Auth/Login'
import { Signup } from './Auth/Signup'
import { Wrapper } from './layouts/Wrapper'
import { Dashboard } from './Dashboard'
import { Logout } from './Auth/Logout'


export const App = () => {
    const [sidebar,setSidebar]=useState(true)
    const[viewLayout,setViewLayout]=useState(false)
    const location = useLocation();

    useEffect(()=>{
        if(location.pathname=='/signup' || location.pathname=='/'){
            setViewLayout(()=>{
                return false
            })
            setSidebar(()=>{
                return false
            })
        }
        else{
            setViewLayout(()=>{
                return true
            })
            setSidebar(()=>{
                return true
            })
        }
    },[location])

    const toggleSidebar=()=>{
        setSidebar(()=>{
            return !sidebar
        })
    }

  return (
    <Wrapper view={sidebar}>

        {viewLayout && <Header toggleSidebar= {toggleSidebar}/>}
        {viewLayout && <SideBar/>}
        <ContentWrapper>
            <Routes>
                <Route path='/' exact element={<Login/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>
                <Route path='/dashboard' element={<Dashboard/>}></Route>
                <Route path='/logout' element={<Logout/>}></Route>
            </Routes>
        </ContentWrapper>
    </Wrapper>
  )
}
