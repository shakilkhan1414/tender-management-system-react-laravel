import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { Header } from './Layouts/Header'
import { ContentWrapper } from './Layouts/ContentWrapper'
import { Login } from './Auth/Login'
import { Signup } from './Auth/Signup'
import { Wrapper } from './Layouts/Wrapper'
import { Dashboard } from './Dashboard'
import { Logout } from './Auth/Logout'
import { SideBar } from './layouts/SideBar'
import { index as Users } from './User'
import { create as CreateUser } from './User/create'
import { edit as EditUser } from './User/edit'
import { Profile } from './Profile'
import { EditProfile } from './EditProfile'


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
                <Route path='/users' element={<Users/>}></Route>
                <Route path="/users/create" element={<CreateUser />} />
                <Route path="/users/edit/:id" element={<EditUser />} />
                <Route path="/user/profile" element={<Profile />} />
                <Route path="/user/profile/edit" element={<EditProfile />} />
            </Routes>
        </ContentWrapper>
    </Wrapper>
  )
}
